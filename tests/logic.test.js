import { addCartItem, decreaseCartItem, removeCartItem, summarizeCart } from "../js/cart.js";
import { formatPeso } from "../js/format.js";
import { createTransactionReference, parseCashAmount, validateCashPayment } from "../js/payment.js";
import { PRODUCTS } from "../js/products.js";

const results = [];
const productsById = new Map(PRODUCTS.map((product) => [product.id, product]));

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function test(name, check) {
  try {
    check();
    results.push({ name, passed: true });
  } catch (error) {
    results.push({ name, passed: false, message: error.message });
  }
}

function buildWorkedExampleCart() {
  let cart = new Map();
  cart = addCartItem(cart, "fried-chicken");
  cart = addCartItem(cart, "fried-chicken");
  cart = addCartItem(cart, "rice");
  cart = addCartItem(cart, "iced-tea");
  return cart;
}

test("The six required products and prices are exact", () => {
  const expected = [
    ["Rice (Plain)", 1500],
    ["Fried Chicken (1 pc)", 6500],
    ["Pork Adobo", 6000],
    ["Vegetable Side Dish", 3500],
    ["Iced Tea (cup)", 2000],
    ["Bottled Water", 2000],
  ];

  assert(PRODUCTS.length === expected.length, `Expected 6 products, received ${PRODUCTS.length}`);
  expected.forEach(([name, priceInCentavos], index) => {
    assert(PRODUCTS[index].name === name, `Unexpected product at position ${index + 1}`);
    assert(
      PRODUCTS[index].priceInCentavos === priceInCentavos,
      `Unexpected price for ${name}`,
    );
  });
});

test("The worked-example order contains 4 items and totals ₱165.00", () => {
  const summary = summarizeCart(buildWorkedExampleCart(), productsById);
  assert(summary.itemCount === 4, `Expected 4 items, received ${summary.itemCount}`);
  assert(
    summary.totalInCentavos === 16500,
    `Expected 16500 centavos, received ${summary.totalInCentavos}`,
  );
});

test("Centavo values use consistent Philippine peso formatting", () => {
  assert(formatPeso(16500) === "₱165.00", `Unexpected currency format: ${formatPeso(16500)}`);
});

test("Decrease and remove operations update the total", () => {
  let cart = buildWorkedExampleCart();
  cart = decreaseCartItem(cart, "fried-chicken");
  assert(summarizeCart(cart, productsById).totalInCentavos === 10000, "Decrease failed");
  cart = removeCartItem(cart, "rice");
  assert(summarizeCart(cart, productsById).totalInCentavos === 8500, "Remove failed");
});

test("Blank, malformed, and negative cash values are rejected", () => {
  assert(parseCashAmount("").code === "blank", "Blank input was not rejected");
  assert(parseCashAmount("abc").code === "invalid", "Letters were not rejected");
  assert(parseCashAmount("200.999").code === "invalid", "Malformed decimal was not rejected");
  assert(parseCashAmount("-1").code === "negative", "Negative input was not rejected");
});

test("Insufficient cash is rejected with the correct shortfall", () => {
  const payment = validateCashPayment("100", 16500);
  assert(payment.code === "insufficient", "Insufficient cash was not rejected");
  assert(payment.shortfallInCentavos === 6500, "Expected a ₱65.00 shortfall");
});

test("Payment is rejected when the order total is invalid", () => {
  const payment = validateCashPayment("200", 0);
  assert(payment.code === "invalid-total", "An invalid order total was not rejected");
});

test("Exact cash produces zero change", () => {
  const payment = validateCashPayment("165", 16500);
  assert(payment.ok, "Exact payment was rejected");
  assert(payment.changeInCentavos === 0, "Exact payment did not produce zero change");
});

test("₱200.00 payment for ₱165.00 produces ₱35.00 change", () => {
  const payment = validateCashPayment("200.00", 16500);
  assert(payment.ok, "Valid payment was rejected");
  assert(payment.changeInCentavos === 3500, "Expected ₱35.00 change");
});

test("Sequential transaction references are unique", () => {
  const completedAt = new Date(2026, 9, 12, 14, 5, 9);
  const first = createTransactionReference(completedAt, 1);
  const second = createTransactionReference(completedAt, 2);
  assert(first === "CC-20261012-140509-001", `Unexpected reference: ${first}`);
  assert(first !== second, "Sequential references must differ");
});

const passedCount = results.filter((result) => result.passed).length;
const allPassed = passedCount === results.length;

if (typeof document === "undefined") {
  results.forEach((result) => {
    const status = result.passed ? "PASS" : `FAIL: ${result.message}`;
    console.log(`${status} — ${result.name}`);
  });
  console.log(`${passedCount}/${results.length} tests passed`);
  if (!allPassed) {
    process.exitCode = 1;
  }
} else {
  const resultList = document.querySelector("#test-results");
  const summary = document.querySelector("#test-summary");

  results.forEach((result) => {
    const item = document.createElement("li");
    item.className = `test-result${result.passed ? "" : " is-failure"}`;

    const label = document.createElement("span");
    label.textContent = result.passed ? result.name : `${result.name}: ${result.message}`;

    const status = document.createElement("strong");
    status.textContent = result.passed ? "PASS" : "FAIL";

    item.append(label, status);
    resultList.append(item);
  });

  summary.textContent = `${passedCount}/${results.length} tests passed`;
  summary.className = allPassed ? "" : "is-failure";
  document.body.dataset.testStatus = allPassed ? "passed" : "failed";
}

