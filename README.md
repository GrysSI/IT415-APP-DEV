# Campus Cafeteria POS

A simple desktop-friendly point-of-sale application for the individual IT 415 practical examination.

## Current progress

Stage 3 — validation and final improvements — is complete and ready for final review.

The application currently provides:

- A responsive catalog containing the six required products and exact prices.
- Product buttons that add items to an in-memory cart.
- Quantity increase, quantity decrease, and item removal controls.
- Live quantities, item subtotals, item count, and order total.
- A separate order-review screen with items, quantities, subtotals, and total.
- Cash input with blank, malformed, negative, and insufficient-payment validation.
- Exact change calculation using integer centavos.
- Payment confirmation with a unique in-memory transaction reference.
- A digital receipt containing items, quantities, subtotals, total, cash received, change, and reference.
- New Transaction controls that clear the cart, payment, confirmation, and receipt state.

The three planned development stages are now implemented. Final browser review and the student's own commit remain separate steps.

## Technology

- HTML for the application structure.
- CSS for the desktop-friendly interface.
- Plain JavaScript modules for hard-coded product data and interface rendering.
- In-memory data only; no database, login, inventory system, payment gateway, or deployment.

## Project files

```text
IT415 APP DEV/
|-- index.html
|-- css/
|   `-- styles.css
|-- js/
|   |-- app.js
|   |-- cart.js
|   |-- payment.js
|   `-- products.js
`-- README.md
```

## Run the application

1. Open this folder in Visual Studio Code.
2. Use a local development server such as Live Server.
3. Open the displayed local URL in a browser.

The application does not require package installation or a build command. A local server is recommended because the JavaScript files use browser modules.

## Final checks

Verify the following before committing this stage:

- Click each product and confirm it appears in the order summary.
- Add the same product more than once and confirm its quantity and subtotal increase.
- Use the minus button and confirm the quantity decreases; decreasing from one removes the item.
- Use Remove and confirm the selected item leaves the cart.
- Confirm item count and total update after every cart change.
- Confirm Review Order is disabled for an empty cart and enabled when the cart contains items.
- Open Review Order and confirm its items, quantities, subtotals, and total match the cart.
- Use Back to Menu and confirm the cart remains unchanged.
- Confirm Continue to Payment opens the cash-payment screen and shows the correct amount due.
- Continue to payment and submit a blank amount; confirm a clear message appears.
- Test letters or malformed decimals; confirm they are rejected.
- Test a negative amount; confirm it is rejected.
- Test an amount below the order total; confirm the shortfall is shown.
- Test an exact payment; confirm change is ₱0.00.
- Test a larger payment; confirm change equals cash received minus total.
- Confirm payment shows a transaction reference.
- Confirm the receipt matches the order, total, cash received, change, and reference.
- Confirm New Transaction clears prior cart and payment data and returns to the menu.

## Development stages

1. **Setup and interface** — application structure, product catalog, layout, and screen containers.
2. **Ordering and calculations** — cart actions, quantities, removal, subtotals, total, and order review.
3. **Validation and final improvements** — cash validation, change, confirmation, receipt, transaction reference, reset, final checks, and documentation.

The required calculation example is verified: two Fried Chicken, one Rice, and one Iced Tea total ₱165.00; a ₱200.00 cash payment produces ₱35.00 change.

