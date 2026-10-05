'use strict';

const { categories = [], products = [] } = window.POSTA_MENU || {};
const money = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 });
const cart = new Map();
const STORAGE_KEYS = { cart: 'posta_cart_v1' };

// Detectar entorno: en producción, window.location.origin; en desarrollo, usar puerto 3000
const API_BASE = (() => {
  if (window.location.port === '3000') return '';
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://127.0.0.1:3000';
  }
  return '';
})();

const grid = document.querySelector('#product-grid');
const categoryBar = document.querySelector('#category-bar');
const drawer = document.querySelector('#cart-drawer');
const scrim = document.querySelector('.drawer-scrim');
const toast = document.querySelector('.toast');
const accountDialog = document.querySelector('.account-dialog');
let currentCategory = 'todos';
let toastTimer;

function priceText(product) {
  return product.price === null ? (product.priceLabel || 'Consultar') : money.format(product.price);
}

function getCategory(id) {
  return categories.find((category) => category.id === id);
}

function readStoredCart() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.cart);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return;
    parsed.forEach(([id, quantity]) => {
      if (typeof id === 'string' && Number.isFinite(quantity) && quantity > 0) {
        cart.set(id, quantity);
      }
    });
  } catch (error) {
    console.warn('Error leyendo carrito guardado:', error);
  }
}

function persistCart() {
  try {
    const entries = [...cart.entries()];
    window.localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(entries));
  } catch (error) {
    console.warn('Error guardando carrito:', error);
  }
}

function getCartTotal() {
  return [...cart.entries()].reduce((sum, [id, quantity]) => {
    const product = products.find((item) => item.id === id);
    if (!product || product.price === null) return sum;
    return sum + product.price * quantity;
  }, 0);
}

function getCartItems() {
  return [...cart.entries()].map(([id, quantity]) => {
    const product = products.find((item) => item.id === id);
    if (!product) return null;
    return {
      id: product.id,
      name: product.name,
      quantity,
      price: product.price,
      subtotal: product.price * quantity
    };
  }).filter(Boolean);
}

function saveOrderToServer(orderPayload) {
  return fetch(`${API_BASE}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderPayload)
  }).then(async (response) => {
    const json = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(json.error || 'No se pudo guardar el pedido.');
    }
    return json;
  });
}

function loadOrdersFromServer() {
  return fetch(`${API_BASE}/api/orders`).then(async (response) => {
    const json = await response.json().catch(() => []);
    if (!response.ok) {
      throw new Error('No se pudieron cargar los pedidos.');
    }
    return Array.isArray(json) ? json : [];
  });
}

function renderCategories() {
  if (!categoryBar) return;
  const countAll = products.length;
  const allButton = `<button class="category-chip is-active" type="button" data-category="todos" aria-pressed="true">Todo <span>${String(countAll).padStart(2, '0')}</span></button>`;
  const categoryButtons = categories.map((category) => {
    const count = products.filter((product) => product.category === category.id).length;
    return `<button class="category-chip" type="button" data-category="${category.id}" aria-pressed="false">${category.label} <span>${String(count).padStart(2, '0')}</span></button>`;
  }).join('');
  categoryBar.innerHTML = `${allButton}${categoryButtons}<span class="menu-edit-note"><span aria-hidden="true"><img src="/assets/asterisk.png" alt="" class="star-img"></span> Precios en pesos argentinos</span>`;
}

function renderProducts() {
  if (!grid) return;
  const visible = currentCategory === 'todos' ? products : products.filter((product) => product.category === currentCategory);
  if (!visible.length) {
    grid.innerHTML = '<p class="no-results">No hay productos en esta sección.</p>';
    return;
  }
  grid.innerHTML = visible.map((product) => {
    const category = getCategory(product.category);
    const description = product.description || category.note || '';
    const priceIsUnknown = product.price === null;
    return `
      <article class="product-card">
        <div class="product-visual" style="--art-bg:${product.art || '#eadbc2'}">
          <span class="product-ribbon">${category.shortLabel}</span>
          <span class="product-mark" aria-hidden="true"><img src="/assets/asterisk.png" alt="" class="star-img"></span>
          <span class="product-glyph" aria-hidden="true"><span class="product-image-placeholder">coloca tu<br>imagen aqui</span></span>
        </div>
        <div class="product-copy">
          <div class="product-meta"><span class="product-tag">${category.label}</span>${category.note ? `<span class="product-rating">${category.note}</span>` : ''}</div>
          <h3>${product.name}</h3>
          <p>${description}</p>
          <div class="product-card-bottom"><span class="product-price">${priceText(product)}</span><button class="add-button" type="button" data-add="${product.id}" aria-label="Agregar ${product.name} a tu bolsa" ${priceIsUnknown ? 'disabled title="Precio a confirmar"' : ''}>+</button></div>
        </div>
      </article>
    `;
  }).join('');
}

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 3200);
}

function openCart() {
  if (!drawer) return;
  drawer.classList.add('is-open');
  drawer.setAttribute('aria-hidden', 'false');
  document.querySelector('.cart-trigger')?.setAttribute('aria-expanded', 'true');
  scrim.hidden = false;
  requestAnimationFrame(() => scrim.classList.add('is-visible'));
  document.querySelector('.cart-close')?.focus();
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  if (!drawer) return;
  drawer.classList.remove('is-open');
  drawer.setAttribute('aria-hidden', 'true');
  document.querySelector('.cart-trigger')?.setAttribute('aria-expanded', 'false');
  scrim.classList.remove('is-visible');
  window.setTimeout(() => { scrim.hidden = true; }, 230);
  document.body.style.overflow = '';
}

function openAccount() {
  const nav = document.querySelector('#primary-nav');
  if (nav) nav.classList.remove('is-open');
  const toggle = document.querySelector('.mobile-menu-toggle');
  if (toggle) toggle.setAttribute('aria-expanded', 'false');
  window.location.href = '/admin.html';
}

function navigateToCheckout() {
  const items = getCartItems();
  if (!items.length) {
    showToast('Tu bolsa está vacía. Agregá algo primero.');
    return;
  }
  window.location.href = '/checkout.html';
}

function addItem(id) {
  const product = products.find((item) => item.id === id);
  if (!product || product.price === null) {
    showToast('El precio de este producto está por confirmar.');
    return;
  }
  cart.set(id, (cart.get(id) || 0) + 1);
  persistCart();
  renderCart();
  showToast(`${product.name}: sumado a tu bolsa.`);
}

function changeQuantity(id, amount) {
  const next = (cart.get(id) || 0) + amount;
  if (next <= 0) cart.delete(id);
  else cart.set(id, next);
  persistCart();
  renderCart();
}

function renderCart() {
  const itemCount = [...cart.values()].reduce((sum, quantity) => sum + quantity, 0);
  const total = getCartTotal();
  
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) {
    cartCount.textContent = String(itemCount);
    cartCount.setAttribute('aria-label', `${itemCount} artículos en la bolsa`);
  }

  const cartItems = document.querySelector('.cart-items');
  if (cartItems) {
    const items = getCartItems();
    cartItems.innerHTML = items.map(({ id, name, quantity, price, subtotal }) => `
      <article class="cart-line">
        <span class="cart-line-art" aria-hidden="true"><span class="cart-line-placeholder">coloca tu<br>imagen aqui</span></span>
        <div class="cart-line-copy">
          <h3>${name}</h3>
          <p>${money.format(price)} c/u</p>
          <div class="quantity-control" aria-label="Cantidad de ${name}">
            <button type="button" data-quantity="-1" data-id="${id}" aria-label="Quitar uno">−</button>
            <span>${quantity}</span>
            <button type="button" data-quantity="1" data-id="${id}" aria-label="Agregar uno">+</button>
          </div>
        </div>
        <span class="cart-line-price">${money.format(subtotal)}</span>
      </article>
    `).join('');
  }

  const isEmpty = itemCount === 0;
  const cartEmpty = document.querySelector('.cart-empty');
  const cartFooter = document.querySelector('.cart-footer');
  if (cartEmpty) cartEmpty.hidden = !isEmpty;
  if (cartFooter) cartFooter.hidden = isEmpty;
  
  const cartSubtotal = document.querySelector('.cart-subtotal strong');
  if (cartSubtotal) cartSubtotal.textContent = money.format(total);
}

// Detectar páginas
const isHomePage = Boolean(grid && categoryBar && drawer);
const isCheckoutPage = document.body.dataset.page === 'checkout';
const isAdminPage = document.body.dataset.page === 'admin';

// Home
if (isHomePage) {
  readStoredCart();
  renderCategories();
  renderProducts();
  renderCart();

  categoryBar.addEventListener('click', (event) => {
    const chip = event.target.closest('[data-category]');
    if (!chip) return;
    currentCategory = chip.dataset.category;
    document.querySelectorAll('.category-chip').forEach((item) => {
      item.classList.toggle('is-active', item === chip);
      item.setAttribute('aria-pressed', String(item === chip));
    });
    renderProducts();
  });

  grid.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-add]');
    if (!btn) return;
    addItem(btn.dataset.add);
  });

  document.querySelector('.cart-trigger')?.addEventListener('click', openCart);
  document.querySelector('.cart-close')?.addEventListener('click', closeCart);
  scrim?.addEventListener('click', closeCart);

  document.querySelector('.cart-items')?.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-quantity]');
    if (!btn) return;
    changeQuantity(btn.dataset.id, Number(btn.dataset.quantity));
  });

  document.querySelector('.checkout-demo')?.addEventListener('click', navigateToCheckout);

  document.querySelectorAll('[data-open-account]').forEach((btn) => {
    btn.addEventListener('click', openAccount);
  });

  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const primaryNav = document.querySelector('#primary-nav');
  mobileToggle?.addEventListener('click', () => {
    const isOpen = primaryNav?.classList.toggle('is-open');
    mobileToggle.setAttribute('aria-expanded', String(Boolean(isOpen)));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeCart();
  });
}

// Checkout
if (isCheckoutPage) {
  readStoredCart();
  const checkoutList = document.querySelector('#checkout-items');
  const checkoutTotal = document.querySelector('#checkout-total');
  const checkoutForm = document.querySelector('#checkout-form');
  const mpField = document.querySelector('#payment-link-field');
  const mpValue = document.querySelector('#payment-link');
  const successBox = document.querySelector('#checkout-success');

  function renderCheckoutSummary() {
    if (!checkoutList || !checkoutTotal) return;
    const items = getCartItems();
    const total = getCartTotal();
    if (!items.length) {
      checkoutList.innerHTML = '<li class="empty-order">Tu bolsa está vacía.</li>';
      checkoutTotal.textContent = money.format(0);
      return;
    }
    checkoutList.innerHTML = items.map(({ name, quantity, price, subtotal }) => `
      <li>
        <span>${name} × ${quantity}</span>
        <strong>${money.format(subtotal)}</strong>
      </li>
    `).join('');
    checkoutTotal.textContent = money.format(total);
  }

  function updateMpVisibility() {
    if (!mpField || !mpValue) return;
    const isMpSelected = document.querySelector('input[name="paymentMethod"]:checked')?.value === 'mercadopago';
    mpField.hidden = !isMpSelected;
    mpValue.required = isMpSelected;
  }

  if (checkoutForm) {
    document.querySelectorAll('input[name="paymentMethod"]').forEach((radio) => {
      radio.addEventListener('change', updateMpVisibility);
    });

    checkoutForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(checkoutForm);
      const items = getCartItems();
      if (!items.length) {
        showToast('Tu bolsa está vacía.');
        return;
      }

      const paymentMethod = formData.get('paymentMethod');
      const paymentLink = String(formData.get('paymentLink') || '').trim();
      const name = String(formData.get('name') || '').trim();
      const phone = String(formData.get('phone') || '').trim();
      const orderType = String(formData.get('orderType') || 'delivery');
      const address = String(formData.get('address') || '').trim();
      const notes = String(formData.get('notes') || '').trim();

      const payload = {
        name,
        phone,
        orderType,
        address,
        notes,
        paymentMethod,
        paymentLink,
        items,
        total: getCartTotal()
      };

      try {
        const result = await saveOrderToServer(payload);
        cart.clear();
        persistCart();
        renderCheckoutSummary();
        checkoutForm.reset();
        if (successBox) successBox.hidden = false;
        successBox?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        if (paymentMethod === 'mercadopago' && paymentLink) {
          window.open(paymentLink, '_blank', 'noopener');
        }
        showToast(`Pedido guardado correctamente (${result.orderId || 'ok'}).`);
      } catch (error) {
        console.error('Error al guardar pedido:', error);
        showToast(error.message || 'No se pudo registrar el pedido.');
      }
    });
  }

  renderCheckoutSummary();
  updateMpVisibility();
}

// Admin
if (isAdminPage) {
  const ordersPanel = document.querySelector('#orders-panel');
  const refreshButton = document.querySelector('#refresh-orders');

  function formatMoney(value) {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(value);
  }

  async function loadOrders() {
    if (!ordersPanel) return;
    try {
      const orders = await loadOrdersFromServer();
      if (!orders.length) {
        ordersPanel.innerHTML = `
          <div class="empty-admin-state">
            <span class="empty-doodle" aria-hidden="true">〰</span>
            <h2>No hay pedidos todavía.</h2>
            <p>Cuando alguien complete el checkout desde la web principal, aparecerá acá.</p>
          </div>
        `;
        return;
      }

      ordersPanel.innerHTML = orders.map((order) => `
        <article class="admin-order-card">
          <header class="admin-order-head">
            <div>
              <p class="admin-order-id">${order.id}</p>
              <h2>${order.name || 'Cliente sin nombre'}</h2>
            </div>
            <span class="admin-order-status">${order.status || 'pendiente'}</span>
          </header>

          <div class="admin-order-meta">
            <p><strong>Tel:</strong> ${order.phone || '—'}</p>
            <p><strong>Tipo:</strong> ${order.orderType || 'delivery'}</p>
            <p><strong>Pago:</strong> ${order.paymentMethod === 'mercadopago' ? 'Mercado Pago' : 'Efectivo'}</p>
            <p><strong>Total:</strong> ${formatMoney(order.total || 0)}</p>
          </div>

          <div class="admin-order-address">
            <strong>Dirección:</strong>
            <span>${order.address || '—'}</span>
          </div>

          <div class="admin-order-notes">
            <strong>Notas:</strong>
            <span>${order.notes || 'Sin notas.'}</span>
          </div>

          <div class="admin-order-items">
            <strong>Productos:</strong>
            <ul>
              ${(order.items || []).map((item) => `<li>${item.name} × ${item.quantity} — ${formatMoney(item.subtotal)}</li>`).join('')}
            </ul>
          </div>

          ${order.paymentMethod === 'mercadopago' && order.paymentLink ? `<p class="admin-order-link"><strong>Link MP:</strong> <a href="${order.paymentLink}" target="_blank" rel="noopener noreferrer">Abrir enlace</a></p>` : ''}
        </article>
      `).join('');
    } catch (error) {
      console.error('Error al leer pedidos:', error);
      ordersPanel.innerHTML = '<p class="admin-error">No se pudieron cargar los pedidos.</p>';
    }
  }

  if (refreshButton) {
    refreshButton.addEventListener('click', loadOrders);
  }
  loadOrders();
}
