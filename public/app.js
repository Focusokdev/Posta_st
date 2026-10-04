'use strict';

const { categories, products } = window.POSTA_MENU;
const money = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 });
const cart = new Map();
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

function renderCategories() {
  const countAll = products.length;
  const allButton = `<button class="category-chip is-active" type="button" data-category="todos" aria-pressed="true">Todo <span>${String(countAll).padStart(2, '0')}</span></button>`;
  const categoryButtons = categories.map((category) => {
    const count = products.filter((product) => product.category === category.id).length;
    return `<button class="category-chip" type="button" data-category="${category.id}" aria-pressed="false">${category.label} <span>${String(count).padStart(2, '0')}</span></button>`;
  }).join('');
  categoryBar.innerHTML = `${allButton}${categoryButtons}<span class="menu-edit-note"><span aria-hidden="true">✳</span> Precios en pesos argentinos</span>`;
}

function renderProducts() {
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
          <span class="product-mark" aria-hidden="true">✳</span>
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
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 3200);
}

function openCart() {
  drawer.classList.add('is-open');
  drawer.setAttribute('aria-hidden', 'false');
  document.querySelector('.cart-trigger').setAttribute('aria-expanded', 'true');
  scrim.hidden = false;
  requestAnimationFrame(() => scrim.classList.add('is-visible'));
  document.querySelector('.cart-close').focus();
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  drawer.classList.remove('is-open');
  drawer.setAttribute('aria-hidden', 'true');
  document.querySelector('.cart-trigger').setAttribute('aria-expanded', 'false');
  scrim.classList.remove('is-visible');
  window.setTimeout(() => { scrim.hidden = true; }, 230);
  document.body.style.overflow = '';
}

function addItem(id) {
  const product = products.find((item) => item.id === id);
  if (!product || product.price === null) {
    showToast('El precio de este producto está por confirmar.');
    return;
  }
  cart.set(id, (cart.get(id) || 0) + 1);
  renderCart();
  showToast(`${product.name}: sumado a tu bolsa.`);
}

function changeQuantity(id, amount) {
  const next = (cart.get(id) || 0) + amount;
  if (next <= 0) cart.delete(id);
  else cart.set(id, next);
  renderCart();
}

function renderCart() {
  const itemCount = [...cart.values()].reduce((sum, quantity) => sum + quantity, 0);
  const total = [...cart.entries()].reduce((sum, [id, quantity]) => sum + products.find((product) => product.id === id).price * quantity, 0);
  document.querySelector('.cart-count').textContent = String(itemCount);
  document.querySelector('.cart-count').setAttribute('aria-label', `${itemCount} artículos en la bolsa`);

  const items = [...cart.entries()];
  document.querySelector('.cart-items').innerHTML = items.map(([id, quantity]) => {
    const product = products.find((item) => item.id === id);
    return `<article class="cart-line"><span class="cart-line-art" aria-hidden="true"><span class="cart-line-placeholder">coloca tu<br>imagen aqui</span></span><div class="cart-line-copy"><h3>${product.name}</h3><p>${money.format(product.price)} c/u</p><div class="quantity-control" aria-label="Cantidad de ${product.name}"><button type="button" data-quantity="-1" data-id="${id}" aria-label="Quitar uno">−</button><span>${quantity}</span><button type="button" data-quantity="1" data-id="${id}" aria-label="Agregar uno">+</button></div></div><span class="cart-line-price">${money.format(product.price * quantity)}</span></article>`;
  }).join('');

  const isEmpty = itemCount === 0;
  document.querySelector('.cart-empty').hidden = !isEmpty;
  document.querySelector('.cart-footer').hidden = isEmpty;
  document.querySelector('.cart-subtotal strong').textContent = money.format(total);
}

function openAccount() {
  document.querySelector('#primary-nav').classList.remove('is-open');
  document.querySelector('.mobile-menu-toggle').setAttribute('aria-expanded', 'false');
  accountDialog.showModal();
}

grid.addEventListener('click', (event) => {
  const button = event.target.closest('[data-add]');
  if (button && !button.disabled) addItem(button.dataset.add);
});

categoryBar.addEventListener('click', (event) => {
  const chip = event.target.closest('[data-category]');
  if (!chip) return;
  currentCategory = chip.dataset.category;
  document.querySelectorAll('.category-chip').forEach((item) => {
    const active = item === chip;
    item.classList.toggle('is-active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  renderProducts();
});

document.querySelector('.cart-trigger').addEventListener('click', openCart);
document.querySelector('.cart-close').addEventListener('click', closeCart);
scrim.addEventListener('click', closeCart);
document.querySelector('.cart-items').addEventListener('click', (event) => {
  const button = event.target.closest('[data-quantity]');
  if (button) changeQuantity(button.dataset.id, Number(button.dataset.quantity));
});
document.querySelector('.empty-menu-link').addEventListener('click', closeCart);
document.querySelector('.checkout-demo').addEventListener('click', () => showToast('El checkout se conecta más adelante. Esta demo no procesa pagos.'));

document.querySelectorAll('[data-open-account]').forEach((button) => button.addEventListener('click', openAccount));
document.querySelector('.login-demo-form').addEventListener('submit', (event) => {
  event.preventDefault();
  showToast('El acceso real se conectará más adelante. No se enviaron tus datos.');
  accountDialog.close();
});
accountDialog.addEventListener('click', (event) => {
  if (event.target === accountDialog) accountDialog.close();
});

document.querySelector('.mobile-menu-toggle').addEventListener('click', (event) => {
  const button = event.currentTarget;
  const nav = document.querySelector('#primary-nav');
  const isOpen = button.getAttribute('aria-expanded') === 'true';
  button.setAttribute('aria-expanded', String(!isOpen));
  button.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
  nav.classList.toggle('is-open', !isOpen);
});

document.querySelectorAll('.primary-nav a').forEach((link) => link.addEventListener('click', () => {
  document.querySelector('#primary-nav').classList.remove('is-open');
  document.querySelector('.mobile-menu-toggle').setAttribute('aria-expanded', 'false');
}));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && drawer.classList.contains('is-open')) closeCart();
});

renderCategories();
renderProducts();
renderCart();
