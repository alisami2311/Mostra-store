/* ===========================
   MOSTRA - HTML Components
   Inject navbar & footer into every page
   =========================== */

const NavbarHTML = `
<nav class="navbar">
  <div class="container">
    <div class="navbar__inner">

      <!-- Logo -->
      <a href="index.html" class="navbar__logo">
        <div class="navbar__logo-icon"><span>M</span></div>
        <span class="navbar__logo-text">Mostra</span>
      </a>

      <!-- Desktop Nav Links -->
      <div class="navbar__links">
        <a href="index.html"      class="navbar__link" data-page="index.html">Home</a>
        <a href="explore.html"    class="navbar__link" data-page="explore.html">Explore</a>
        <a href="categories.html" class="navbar__link" data-page="categories.html">Categories</a>
      </div>

      <!-- Search Bar -->
      <div class="navbar__search">
        <div class="input-group">
          <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input type="text" class="input" id="navbar-search" placeholder="Search products, brands..." />
        </div>
      </div>

      <!-- Actions -->
      <div class="navbar__actions">

        <!-- Theme Toggle -->
        <button class="navbar__action-btn" data-theme-toggle aria-label="Toggle theme">
          <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:block">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
          <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:none">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
        </button>

        <!-- Wishlist -->
        <a href="wishlist.html" class="navbar__action-btn navbar__desktop-only" aria-label="Wishlist">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </a>

        <!-- Cart -->
        <a href="cart.html" class="navbar__action-btn" aria-label="Cart" style="position:relative">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <span class="navbar__badge" data-cart-badge style="display:none">0</span>
        </a>

        <!-- Profile -->
        <a href="profile.html" class="navbar__action-btn navbar__desktop-only" aria-label="Profile">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </a>

        <!-- Login -->
        <a href="login.html" class="navbar__login-btn">Login</a>

        <!-- Mobile Menu Btn -->
        <button class="navbar__menu-btn" data-mobile-menu-btn aria-label="Menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Search -->
    <div class="navbar__mobile-search">
      <div class="input-group">
        <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input type="text" class="input" placeholder="Search products..." />
      </div>
    </div>
  </div>

  <!-- Mobile Dropdown Menu -->
  <div class="navbar__mobile-menu" data-mobile-menu>
    <a href="index.html"      class="navbar__link" data-page="index.html">Home</a>
    <a href="explore.html"    class="navbar__link" data-page="explore.html">Explore</a>
    <a href="categories.html" class="navbar__link" data-page="categories.html">Categories</a>
    <div class="navbar__mobile-menu-divider">
      <a href="login.html"  class="navbar__link" style="color:var(--primary)">Login</a>
      <a href="signup.html" class="navbar__link">Sign Up</a>
    </div>
  </div>
</nav>`;

const FooterHTML = `
<footer class="footer">
  <div class="container footer__inner">
    <div class="footer__grid">

      <!-- Brand -->
      <div>
        <a href="index.html" class="navbar__logo" style="margin-bottom:1rem;display:inline-flex">
          <div class="navbar__logo-icon"><span>M</span></div>
          <span class="navbar__logo-text">Mostra</span>
        </a>
        <p class="footer__brand-desc">Supporting local brands and connecting communities through quality products.</p>
        <div class="footer__social">
          <a href="#" class="footer__social-btn" aria-label="Facebook">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="#" class="footer__social-btn" aria-label="Twitter">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
          </a>
          <a href="#" class="footer__social-btn" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
          <a href="#" class="footer__social-btn" aria-label="Youtube">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
          </a>
        </div>
      </div>

      <!-- Shop -->
      <div>
        <h4 class="footer__col-title">Shop</h4>
        <ul class="footer__links">
          <li><a href="explore.html">All Products</a></li>
          <li><a href="categories.html">Categories</a></li>
          <li><a href="brands.html">Brands</a></li>
          <li><a href="deals.html">Special Offers</a></li>
        </ul>
      </div>

      <!-- Support -->
      <div>
        <h4 class="footer__col-title">Support</h4>
        <ul class="footer__links">
          <li><a href="help.html">Help Center</a></li>
          <li><a href="shipping.html">Shipping Info</a></li>
          <li><a href="returns.html">Returns</a></li>
          <li><a href="contact.html">Contact Us</a></li>
        </ul>
      </div>

      <!-- About -->
      <div>
        <h4 class="footer__col-title">About</h4>
        <ul class="footer__links">
          <li><a href="about.html">About Us</a></li>
          <li><a href="vendors.html">Become a Vendor</a></li>
          <li><a href="privacy.html">Privacy Policy</a></li>
          <li><a href="terms.html">Terms of Service</a></li>
        </ul>
      </div>
    </div>

    <div class="footer__bottom">
      <p>© 2026 Mostra. All rights reserved. Supporting local businesses worldwide.</p>
    </div>
  </div>
</footer>

<!-- Mobile Bottom Nav -->
<nav class="mobile-nav">
  <a href="index.html" class="mobile-nav__item" data-page="index.html">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
    <span>Home</span>
  </a>
  <a href="explore.html" class="mobile-nav__item" data-page="explore.html">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
    <span>Explore</span>
  </a>
  <a href="cart.html" class="mobile-nav__item" data-page="cart.html">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
    <span>Cart</span>
  </a>
  <a href="profile.html" class="mobile-nav__item" data-page="profile.html">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
    <span>Profile</span>
  </a>
</nav>`;

// ---- Inject into page ----
document.addEventListener('DOMContentLoaded', () => {
  // Navbar
  const navPlaceholder = document.getElementById('navbar');
  if (navPlaceholder) navPlaceholder.outerHTML = NavbarHTML;

  // Footer
  const footerPlaceholder = document.getElementById('footer');
  if (footerPlaceholder) footerPlaceholder.outerHTML = FooterHTML;

  // Mark active nav items after injection
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-page]').forEach(el => {
    if (el.dataset.page === page) el.classList.add('active');
  });
});
