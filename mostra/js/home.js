/* ===========================
   HOME PAGE - Data & Rendering
   =========================== */

const CATEGORIES = [
  { id: 'fashion',     icon: '👗', name: 'Fashion',     count: 1240 },
  { id: 'electronics', icon: '📱', name: 'Electronics', count: 856  },
  { id: 'home-decor',  icon: '🏠', name: 'Home & Decor',count: 632  },
  { id: 'food',        icon: '🍕', name: 'Food & Drink', count: 421  },
  { id: 'beauty',      icon: '💄', name: 'Beauty',       count: 389  },
  { id: 'sports',      icon: '⚽', name: 'Sports',       count: 278  },
  { id: 'books',       icon: '📚', name: 'Books',        count: 195  },
  { id: 'toys',        icon: '🧸', name: 'Toys & Kids',  count: 314  },
];

const PRODUCTS = [
  {
    id: 'p1', name: 'Handcrafted Leather Wallet',
    price: 49.99, originalPrice: 69.99,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594785?w=400&q=80',
    rating: 4.8, reviews: 124, brand: 'CraftCo', discount: 29
  },
  {
    id: 'p2', name: 'Organic Cotton Tote Bag',
    price: 24.99, originalPrice: null,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80',
    rating: 4.6, reviews: 89, brand: 'EcoWear', isNew: true
  },
  {
    id: 'p3', name: 'Artisan Ceramic Mug Set',
    price: 34.99, originalPrice: 45.00,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&q=80',
    rating: 4.9, reviews: 203, brand: 'PotteryHouse', discount: 22
  },
  {
    id: 'p4', name: 'Handwoven Scarf',
    price: 39.99, originalPrice: null,
    image: 'https://images.unsplash.com/photo-1601924351433-2a18faef50aa?w=400&q=80',
    rating: 4.5, reviews: 67, brand: 'LocalWeave', isNew: true
  },
  {
    id: 'p5', name: 'Natural Soy Candle',
    price: 18.99, originalPrice: 25.00,
    image: 'https://images.unsplash.com/photo-1603905753049-1c5b1f93cadf?w=400&q=80',
    rating: 4.7, reviews: 156, brand: 'GlowLocal', discount: 24
  },
  {
    id: 'p6', name: 'Bamboo Cutting Board',
    price: 29.99, originalPrice: null,
    image: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eab3?w=400&q=80',
    rating: 4.4, reviews: 92, brand: 'GreenKitchen'
  },
  {
    id: 'p7', name: 'Hand-painted Phone Case',
    price: 22.99, originalPrice: 30.00,
    image: 'https://images.unsplash.com/photo-1601972599720-36938d4ecd31?w=400&q=80',
    rating: 4.3, reviews: 44, brand: 'ArtCase', discount: 23
  },
  {
    id: 'p8', name: 'Wooden Desk Organizer',
    price: 54.99, originalPrice: null,
    image: 'https://images.unsplash.com/photo-1593642532400-2682810df593?w=400&q=80',
    rating: 4.8, reviews: 77, brand: 'WoodWorks', isNew: true
  },
];

const NEW_ARRIVALS = [
  {
    id: 'n1', name: 'Macrame Wall Hanging',
    price: 44.99, originalPrice: null,
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400&q=80',
    rating: 4.7, reviews: 31, brand: 'BohoArt', isNew: true
  },
  {
    id: 'n2', name: 'Pressed Flower Notebook',
    price: 16.99, originalPrice: null,
    image: 'https://images.unsplash.com/photo-1531346680769-a1d79b57de5c?w=400&q=80',
    rating: 4.5, reviews: 18, brand: 'PaperCraft', isNew: true
  },
  {
    id: 'n3', name: 'Handmade Soap Set',
    price: 28.99, originalPrice: null,
    image: 'https://images.unsplash.com/photo-1600857544200-b2f468e06e44?w=400&q=80',
    rating: 4.9, reviews: 55, brand: 'SoapLab', isNew: true
  },
  {
    id: 'n4', name: 'Linen Cushion Cover',
    price: 19.99, originalPrice: null,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80',
    rating: 4.6, reviews: 22, brand: 'HomeWeave', isNew: true
  },
];

const BRANDS = [
  { id: 'b1', emoji: '👜', name: 'CraftCo',      location: 'Cairo, Egypt',    products: 45,  rating: 4.8 },
  { id: 'b2', emoji: '🌿', name: 'EcoWear',      location: 'Alexandria, Egypt', products: 32, rating: 4.6 },
  { id: 'b3', emoji: '🏺', name: 'PotteryHouse', location: 'Luxor, Egypt',    products: 28,  rating: 4.9 },
  { id: 'b4', emoji: '🕯️', name: 'GlowLocal',   location: 'Giza, Egypt',     products: 19,  rating: 4.7 },
];

// ---- Render Categories ----
function renderCategories() {
  const grid = document.getElementById('categories-grid');
  if (!grid) return;
  grid.innerHTML = CATEGORIES.map(cat => `
    <a href="explore.html?category=${cat.id}" class="category-card">
      <div class="category-card__icon">${cat.icon}</div>
      <h3 class="category-card__name">${cat.name}</h3>
      <p class="category-card__count">${cat.count.toLocaleString()} items</p>
    </a>
  `).join('');
}

// ---- Render Products ----
function renderProducts(containerId, products) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = products.map(p => buildProductCard(p)).join('');
}

// ---- Render Brands ----
function renderBrands() {
  const grid = document.getElementById('brands-grid');
  if (!grid) return;
  grid.innerHTML = BRANDS.map(b => `
    <a href="brands.html#${b.id}" class="brand-card">
      <div class="brand-card__logo">${b.emoji}</div>
      <h3 class="brand-card__name">${b.name}</h3>
      <div class="brand-card__location">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
        ${b.location}
      </div>
      <div class="brand-card__stats">
        <span>${b.products} products</span>
        <span class="brand-card__rating">
          ★ ${b.rating}
        </span>
      </div>
    </a>
  `).join('');
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  renderCategories();
  renderProducts('featured-grid', PRODUCTS);
  renderProducts('new-arrivals-grid', NEW_ARRIVALS);
  renderBrands();
});
