/* ===========================
   PRODUCT PAGE JS
   =========================== */

const PRODUCTS_DB = {
  p1: {
    id: 'p1', name: 'Handcrafted Leather Wallet', brand: 'CraftCo', price: 49.99, originalPrice: 69.99,
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594785?w=700&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=700&q=80',
    ],
    rating: 4.8, reviews: 124, stock: 15, discount: 29,
    desc: 'Premium full-grain leather wallet handcrafted by local artisans. Slim profile fits up to 8 cards with a convenient cash slot. Develops a beautiful patina over time.',
    features: ['Full-grain leather', 'RFID blocking protection', 'Fits 8 cards + cash', 'Handstitched edges', '2-year warranty'],
    category: 'fashion',
    reviewList: [
      { name: 'Ahmed K.', avatar: '👤', rating: 5, date: 'Jan 12, 2026', comment: 'Absolutely love this wallet! The leather quality is exceptional and it fits perfectly in my pocket. Highly recommend.' },
      { name: 'Sara M.', avatar: '👩', rating: 4, date: 'Dec 28, 2025', comment: 'Great quality for the price. The stitching is solid and the RFID protection gives me peace of mind.' },
      { name: 'Omar R.', avatar: '👨', rating: 5, date: 'Dec 5, 2025', comment: 'Bought this as a gift and the recipient loved it. Beautiful packaging too!' },
    ],
    ratingDist: { 5: 70, 4: 20, 3: 6, 2: 2, 1: 2 }
  },
  p3: {
    id: 'p3', name: 'Artisan Ceramic Mug Set', brand: 'PotteryHouse', price: 34.99, originalPrice: 45.00,
    images: [
      'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=700&q=80',
      'https://images.unsplash.com/photo-1590786652262-a2ee1b7fbc07?w=700&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=700&q=80',
    ],
    rating: 4.9, reviews: 203, stock: 8, discount: 22,
    desc: 'Set of 4 hand-thrown ceramic mugs, each unique in character. Food-safe glaze, microwave and dishwasher safe. Perfect for morning coffee or afternoon tea.',
    features: ['Set of 4 unique mugs', 'Hand-thrown on wheel', 'Food-safe glaze', 'Microwave & dishwasher safe', '350ml capacity'],
    category: 'home-decor',
    reviewList: [
      { name: 'Layla H.', avatar: '👩', rating: 5, date: 'Feb 1, 2026', comment: 'These mugs are stunning! Every one is slightly different which makes them feel special. My morning coffee tastes better in them.' },
      { name: 'Karim B.', avatar: '👨', rating: 5, date: 'Jan 20, 2026', comment: 'Incredible craftsmanship. Bought a second set as a wedding gift.' },
    ],
    ratingDist: { 5: 80, 4: 15, 3: 3, 2: 1, 1: 1 }
  }
};

const RELATED = [
  { id:'p2', name:'Organic Cotton Tote Bag', price:24.99, image:'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80', rating:4.6, reviews:89, brand:'EcoWear', isNew:true },
  { id:'p5', name:'Natural Soy Candle', price:18.99, originalPrice:25.00, image:'https://images.unsplash.com/photo-1603905753049-1c5b1f93cadf?w=400&q=80', rating:4.7, reviews:156, brand:'GlowLocal' },
  { id:'p6', name:'Bamboo Cutting Board', price:29.99, image:'https://images.unsplash.com/photo-1591769225440-811ad7d6eab3?w=400&q=80', rating:4.4, reviews:92, brand:'GreenKitchen' },
  { id:'p8', name:'Wooden Desk Organizer', price:54.99, image:'https://images.unsplash.com/photo-1593642532400-2682810df593?w=400&q=80', rating:4.8, reviews:77, brand:'WoodWorks', isNew:true },
];

let currentQty = 1;
let currentImg = 0;
let product = null;

function getProduct() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id') || 'p1';
  return PRODUCTS_DB[id] || PRODUCTS_DB['p1'];
}

function renderProduct(p) {
  document.title = `${p.name} – Mostra`;
  document.getElementById('breadcrumb-name').textContent = p.name;

  document.getElementById('product-section').innerHTML = `
    <!-- Gallery -->
    <div class="gallery">
      <div class="gallery__main">
        <img id="main-img" src="${p.images[0]}" alt="${p.name}"
             onerror="this.src='https://placehold.co/700x700/ececf0/717182?text=No+Image'">
      </div>
      <div class="gallery__thumbs">
        ${p.images.map((img, i) => `
          <button class="gallery__thumb ${i === 0 ? 'active' : ''}" onclick="switchImg(${i},'${img}',this)">
            <img src="${img}" alt="View ${i+1}"
                 onerror="this.src='https://placehold.co/200x200/ececf0/717182?text=?'">
          </button>`).join('')}
      </div>
    </div>

    <!-- Info -->
    <div class="product-info">
      <a href="brands.html" class="product-info__brand">${p.brand}</a>
      <h1 class="product-info__name">${p.name}</h1>

      <div class="product-info__rating">
        ${buildStars(p.rating, 5, 'lg')}
        <span class="product-info__review-count">${p.reviews} reviews</span>
      </div>

      <div class="product-info__price-row">
        <span class="product-info__price">$${p.price.toFixed(2)}</span>
        ${p.originalPrice ? `<span class="product-info__original">$${p.originalPrice.toFixed(2)}</span>` : ''}
        ${p.discount ? `<span class="badge badge-destructive">-${p.discount}%</span>` : ''}
      </div>

      <p class="product-info__desc">${p.desc}</p>

      <div class="features-box">
        ${p.features.map(f => `
          <div class="feature-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span>${f}</span>
          </div>`).join('')}
      </div>

      <div class="qty-row">
        <label style="font-size:.875rem;color:var(--text-secondary);font-weight:500">Quantity</label>
        <div class="qty-control">
          <button onclick="changeQty(-1)">−</button>
          <span id="qty-display">1</span>
          <button onclick="changeQty(1)">+</button>
        </div>
        <span class="stock-info">${p.stock} in stock</span>
      </div>

      <div class="action-row">
        <button class="add-to-cart-btn" onclick="addToCart()">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          Add to Cart
        </button>
        <button class="wishlist-toggle-btn" id="wishlist-btn" onclick="toggleWishlist()"
                title="Add to Wishlist">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>

      <button class="buy-now-btn" onclick="buyNow()">Buy Now</button>
    </div>`;
}

function switchImg(idx, src, btn) {
  currentImg = idx;
  document.getElementById('main-img').src = src;
  document.querySelectorAll('.gallery__thumb').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
}

function changeQty(delta) {
  currentQty = Math.max(1, Math.min(product.stock, currentQty + delta));
  document.getElementById('qty-display').textContent = currentQty;
}

function addToCart() {
  for (let i = 0; i < currentQty; i++) {
    Cart.add({ id: product.id, name: product.name, price: product.price, image: product.images[0], brand: product.brand });
  }
}

function buyNow() {
  addToCart();
  window.location.href = 'checkout.html';
}

function toggleWishlist() {
  Wishlist.toggle(product.id);
  const btn = document.getElementById('wishlist-btn');
  btn.classList.toggle('active', Wishlist.has(product.id));
}

function renderReviews(p) {
  const distEntries = Object.entries(p.ratingDist).reverse();
  document.getElementById('reviews-section').innerHTML = `
    <h2 class="reviews-section__title">Customer Reviews</h2>
    <div class="reviews-summary">
      <div class="rating-card">
        <div class="rating-card__number">${p.rating}</div>
        ${buildStars(p.rating, 5, 'lg')}
        <p class="rating-card__count">Based on ${p.reviews} reviews</p>
      </div>
      <div class="rating-bars">
        ${distEntries.map(([star, pct]) => `
          <div class="rating-bar">
            <span class="rating-bar__label">${star}★</span>
            <div class="rating-bar__track">
              <div class="rating-bar__fill" style="width:${pct}%"></div>
            </div>
            <span class="rating-bar__pct">${pct}%</span>
          </div>`).join('')}
      </div>
    </div>
    <div class="review-list">
      ${p.reviewList.map(r => `
        <div class="review-card">
          <div class="review-header">
            <div class="review-avatar">${r.avatar}</div>
            <div style="flex:1">
              <div class="review-top">
                <h4>${r.name}</h4>
                <span>${r.date}</span>
              </div>
              ${buildStars(r.rating, 5, 'sm')}
            </div>
          </div>
          <p class="review-comment">${r.comment}</p>
          <button class="helpful-btn">👍 Helpful</button>
        </div>`).join('')}
    </div>`;
}

document.addEventListener('DOMContentLoaded', () => {
  product = getProduct();
  renderProduct(product);
  renderReviews(product);
  // Related products
  const relGrid = document.getElementById('related-grid');
  if (relGrid) relGrid.innerHTML = RELATED.map(buildProductCard).join('');
  // Wishlist state
  const wBtn = document.getElementById('wishlist-btn');
  if (wBtn && Wishlist.has(product.id)) wBtn.classList.add('active');
});
