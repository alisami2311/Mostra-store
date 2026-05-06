/* ===========================
   MOSTRA - Main JavaScript
   =========================== */

// ---- Theme Manager ----
const ThemeManager = {
  init() {
    const saved = localStorage.getItem('mostra-theme') || 'light';
    this.apply(saved);
  },

  apply(theme) {
    document.body.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('mostra-theme', theme);
    // Update toggle button icons
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      const sunIcon  = btn.querySelector('.icon-sun');
      const moonIcon = btn.querySelector('.icon-moon');
      if (sunIcon)  sunIcon.style.display  = theme === 'dark' ? 'block' : 'none';
      if (moonIcon) moonIcon.style.display = theme === 'light' ? 'block' : 'none';
    });
  },

  toggle() {
    const current = localStorage.getItem('mostra-theme') || 'light';
    this.apply(current === 'light' ? 'dark' : 'light');
  }
};

// ---- Navbar Manager ----
const NavbarManager = {
  init() {
    const menuBtn   = document.querySelector('[data-mobile-menu-btn]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');

    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
      });
    }

    // Highlight active link
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.navbar__link, .mobile-nav__item').forEach(link => {
      const href = link.getAttribute('href') || '';
      if (href === path || (path === 'index.html' && href === '#')) {
        link.classList.add('active');
      }
    });
  }
};

// ---- Wishlist ----
const Wishlist = {
  items: JSON.parse(localStorage.getItem('mostra-wishlist') || '[]'),

  toggle(id) {
    const idx = this.items.indexOf(id);
    if (idx === -1) this.items.push(id);
    else this.items.splice(idx, 1);
    localStorage.setItem('mostra-wishlist', JSON.stringify(this.items));
    this.updateUI(id);
  },

  has(id) {
    return this.items.includes(id);
  },

  updateUI(id) {
    document.querySelectorAll(`[data-wishlist="${id}"]`).forEach(btn => {
      btn.classList.toggle('active', this.has(id));
      const svg = btn.querySelector('svg path, svg');
      if (svg) svg.style.fill = this.has(id) ? 'var(--primary)' : 'none';
    });
  }
};

// ---- Cart ----
const Cart = {
  items: JSON.parse(localStorage.getItem('mostra-cart') || '[]'),

  add(product) {
    const existing = this.items.find(i => i.id === product.id);
    if (existing) existing.qty += 1;
    else this.items.push({ ...product, qty: 1 });
    localStorage.setItem('mostra-cart', JSON.stringify(this.items));
    this.updateBadge();
    this.showToast(`${product.name} added to cart!`);
  },

  remove(id) {
    this.items = this.items.filter(i => i.id !== id);
    localStorage.setItem('mostra-cart', JSON.stringify(this.items));
    this.updateBadge();
  },

  updateQty(id, qty) {
    const item = this.items.find(i => i.id === id);
    if (item) {
      item.qty = Math.max(1, qty);
      localStorage.setItem('mostra-cart', JSON.stringify(this.items));
    }
  },

  total() {
    return this.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  },

  count() {
    return this.items.reduce((sum, i) => sum + i.qty, 0);
  },

  updateBadge() {
    const count = this.count();
    document.querySelectorAll('[data-cart-badge]').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  },

  showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }
};

// ---- Rating Stars Builder ----
function buildStars(rating, maxRating = 5, size = 'md') {
  const sizeMap = { sm: '0.75rem', md: '1rem', lg: '1.25rem' };
  const dim = sizeMap[size] || '1rem';
  let html = '<div class="rating">';
  for (let i = 0; i < maxRating; i++) {
    const filled = i < Math.floor(rating);
    const half   = !filled && i < rating;
    html += `<svg width="${dim}" height="${dim}" viewBox="0 0 24 24" fill="${filled ? 'var(--warning)' : half ? 'url(#half)' : 'none'}" stroke="var(--warning)" stroke-width="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>`;
  }
  html += '</div>';
  return html;
}

// ---- Product Card Builder ----
function buildProductCard(product) {
  const { id, name, price, originalPrice, image, rating, reviews, brand, isNew, discount } = product;
  const discount_ = discount || (originalPrice ? Math.round((1 - price / originalPrice) * 100) : null);
  const badge = isNew
    ? `<span class="badge badge-success product-card__badge">New</span>`
    : discount_ ? `<span class="badge badge-destructive product-card__badge">-${discount_}%</span>` : '';

  return `
    <div class="product-card" data-product-id="${id}">
      <a href="product.html?id=${id}">
        <div class="product-card__image-wrap">
          <img class="product-card__image" src="${image}" alt="${name}" loading="lazy"
               onerror="this.src='https://placehold.co/400x400/ececf0/717182?text=No+Image'">
          <button class="product-card__wishlist" data-wishlist="${id}"
                  onclick="event.preventDefault();event.stopPropagation();Wishlist.toggle('${id}')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
          ${badge}
        </div>
      </a>
      <div class="product-card__body">
        <p class="product-card__brand">${brand}</p>
        <a href="product.html?id=${id}">
          <h3 class="product-card__name">${name}</h3>
        </a>
        <div>
          ${buildStars(rating, 5, 'sm')}
          <span style="font-size:0.75rem;color:var(--text-muted)">(${reviews})</span>
        </div>
        <div class="product-card__footer">
          <div>
            <span class="product-card__price">$${price.toFixed(2)}</span>
            ${originalPrice ? `<span class="product-card__original-price">$${originalPrice.toFixed(2)}</span>` : ''}
          </div>
          <button class="btn btn-primary btn-icon"
                  onclick="Cart.add({id:'${id}',name:'${name}',price:${price},image:'${image}',brand:'${brand}'})">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
          </button>
        </div>
      </div>
    </div>`;
}

// ---- Search Filter ----
function initSearch(inputSelector, cardsSelector) {
  const input = document.querySelector(inputSelector);
  if (!input) return;
  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    document.querySelectorAll(cardsSelector).forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = !q || text.includes(q) ? '' : 'none';
    });
  });
}

// ---- Toast CSS (injected) ----
(function injectToastCSS() {
  const style = document.createElement('style');
  style.textContent = `
    .toast {
      position: fixed;
      bottom: 5rem;
      left: 50%;
      transform: translateX(-50%) translateY(2rem);
      background: var(--foreground);
      color: var(--background);
      padding: 0.75rem 1.5rem;
      border-radius: var(--radius);
      font-size: 0.875rem;
      opacity: 0;
      transition: opacity 0.3s, transform 0.3s;
      z-index: 9999;
      white-space: nowrap;
      pointer-events: none;
    }
    .toast.show {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  `;
  document.head.appendChild(style);
})();

// ---- Init on DOM Ready ----
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  NavbarManager.init();
  Cart.updateBadge();

  // Theme toggle buttons
  document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
    btn.addEventListener('click', () => ThemeManager.toggle());
  });
});
