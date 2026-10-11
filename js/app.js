import { PRODUCTS } from "./products.js";
import { addCartItem, decreaseCartItem, removeCartItem, summarizeCart } from "./cart.js";

const productGrid = document.querySelector("#product-grid");
const productCount = document.querySelector("#product-count");
const orderView = document.querySelector("#order-view");
const reviewView = document.querySelector("#review-view");
const emptyCart = document.querySelector("#empty-cart");
const cartItems = document.querySelector("#cart-items");
const cartCount = document.querySelector("#cart-count");
const cartSubtotal = document.querySelector("#cart-subtotal");
const cartTotal = document.querySelector("#cart-total");
const reviewOrderButton = document.querySelector("#review-order-button");
const reviewOrderHelp = document.querySelector("#review-order-help");
const reviewItems = document.querySelector("#review-items");
const reviewItemCount = document.querySelector("#review-item-count");
const reviewTotal = document.querySelector("#review-total");
const backToOrderButton = document.querySelector("#back-to-order-button");

const productsById = new Map(PRODUCTS.map((product) => [product.id, product]));
let cart = new Map();

/**
 * Formats an integer centavo amount as Philippine peso currency.
 * Keeping monetary values as integers will support exact calculations in Stage 2.
 */
function formatPeso(priceInCentavos) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(priceInCentavos / 100);
}

function createProductCard(product) {
  const button = document.createElement("button");
  button.className = "product-card";
  button.type = "button";
  button.dataset.productId = product.id;
  button.setAttribute(
    "aria-label",
    `Add ${product.name} for ${formatPeso(product.priceInCentavos)} to the order`,
  );

  const icon = document.createElement("span");
  icon.className = "product-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = product.icon;

  const name = document.createElement("span");
  name.className = "product-name";
  name.textContent = product.name;

  const price = document.createElement("span");
  price.className = "product-price";
  price.textContent = formatPeso(product.priceInCentavos);

  button.append(icon, name, price);
  return button;
}

function renderProductCatalog() {
  const cards = PRODUCTS.map(createProductCard);
  productGrid.replaceChildren(...cards);
  productCount.textContent = `${PRODUCTS.length} products`;
}

function createActionButton(label, symbol, action, productId) {
  const button = document.createElement("button");
  button.className = "quantity-button";
  button.type = "button";
  button.dataset.action = action;
  button.dataset.productId = productId;
  button.setAttribute("aria-label", label);
  button.textContent = symbol;
  return button;
}

function createCartItem(line) {
  const { product, quantity, subtotalInCentavos } = line;
  const item = document.createElement("article");
  item.className = "cart-item";

  const details = document.createElement("div");
  details.className = "cart-item-main";

  const name = document.createElement("span");
  name.className = "cart-item-name";
  name.textContent = product.name;

  const price = document.createElement("span");
  price.className = "cart-item-price";
  price.textContent = `${formatPeso(product.priceInCentavos)} each`;
  details.append(name, price);

  const subtotal = document.createElement("strong");
  subtotal.className = "cart-item-subtotal";
  subtotal.textContent = formatPeso(subtotalInCentavos);

  const actions = document.createElement("div");
  actions.className = "cart-item-actions";

  const quantityControls = document.createElement("div");
  quantityControls.className = "quantity-controls";
  quantityControls.setAttribute("aria-label", `Quantity for ${product.name}`);

  const decreaseButton = createActionButton(
    `Decrease ${product.name} quantity`,
    "−",
    "decrease",
    product.id,
  );
  const quantityValue = document.createElement("span");
  quantityValue.className = "quantity-value";
  quantityValue.textContent = String(quantity);
  quantityValue.setAttribute("aria-label", `Quantity ${quantity}`);
  const increaseButton = createActionButton(
    `Increase ${product.name} quantity`,
    "+",
    "increase",
    product.id,
  );
  quantityControls.append(decreaseButton, quantityValue, increaseButton);

  const removeButton = document.createElement("button");
  removeButton.className = "remove-button";
  removeButton.type = "button";
  removeButton.dataset.action = "remove";
  removeButton.dataset.productId = product.id;
  removeButton.setAttribute("aria-label", `Remove ${product.name} from the order`);
  removeButton.textContent = "Remove";

  actions.append(quantityControls, removeButton);
  item.append(details, subtotal, actions);
  return item;
}

function createReviewItem(line) {
  const item = document.createElement("div");
  item.className = "review-item";

  const name = document.createElement("span");
  name.className = "review-item-name";
  name.textContent = line.product.name;

  const detail = document.createElement("span");
  detail.className = "review-item-detail";
  detail.textContent = `${line.quantity} × ${formatPeso(line.product.priceInCentavos)}`;

  const subtotal = document.createElement("strong");
  subtotal.className = "review-item-subtotal";
  subtotal.textContent = formatPeso(line.subtotalInCentavos);

  item.append(name, detail, subtotal);
  return item;
}

function itemCountLabel(itemCount) {
  return `${itemCount} ${itemCount === 1 ? "item" : "items"}`;
}

function renderCart() {
  const summary = summarizeCart(cart, productsById);
  const hasItems = summary.itemCount > 0;

  emptyCart.hidden = hasItems;
  cartItems.hidden = !hasItems;
  cartItems.replaceChildren(...summary.lines.map(createCartItem));
  cartCount.textContent = itemCountLabel(summary.itemCount);
  cartSubtotal.textContent = formatPeso(summary.totalInCentavos);
  cartTotal.textContent = formatPeso(summary.totalInCentavos);
  reviewOrderButton.disabled = !hasItems;
  reviewOrderHelp.textContent = hasItems
    ? "Check the items and total before continuing."
    : "Add at least one item to review the order.";
}

function renderReview() {
  const summary = summarizeCart(cart, productsById);
  reviewItems.replaceChildren(...summary.lines.map(createReviewItem));
  reviewItemCount.textContent = itemCountLabel(summary.itemCount);
  reviewTotal.textContent = formatPeso(summary.totalInCentavos);
}

function showOrderView() {
  reviewView.hidden = true;
  orderView.hidden = false;
  reviewOrderButton.focus();
}

function showReviewView() {
  const summary = summarizeCart(cart, productsById);
  if (summary.itemCount === 0) {
    return;
  }

  renderReview();
  orderView.hidden = true;
  reviewView.hidden = false;
  backToOrderButton.focus();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function handleProductClick(event) {
  const productButton = event.target.closest(".product-card");
  if (!productButton || !productGrid.contains(productButton)) {
    return;
  }

  cart = addCartItem(cart, productButton.dataset.productId);
  renderCart();
}

function handleCartAction(event) {
  const actionButton = event.target.closest("[data-action]");
  if (!actionButton || !cartItems.contains(actionButton)) {
    return;
  }

  const { action, productId } = actionButton.dataset;

  if (action === "increase") {
    cart = addCartItem(cart, productId);
  } else if (action === "decrease") {
    cart = decreaseCartItem(cart, productId);
  } else if (action === "remove") {
    cart = removeCartItem(cart, productId);
  }

  renderCart();
}

productGrid.addEventListener("click", handleProductClick);
cartItems.addEventListener("click", handleCartAction);
reviewOrderButton.addEventListener("click", showReviewView);
backToOrderButton.addEventListener("click", showOrderView);

renderProductCatalog();
renderCart();
