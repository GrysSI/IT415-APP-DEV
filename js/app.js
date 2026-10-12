import { PRODUCTS } from "./products.js";
import { addCartItem, decreaseCartItem, removeCartItem, summarizeCart } from "./cart.js";
import { createTransactionReference, validateCashPayment } from "./payment.js";
import { createPosUI } from "./ui.js";

const productsById = new Map(PRODUCTS.map((product) => [product.id, product]));
const ui = createPosUI(PRODUCTS);
const cartOperations = Object.freeze({
  increase: addCartItem,
  decrease: decreaseCartItem,
  remove: removeCartItem,
});

let cart = new Map();
let completedTransaction = null;
let transactionSequence = 0;

function currentCartSummary() {
  return summarizeCart(cart, productsById);
}

function refreshCart() {
  ui.renderCart(currentCartSummary());
}

function selectProduct(productId) {
  cart = addCartItem(cart, productId);
  refreshCart();
}

function changeCart(action, productId) {
  const operation = cartOperations[action];
  if (!operation) {
    return;
  }

  cart = operation(cart, productId);
  refreshCart();
}

function showOrderView() {
  ui.showOrderView();
}

function showReviewView() {
  const summary = currentCartSummary();
  if (summary.itemCount === 0) {
    showOrderView();
    return;
  }

  ui.renderReview(summary);
  ui.showReviewView();
}

function showPaymentView() {
  const summary = currentCartSummary();
  if (summary.itemCount === 0) {
    showOrderView();
    return;
  }

  ui.renderPaymentTotal(summary.totalInCentavos);
  ui.clearPaymentMessage();
  ui.showPaymentView();
}

function completePayment(rawAmount) {
  const summary = currentCartSummary();
  const payment = validateCashPayment(rawAmount, summary.totalInCentavos);

  if (!payment.ok) {
    ui.showPaymentError(payment);
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

  ui.clearPaymentMessage();
  ui.renderConfirmation(completedTransaction);
  ui.showConfirmationView();
}

function showReceiptView() {
  if (!completedTransaction) {
    return;
  }

  ui.renderReceipt(completedTransaction);
  ui.showReceiptView();
}

function startNewTransaction() {
  cart = new Map();
  completedTransaction = null;
  ui.resetTransactionViews();
  refreshCart();
  ui.showOrderView("product");
}

ui.bindHandlers({
  selectProduct,
  changeCart,
  reviewOrder: showReviewView,
  backToOrder: showOrderView,
  continueToPayment: showPaymentView,
  backToReview: showReviewView,
  submitPayment: completePayment,
  viewReceipt: showReceiptView,
  newTransaction: startNewTransaction,
});

ui.renderProductCatalog();
refreshCart();
ui.showOrderView("none");
