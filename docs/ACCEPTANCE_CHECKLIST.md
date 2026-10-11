# Campus Cafeteria POS Acceptance Checklist

Verification date: October 12, 2026  
Scope: Individual cash-only Scenario 1  
Status legend: `[x]` verified, `[ ]` requires the student's final manual confirmation

## Application behavior

- [x] Application loads from the documented local-server steps.
- [x] Desktop interface is readable and provides large product controls.
- [x] All six required products and exact prices are visible.
- [x] Products can be added through on-screen buttons.
- [x] Quantity can be increased and decreased.
- [x] An item can be removed.
- [x] Item subtotals and the overall total update correctly.
- [x] Order review displays items, quantities, subtotals, and total.
- [x] Back to Menu preserves the cart for modification.
- [x] Blank cash is rejected with a clear message.
- [x] Non-numeric and malformed cash values are rejected.
- [x] Negative cash is rejected.
- [x] Insufficient cash is rejected and the shortfall is shown.
- [x] Exact cash produces zero change.
- [x] The worked example totals ₱165.00 and ₱200.00 produces ₱35.00 change.
- [x] Successful payment displays a unique transaction reference.
- [x] The receipt contains items, quantities, subtotals, total, Cash payment method, amount paid, change, date, and reference.
- [x] New Transaction clears the cart, payment input, confirmation values, and rendered receipt.
- [ ] Student has repeated the full workflow independently before submission.

## Scenario constraints

- [x] Products and prices are hard-coded.
- [x] Cart and transaction state remain in memory.
- [x] No database is used.
- [x] No login or user-account feature is present.
- [x] No inventory-management feature is present.
- [x] No payment gateway is present.
- [x] No QR or card payment was added.
- [x] No deployment configuration was added.

## Code quality and documentation

- [x] Product data, cart calculations, payment validation, and DOM rendering have separate modules.
- [x] Monetary calculations use integer centavos.
- [x] Cart, review, confirmation, and receipt reuse the same calculated transaction values.
- [x] README identifies files, run instructions, stages, and final checks.
- [x] Reproducible browser logic tests are included.
- [x] AI-assisted stages and verification are recorded.
- [ ] Student has added any required name, section, instructor, or submission metadata.
- [ ] Student has captured final screenshots if required by the instructor.

## Evidence used

- `tests/logic.test.html`: eight reproducible logic checks.
- `docs/TEST_RESULTS.md`: recorded automated and browser acceptance outcomes.
- Browser flow: menu → order review → validation → confirmation → receipt → reset.
- `js/products.js`: required products and centavo prices.
- `js/cart.js`: quantity and total calculations.
- `js/payment.js`: cash parsing, validation, change, and transaction references.
- `js/app.js`: screen flow, rendering, and complete reset behavior.

