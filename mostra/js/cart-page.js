/* ===========================
   CART PAGE JS
   =========================== */

function renderCart() {
  const layout = document.getElementById('cart-layout');
  if (!layout) return;

  const items = Cart.items;

  if (items.length === 0) {
    layout.innerHTML = `
      <div class="cart-empty" style="grid-column:1/-1">
        <div class="cart-empty__icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <a href="index.html" class="btn btn-primary btn-lg">Start Shopping</a>
      </div>`;
    return;
  }

  const subtotal = Cart.total();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  layout.innerHTML = `
    <div class="cart-items" id="cart-items-list">
      ${items.map(item => `
        <div class="cart-item" data-id="${item.id}">
          <img class="cart-item__image"
               src="${item.image}"
               alt="${item.name}"
               onerror="this.src='https://placehold.co/80x80/ececf0/717182?text=?'">
          <div class="cart-item__body">
            <p class="cart-item__brand">${item.brand || ''}</p>
            <p class="cart-item__name">${item.name}</p>
            <p class="cart-item__price">$${(item.price * item.qty).toFixed(2)}</p>
            <div class="cart-item__qty">
              <button class="qty-btn" onclick="changeQty('${item.id}', -1)">−</button>
              <span class="qty-value" id="qty-${item.id}">${item.qty}</span>
              <button class="qty-btn" onclick="changeQty('${item.id}', 1)">+</button>
            </div>
            <a class="cart-item__remove" onclick="removeItem('${item.id}')">Remove</a>
          </div>
        </div>
      `).join('')}
    </div>

    <aside class="order-summary">
      <h2 class="order-summary__title">Order Summary</h2>
      <div class="order-summary__row">
        <span>Subtotal (${Cart.count()} items)</span>
        <span>$${subtotal.toFixed(2)}</span>
      </div>
      <div class="order-summary__row">
        <span>Shipping</span>
        <span>${shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2)}</span>
      </div>
      <div class="order-summary__row order-summary__row--total">
        <span>Total</span>
        <span>$${total.toFixed(2)}</span>
      </div>
      ${shipping > 0 ? `<p style="font-size:0.75rem;color:var(--text-secondary);margin:0.75rem 0">Add $${(50 - subtotal).toFixed(2)} more for FREE shipping!</p>` : ''}
      <a href="checkout.html" class="btn btn-primary" style="width:100%;margin-top:1.25rem;padding:0.875rem;justify-content:center">
        Proceed to Checkout
      </a>
      <a href="index.html" class="btn btn-ghost" style="width:100%;margin-top:0.5rem;justify-content:center;font-size:0.875rem">
        Continue Shopping
      </a>
    </aside>`;
}

function changeQty(id, delta) {
  const item = Cart.items.find(i => i.id === id);
  if (!item) return;
  const newQty = item.qty + delta;
  if (newQty < 1) {
    removeItem(id);
    return;
  }
  Cart.updateQty(id, newQty);
  renderCart();
  Cart.updateBadge();
}

function removeItem(id) {
  Cart.remove(id);
  renderCart();
}

document.addEventListener('DOMContentLoaded', renderCart);
