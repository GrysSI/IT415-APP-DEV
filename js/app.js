import { PRODUCTS } from "./products.js";
import { addCartItem, decreaseCartItem, removeCartItem, summarizeCart } from "./cart.js";
import { createTransactionReference, validateCashPayment } from "./payment.js";

const productGrid = document.querySelector("#product-grid");
const productCount = document.querySelector("#product-count");
const orderView = document.querySelector("#order-view");
const reviewView = document.querySelector("#review-view");
const paymentView = document.querySelector("#payment-view");
const confirmationView = document.querySelector("#confirmation-view");
const receiptView = document.querySelector("#receipt-view");
const progressSteps = [...document.querySelectorAll(".progress-steps li")];

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
const continueToPaymentButton = document.querySelector("#continue-to-payment-button");

const paymentForm = document.querySelector("#payment-form");
const paymentOrderTotal = document.querySelector("#payment-order-total");
const cashAmountInput = document.querySelector("#cash-amount");
const paymentMessage = document.querySelector("#payment-message");
const backToReviewButton = document.querySelector("#back-to-review-button");

const confirmationTotal = document.querySelector("#confirmation-total");
const confirmationPaid = document.querySelector("#confirmation-paid");
const confirmationChange = document.querySelector("#confirmation-change");
const transactionReference = document.querySelector("#transaction-reference");
const viewReceiptButton = document.querySelector("#view-receipt-button");
const confirmationNewTransactionButton = document.querySelector(
  "#confirmation-new-transaction-button",
);

const receiptReference = document.querySelector("#receipt-reference");
const receiptDate = document.querySelector("#receipt-date");
const receiptItems = document.querySelector("#receipt-items");
const receiptTotal = document.querySelector("#receipt-total");
const receiptPaid = document.querySelector("#receipt-paid");
const receiptChange = document.querySelector("#receipt-change");
const receiptNewTransactionButton = document.querySelector("#receipt-new-transaction-button");

const views = Object.freeze({
  order: orderView,
  review: reviewView,
  payment: paymentView,
  confirmation: confirmationView,
  receipt: receiptView,
});
const productsById = new Map(PRODUCTS.map((product) => [product.id, product]));

let cart = new Map();
let completedTransaction = null;
let transactionSequence = 0;

/** Formats an integer centavo amount as Philippine peso currency. */
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

  const action = document.createElement("span");
  action.className = "product-action";
  action.innerHTML = '<span aria-hidden="true">+</span> Add to order';

  button.append(icon, name, price, action);
  return button;
}

function renderProductCatalog() {
  productGrid.replaceChildren(...PRODUCTS.map(createProductCard));
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

function createSummaryItem(line, classPrefix) {
  const item = document.createElement("div");
  item.className = `${classPrefix}-item`;

  const name = document.createElement("span");
  name.className = `${classPrefix}-item-name`;
  name.textContent = line.product.name;

  const detail = document.createElement("span");
  detail.className = `${classPrefix}-item-detail`;
  detail.textContent = `${line.quantity} × ${formatPeso(line.product.priceInCentavos)}`;

  const subtotal = document.createElement("strong");
  subtotal.className = `${classPrefix}-item-subtotal`;
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
  reviewItems.replaceChildren(
    ...summary.lines.map((line) => createSummaryItem(line, "review")),
  );
  reviewItemCount.textContent = itemCountLabel(summary.itemCount);
  reviewTotal.textContent = formatPeso(summary.totalInCentavos);
}

function renderConfirmation(transaction) {
  confirmationTotal.textContent = formatPeso(transaction.totalInCentavos);
  confirmationPaid.textContent = formatPeso(transaction.amountPaidInCentavos);
  confirmationChange.textContent = formatPeso(transaction.changeInCentavos);
  transactionReference.textContent = transaction.reference;
}

function renderReceipt(transaction) {
  receiptReference.textContent = transaction.reference;
  receiptDate.textContent = transaction.completedAt.toLocaleString("en-PH", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  receiptItems.replaceChildren(
    ...transaction.lines.map((line) => createSummaryItem(line, "receipt")),
  );
  receiptTotal.textContent = formatPeso(transaction.totalInCentavos);
  receiptPaid.textContent = formatPeso(transaction.amountPaidInCentavos);
  receiptChange.textContent = formatPeso(transaction.changeInCentavos);
}

function updateProgress(viewName) {
  const activeStep = viewName === "receipt" ? 2 : ["payment", "confirmation"].includes(viewName) ? 1 : 0;

  progressSteps.forEach((step, index) => {
    const isCurrent = index === activeStep;
    step.classList.toggle("is-current", isCurrent);
    if (isCurrent) {
      step.setAttribute("aria-current", "step");
    } else {
      step.removeAttribute("aria-current");
    }
  });
}

function showView(viewName) {
  Object.entries(views).forEach(([name, view]) => {
    view.hidden = name !== viewName;
  });
  updateProgress(viewName);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showOrderView() {
  showView("order");
  reviewOrderButton.focus();
}

function showReviewView() {
  const summary = summarizeCart(cart, productsById);
  if (summary.itemCount === 0) {
    showOrderView();
    return;
  }

  renderReview();
  showView("review");
  backToOrderButton.focus();
}

function clearPaymentMessage() {
  paymentMessage.textContent = "";
  paymentMessage.className = "message";
  cashAmountInput.removeAttribute("aria-invalid");
  cashAmountInput.closest(".money-input").classList.remove("has-error");
}

function showPaymentView() {
  const summary = summarizeCart(cart, productsById);
  if (summary.itemCount === 0) {
    showOrderView();
    return;
  }

  paymentOrderTotal.textContent = formatPeso(summary.totalInCentavos);
  clearPaymentMessage();
  showView("payment");
  cashAmountInput.focus();
}

function paymentErrorMessage(result) {
  if (result.code === "blank") {
    return "Enter the cash amount.";
  }
  if (result.code === "negative") {
    return "Cash amount cannot be negative.";
  }
  if (result.code === "insufficient") {
    return `Cash is insufficient. Add ${formatPeso(result.shortfallInCentavos)} more.`;
  }
  if (result.code === "invalid-total") {
    return "The order total is invalid. Return to the menu and review the order.";
  }
  return "Enter a valid number with no more than two decimal places.";
}

function showPaymentError(result) {
  paymentMessage.textContent = paymentErrorMessage(result);
  paymentMessage.className = "message message-error";
  cashAmountInput.setAttribute("aria-invalid", "true");
  cashAmountInput.closest(".money-input").classList.add("has-error");
  cashAmountInput.focus();
}

function completePayment(event) {
  event.preventDefault();

  const summary = summarizeCart(cart, productsById);
  const payment = validateCashPayment(cashAmountInput.value, summary.totalInCentavos);

  if (!payment.ok) {
    showPaymentError(payment);
    return;
  }

  transactionSequence += 1;
  const completedAt = new Date();
  completedTransaction = Object.freeze({
    reference: createTransactionReference(completedAt, transactionSequence),
    completedAt,
    lines: summary.lines,
    itemCount: summary.itemCount,
    totalInCentavos: summary.totalInCentavos,
    amountPaidInCentavos: payment.amountInCentavos,
    changeInCentavos: payment.changeInCentavos,
  });

  clearPaymentMessage();
  renderConfirmation(completedTransaction);
  showView("confirmation");
  viewReceiptButton.focus();
}

function showReceiptView() {
  if (!completedTransaction) {
    return;
  }

  renderReceipt(completedTransaction);
  showView("receipt");
  receiptNewTransactionButton.focus();
}

function startNewTransaction() {
  cart = new Map();
  completedTransaction = null;
  cashAmountInput.value = "";
  clearPaymentMessage();

  reviewItems.replaceChildren();
  reviewItemCount.textContent = "0 items";
  reviewTotal.textContent = formatPeso(0);
  paymentOrderTotal.textContent = formatPeso(0);

  confirmationTotal.textContent = formatPeso(0);
  confirmationPaid.textContent = formatPeso(0);
  confirmationChange.textContent = formatPeso(0);
  transactionReference.textContent = "—";

  receiptItems.replaceChildren();
  receiptReference.textContent = "—";
  receiptDate.textContent = "—";
  receiptTotal.textContent = formatPeso(0);
  receiptPaid.textContent = formatPeso(0);
  receiptChange.textContent = formatPeso(0);

  renderCart();
  showView("order");
  productGrid.querySelector(".product-card")?.focus();
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
continueToPaymentButton.addEventListener("click", showPaymentView);
backToReviewButton.addEventListener("click", showReviewView);
cashAmountInput.addEventListener("input", clearPaymentMessage);
paymentForm.addEventListener("submit", completePayment);
viewReceiptButton.addEventListener("click", showReceiptView);
confirmationNewTransactionButton.addEventListener("click", startNewTransaction);
receiptNewTransactionButton.addEventListener("click", startNewTransaction);

renderProductCatalog();
renderCart();
showView("order");
