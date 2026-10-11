# Campus Cafeteria POS

A simple desktop-friendly point-of-sale application for the individual IT 415 practical examination.

## Current progress

Stage 1 — setup and interface — is complete.

The application currently provides:

- A responsive cafeteria product catalog.
- The six required products and exact examination prices.
- An empty order-summary area with totals prepared for Stage 2.
- Prepared views for cash payment, payment confirmation, and a digital receipt.
- Clear visual notices that ordering and payment behavior are not implemented yet.

Product buttons, cart calculations, payment validation, receipts, and New Transaction behavior will be implemented in later stages. No calculation test is claimed as passing yet.

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
|   `-- products.js
`-- README.md
```

## Run the application

1. Open this folder in Visual Studio Code.
2. Use a local development server such as Live Server.
3. Open the displayed local URL in a browser.

The application does not require package installation or a build command. A local server is recommended because the JavaScript files use browser modules.

## Stage 1 checks

Verify the following before committing this stage:

- The page title and Campus Cafeteria POS heading are visible.
- Six product cards appear.
- Product names and prices match the examination prompt.
- Product controls are visibly disabled and explain that ordering begins in Stage 2.
- The order summary begins empty with a total of ₱0.00.
- The layout remains readable on a desktop or laptop browser.
- No database, login, inventory, QR, card, or deployment feature is present.

## Development stages

1. **Setup and interface** — application structure, product catalog, layout, and screen containers.
2. **Ordering and calculations** — cart actions, quantities, removal, subtotals, total, and order review.
3. **Validation and final improvements** — cash validation, change, confirmation, receipt, transaction reference, reset, final checks, and documentation.

The required calculation example will be verified in Stage 3: two Fried Chicken, one Rice, and one Iced Tea should total ₱165.00; a ₱200.00 cash payment should produce ₱35.00 change.

