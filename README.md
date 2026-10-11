# Campus Cafeteria POS

A simple desktop-friendly point-of-sale application for the individual IT 415 practical examination.

## Current progress

Stage 2 — ordering and calculations — is complete and ready for review.

The application currently provides:

- A responsive catalog containing the six required products and exact prices.
- Product buttons that add items to an in-memory cart.
- Quantity increase, quantity decrease, and item removal controls.
- Live quantities, item subtotals, item count, and order total.
- A separate order-review screen with items, quantities, subtotals, and total.
- Prepared views for cash payment, payment confirmation, and a digital receipt.

Cash validation, change, confirmation, receipts, and New Transaction behavior will be implemented in Stage 3.

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
|   `-- products.js
`-- README.md
```

## Run the application

1. Open this folder in Visual Studio Code.
2. Use a local development server such as Live Server.
3. Open the displayed local URL in a browser.

The application does not require package installation or a build command. A local server is recommended because the JavaScript files use browser modules.

## Stage 2 checks

Verify the following before committing this stage:

- Click each product and confirm it appears in the order summary.
- Add the same product more than once and confirm its quantity and subtotal increase.
- Use the minus button and confirm the quantity decreases; decreasing from one removes the item.
- Use Remove and confirm the selected item leaves the cart.
- Confirm item count and total update after every cart change.
- Confirm Review Order is disabled for an empty cart and enabled when the cart contains items.
- Open Review Order and confirm its items, quantities, subtotals, and total match the cart.
- Use Back to Menu and confirm the cart remains unchanged.
- Confirm Continue to Payment remains disabled because payment belongs to Stage 3.

## Development stages

1. **Setup and interface** — application structure, product catalog, layout, and screen containers.
2. **Ordering and calculations** — cart actions, quantities, removal, subtotals, total, and order review.
3. **Validation and final improvements** — cash validation, change, confirmation, receipt, transaction reference, reset, final checks, and documentation.

The ordering calculation from the required example is verified in Stage 2: two Fried Chicken, one Rice, and one Iced Tea total ₱165.00. The ₱200.00 payment and ₱35.00 change will be verified when cash payment is implemented in Stage 3.

