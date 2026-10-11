# AI Development Log

Project: Campus Cafeteria POS  
Scenario: Individual IT 415 Practical Examination — cash-only Scenario 1

This log records the actual staged prompts and generated work. The student should add their own explanation of any manual edits or rejected suggestions before submission.

## Entry 1 — Setup and interface

**User prompt:** Develop the Campus Cafeteria POS with the six specified products and prices. Use class-covered tools, hard-code product data, keep transactions in memory, exclude database/login/inventory/gateway/QR/card/deployment features, and deliver setup/interface first.

**AI contribution:** Created the HTML structure, desktop CSS, hard-coded product module, initial rendering module, prepared transaction views, run instructions, and Stage 1 checklist.

**Verification performed:** Confirmed all six names and prices, required interface containers, and absence of cart behavior intended for later stages.

**Code evidence:** `index.html`, `css/styles.css`, `js/products.js`, `js/app.js`, commit `5ee4af8` (`stage1`).

**Human evaluation/adaptation:** The student continued to Stage 2 and committed Stage 1. Add any manual visual changes or rejected suggestions here: _pending student note_.

## Entry 2 — Ordering and calculations

**User prompt:** “continue stage 2”

**AI contribution:** Added immutable in-memory cart operations, quantity controls, item removal, live subtotals and total, and a separate review screen.

**Verification performed:** Confirmed the worked order contains four items and totals ₱165.00. Also checked decrease and remove calculations, HTML IDs, DOM selector wiring, and module syntax.

**Code evidence:** `js/cart.js`, `js/app.js`, `index.html`, `css/styles.css`, commit `63df6d2` (`Stage 2 Done`).

**Human evaluation/adaptation:** The student continued to Stage 3 and committed Stage 2. Add any manual changes or observations here: _pending student note_.

## Entry 3 — Cash validation and completed transaction

**User prompt:** “Continue Stage 3”

**AI contribution:** Added strict cash parsing and validation, change calculation, unique in-memory references, payment confirmation, digital receipt, progress states, and a complete New Transaction reset.

**Verification performed:** Rejected blank, letters, malformed decimals, negative cash, and insufficient cash. Verified ₱165.00 total, ₱200.00 paid, and ₱35.00 change in both module tests and a real browser flow. Verified receipt details, reset behavior, and an empty browser console.

**Code evidence:** `js/payment.js`, `js/app.js`, `index.html`, `css/styles.css`, commit `0e5e7ae` (`Stage 3 Done`).

**Human evaluation/adaptation:** The student continued to Stage 4 and committed Stage 3. Add any manual changes or observations here: _pending student note_.

## Entry 4 — Final verification and documentation

**User prompt:** “Continue stage 4”

**AI contribution:** Added a reusable browser test runner, acceptance checklist, evidence index, and this AI development log. No application feature was added during this stage.

**Verification performed:** The browser test runner reported 8/8 passed. A separate browser acceptance pass confirmed increase, decrease, removal, Back-to-Menu preservation, exact cash, unique reference generation, reset behavior, and zero console errors. See `docs/TEST_RESULTS.md`.

**Code evidence:** `tests/logic.test.html`, `tests/logic.test.js`, `docs/ACCEPTANCE_CHECKLIST.md`, `docs/EVIDENCE_INDEX.md`, `docs/TEST_RESULTS.md`.

**Human evaluation/adaptation:** _Pending student review and Stage 4 commit._

