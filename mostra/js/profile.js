/* ===========================
   PROFILE PAGE JS
   =========================== */

const ORDERS = [
  { id:'MST-482901', date:'Feb 14, 2026', status:'Delivered', items:['🧴','👜','🕯️'], total:83.97, count:3 },
  { id:'MST-371820', date:'Jan 29, 2026', status:'Shipped',   items:['🏺','📦'],      total:34.99, count:1 },
  { id:'MST-260741', date:'Jan 10, 2026', status:'Processing',items:['🧸'],           total:22.50, count:1 },
];

const WISHLIST_ITEMS = [
  { id:'w1', name:'Handwoven Basket', price:38.99, img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80' },
  { id:'w2', name:'Natural Linen Napkins', price:19.99, img:'https://images.unsplash.com/photo-1600857544200-b2f468e06e44?w=300&q=80' },
  { id:'w3', name:'Painted Ceramic Vase', price:54.99, img:'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=300&q=80' },
];

const STATUS_BADGE = {
  Delivered: 'badge-success',
  Shipped:   'badge-warning',
  Processing:'badge-default',
  Cancelled: 'badge-destructive',
};

function switchTab(name, btn) {
  document.querySelectorAll('.tab-panel').forEach(p => p.style.display = 'none');
  document.querySelectorAll('.profile-nav__item').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + name).style.display = 'block';
  btn.classList.add('active');
}

function renderOrders() {
  document.getElementById('orders-list').innerHTML = ORDERS.map(o => `
    <div class="order-card">
      <div class="order-header">
        <div>
          <p class="order-id">${o.id}</p>
          <p class="order-date">${o.date}</p>
        </div>
        <span class="badge ${STATUS_BADGE[o.status] || 'badge-default'}">${o.status}</span>
      </div>
      <div class="order-imgs">
        ${o.items.map(img => `<div class="order-img">${img}</div>`).join('')}
      </div>
      <div class="order-footer">
        <div class="order-summary">
          <span>${o.count} item${o.count > 1 ? 's' : ''} · </span>
          <strong>$${o.total.toFixed(2)}</strong>
        </div>
        <div class="order-actions">
          <button class="btn btn-outline btn-sm">Track</button>
          <button class="btn btn-secondary btn-sm">Reorder</button>
        </div>
      </div>
    </div>
  `).join('');
}

function renderWishlist() {
  document.getElementById('wishlist-grid').innerHTML = WISHLIST_ITEMS.map(item => `
    <div class="wishlist-item">
      <div class="wishlist-item__img">
        <img src="${item.img}" alt="${item.name}"
             onerror="this.src='https://placehold.co/200x200/ececf0/717182?text=?'">
      </div>
      <p class="wishlist-item__name">${item.name}</p>
      <div class="wishlist-item__footer">
        <span class="wishlist-item__price">$${item.price}</span>
        <button class="btn btn-primary btn-sm"
                onclick="Cart.add({id:'${item.id}',name:'${item.name}',price:${item.price},image:'${item.img}',brand:'Local Brand'})">
          Add
        </button>
      </div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderOrders();
  renderWishlist();
  // Handle hash links like profile.html#orders
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    const btn = document.querySelector(`[onclick*="switchTab('${hash}'"]`);
    if (btn) switchTab(hash, btn);
  }
});
