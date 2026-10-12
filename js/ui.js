import { formatPeso, formatTransactionDate, itemCountLabel } from "./format.js";

function requiredElement(documentRef, selector) {
  const element = documentRef.querySelector(selector);
  if (!element) {
    throw new Error(`Required POS element not found: ${selector}`);
  }
  return element;
}

/**
 * Creates the browser presentation layer. Business calculations and transaction
 * state stay in the controller and are passed in as summaries or transactions.
 */
export function createPosUI(products, documentRef = document) {
  const elements = {
    productGrid: requiredElement(documentRef, "#product-grid"),
    productCount: requiredElement(documentRef, "#product-count"),
    emptyCart: requiredElement(documentRef, "#empty-cart"),
    cartItems: requiredElement(documentRef, "#cart-items"),
    cartCount: requiredElement(documentRef, "#cart-count"),
    cartSubtotal: requiredElement(documentRef, "#cart-subtotal"),
    cartTotal: requiredElement(documentRef, "#cart-total"),
    reviewOrderButton: requiredElement(documentRef, "#review-order-button"),
    reviewOrderHelp: requiredElement(documentRef, "#review-order-help"),
    reviewItems: requiredElement(documentRef, "#review-items"),
    reviewItemCount: requiredElement(documentRef, "#review-item-count"),
    reviewTotal: requiredElement(documentRef, "#review-total"),
    backToOrderButton: requiredElement(documentRef, "#back-to-order-button"),
    continueToPaymentButton: requiredElement(documentRef, "#continue-to-payment-button"),
    paymentForm: requiredElement(documentRef, "#payment-form"),
    paymentOrderTotal: requiredElement(documentRef, "#payment-order-total"),
    cashAmountInput: requiredElement(documentRef, "#cash-amount"),
    paymentMessage: requiredElement(documentRef, "#payment-message"),
    backToReviewButton: requiredElement(documentRef, "#back-to-review-button"),
    confirmationTotal: requiredElement(documentRef, "#confirmation-total"),
    confirmationPaid: requiredElement(documentRef, "#confirmation-paid"),
    confirmationChange: requiredElement(documentRef, "#confirmation-change"),
    transactionReference: requiredElement(documentRef, "#transaction-reference"),
    viewReceiptButton: requiredElement(documentRef, "#view-receipt-button"),
    confirmationNewTransactionButton: requiredElement(
      documentRef,
      "#confirmation-new-transaction-button",
    ),
    receiptReference: requiredElement(documentRef, "#receipt-reference"),
    receiptDate: requiredElement(documentRef, "#receipt-date"),
    receiptItems: requiredElement(documentRef, "#receipt-items"),
    receiptTotal: requiredElement(documentRef, "#receipt-total"),
    receiptPaid: requiredElement(documentRef, "#receipt-paid"),
    receiptChange: requiredElement(documentRef, "#receipt-change"),
    receiptNewTransactionButton: requiredElement(
      documentRef,
      "#receipt-new-transaction-button",
    ),
  };

  const views = Object.freeze({
    order: requiredElement(documentRef, "#order-view"),
    review: requiredElement(documentRef, "#review-view"),
    payment: requiredElement(documentRef, "#payment-view"),
    confirmation: requiredElement(documentRef, "#confirmation-view"),
    receipt: requiredElement(documentRef, "#receipt-view"),
  });
  const progressSteps = [...documentRef.querySelectorAll(".progress-steps li")];

  function createProductCard(product) {
    const button = documentRef.createElement("button");
    button.className = "product-card";
    button.type = "button";
    button.dataset.productId = product.id;
    button.setAttribute(
      "aria-label",
      `Add ${product.name} for ${formatPeso(product.priceInCentavos)} to the order`,
    );

    const icon = documentRef.createElement("span");
    icon.className = "product-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = product.icon;

    const name = documentRef.createElement("span");
    name.className = "product-name";
    name.textContent = product.name;

    const price = documentRef.createElement("span");
    price.className = "product-price";
    price.textContent = formatPeso(product.priceInCentavos);

    const action = documentRef.createElement("span");
    action.className = "product-action";
    const actionIcon = documentRef.createElement("span");
    actionIcon.setAttribute("aria-hidden", "true");
    actionIcon.textContent = "+";
    action.append(actionIcon, " Add to order");

    button.append(icon, name, price, action);
    return button;
  }

  function createActionButton(label, symbol, action, productId) {
    const button = documentRef.createElement("button");
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
    const item = documentRef.createElement("article");
    item.className = "cart-item";

    const details = documentRef.createElement("div");
    details.className = "cart-item-main";

    const name = documentRef.createElement("span");
    name.className = "cart-item-name";
    name.textContent = product.name;

    const price = documentRef.createElement("span");
    price.className = "cart-item-price";
    price.textContent = `${formatPeso(product.priceInCentavos)} each`;
    details.append(name, price);

    const subtotal = documentRef.createElement("strong");
    subtotal.className = "cart-item-subtotal";
    subtotal.textContent = formatPeso(subtotalInCentavos);

    const actions = documentRef.createElement("div");
    actions.className = "cart-item-actions";

    const quantityControls = documentRef.createElement("div");
    quantityControls.className = "quantity-controls";
    quantityControls.setAttribute("aria-label", `Quantity for ${product.name}`);

    const decreaseButton = createActionButton(
      `Decrease ${product.name} quantity`,
      "−",
      "decrease",
      product.id,
    );
    const quantityValue = documentRef.createElement("span");
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

    const removeButton = documentRef.createElement("button");
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
    const item = documentRef.createElement("div");
    item.className = `${classPrefix}-item`;

    const name = documentRef.createElement("span");
    name.className = `${classPrefix}-item-name`;
    name.textContent = line.product.name;

    const detail = documentRef.createElement("span");
    detail.className = `${classPrefix}-item-detail`;
    detail.textContent = `${line.quantity} × ${formatPeso(line.product.priceInCentavos)}`;

    const subtotal = documentRef.createElement("strong");
    subtotal.className = `${classPrefix}-item-subtotal`;
    subtotal.textContent = formatPeso(line.subtotalInCentavos);

    item.append(name, detail, subtotal);
    return item;
  }

  function renderProductCatalog() {
    elements.productGrid.replaceChildren(...products.map(createProductCard));
    elements.productCount.textContent = `${products.length} products`;
  }

  function renderCart(summary) {
    const hasItems = summary.itemCount > 0;

    elements.emptyCart.hidden = hasItems;
    elements.cartItems.hidden = !hasItems;
    elements.cartItems.replaceChildren(...summary.lines.map(createCartItem));
    elements.cartCount.textContent = itemCountLabel(summary.itemCount);
    elements.cartSubtotal.textContent = formatPeso(summary.totalInCentavos);
    elements.cartTotal.textContent = formatPeso(summary.totalInCentavos);
    elements.reviewOrderButton.disabled = !hasItems;
    elements.reviewOrderHelp.textContent = hasItems
      ? "Check the items and total before continuing."
      : "Add at least one item to review the order.";
  }

  function renderReview(summary) {
    elements.reviewItems.replaceChildren(
      ...summary.lines.map((line) => createSummaryItem(line, "review")),
    );
    elements.reviewItemCount.textContent = itemCountLabel(summary.itemCount);
    elements.reviewTotal.textContent = formatPeso(summary.totalInCentavos);
  }

  function renderPaymentTotal(totalInCentavos) {
    elements.paymentOrderTotal.textContent = formatPeso(totalInCentavos);
  }

  function renderConfirmation(transaction) {
    elements.confirmationTotal.textContent = formatPeso(transaction.totalInCentavos);
    elements.confirmationPaid.textContent = formatPeso(transaction.amountPaidInCentavos);
    elements.confirmationChange.textContent = formatPeso(transaction.changeInCentavos);
    elements.transactionReference.textContent = transaction.reference;
  }

  function renderReceipt(transaction) {
    elements.receiptReference.textContent = transaction.reference;
    elements.receiptDate.textContent = formatTransactionDate(transaction.completedAt);
    elements.receiptItems.replaceChildren(
      ...transaction.lines.map((line) => createSummaryItem(line, "receipt")),
    );
    elements.receiptTotal.textContent = formatPeso(transaction.totalInCentavos);
    elements.receiptPaid.textContent = formatPeso(transaction.amountPaidInCentavos);
    elements.receiptChange.textContent = formatPeso(transaction.changeInCentavos);
  }

  function updateProgress(viewName) {
    const activeStep =
      viewName === "receipt" ? 2 : ["payment", "confirmation"].includes(viewName) ? 1 : 0;

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

  function showView(viewName, focusTarget) {
    Object.entries(views).forEach(([name, view]) => {
      view.hidden = name !== viewName;
    });
    updateProgress(viewName);
    window.scrollTo({ top: 0, behavior: "smooth" });
    focusTarget?.focus();
  }

  function showOrderView(focusTarget = "review") {
    const target =
      focusTarget === "product"
        ? elements.productGrid.querySelector(".product-card")
        : focusTarget === "review"
          ? elements.reviewOrderButton
          : null;
    showView("order", target);
  }

  function showReviewView() {
    showView("review", elements.backToOrderButton);
  }

  function showPaymentView() {
    showView("payment", elements.cashAmountInput);
  }

  function showConfirmationView() {
    showView("confirmation", elements.viewReceiptButton);
  }

  function showReceiptView() {
    showView("receipt", elements.receiptNewTransactionButton);
  }

  function clearPaymentMessage() {
    elements.paymentMessage.textContent = "";
    elements.paymentMessage.className = "message";
    elements.cashAmountInput.removeAttribute("aria-invalid");
    elements.cashAmountInput.closest(".money-input").classList.remove("has-error");
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
    elements.paymentMessage.textContent = paymentErrorMessage(result);
    elements.paymentMessage.className = "message message-error";
    elements.cashAmountInput.setAttribute("aria-invalid", "true");
    elements.cashAmountInput.closest(".money-input").classList.add("has-error");
    elements.cashAmountInput.focus();
  }

  function resetTransactionViews() {
    elements.cashAmountInput.value = "";
    clearPaymentMessage();

    elements.reviewItems.replaceChildren();
    elements.reviewItemCount.textContent = itemCountLabel(0);
    elements.reviewTotal.textContent = formatPeso(0);
    elements.paymentOrderTotal.textContent = formatPeso(0);

    elements.confirmationTotal.textContent = formatPeso(0);
    elements.confirmationPaid.textContent = formatPeso(0);
    elements.confirmationChange.textContent = formatPeso(0);
    elements.transactionReference.textContent = "—";

    elements.receiptItems.replaceChildren();
    elements.receiptReference.textContent = "—";
    elements.receiptDate.textContent = "—";
    elements.receiptTotal.textContent = formatPeso(0);
    elements.receiptPaid.textContent = formatPeso(0);
    elements.receiptChange.textContent = formatPeso(0);
  }

  function bindHandlers(handlers) {
    elements.productGrid.addEventListener("click", (event) => {
      const productButton = event.target.closest(".product-card");
      if (productButton && elements.productGrid.contains(productButton)) {
        handlers.selectProduct(productButton.dataset.productId);
      }
    });

    elements.cartItems.addEventListener("click", (event) => {
      const actionButton = event.target.closest("[data-action]");
      if (actionButton && elements.cartItems.contains(actionButton)) {
        handlers.changeCart(actionButton.dataset.action, actionButton.dataset.productId);
      }
    });

    elements.reviewOrderButton.addEventListener("click", handlers.reviewOrder);
    elements.backToOrderButton.addEventListener("click", handlers.backToOrder);
    elements.continueToPaymentButton.addEventListener("click", handlers.continueToPayment);
    elements.backToReviewButton.addEventListener("click", handlers.backToReview);
    elements.cashAmountInput.addEventListener("input", clearPaymentMessage);
    elements.paymentForm.addEventListener("submit", (event) => {
      event.preventDefault();
      handlers.submitPayment(elements.cashAmountInput.value);
    });
    elements.viewReceiptButton.addEventListener("click", handlers.viewReceipt);
    elements.confirmationNewTransactionButton.addEventListener(
      "click",
      handlers.newTransaction,
    );
    elements.receiptNewTransactionButton.addEventListener("click", handlers.newTransaction);
  }

  return Object.freeze({
    bindHandlers,
    clearPaymentMessage,
    renderCart,
    renderConfirmation,
    renderPaymentTotal,
    renderProductCatalog,
    renderReceipt,
    renderReview,
    resetTransactionViews,
    showConfirmationView,
    showOrderView,
    showPaymentError,
    showPaymentView,
    showReceiptView,
    showReviewView,
  });
}
