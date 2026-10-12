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

**Human evaluation/adaptation:** The Stage 4 work was later committed as `19fa48f` (`Stage 4 Done`). The student's independent review note remains pending.

## Entry 5 — Interface redesign and visual refactoring

**User prompt:** Approved a cleaner, modern, readable, desktop-friendly redesign of every visible POS container while preserving all products, calculations, cash validation, receipt data, and reset behavior.

**AI contribution:** Refined the application shell, header and status treatment, progress indicator, product cards and explicit Add actions, sticky order panel, quantity controls, totals, review screen, payment form, validation states, confirmation screen, receipt, empty state, buttons, focus states, and responsive layout. Existing DOM IDs and calculation modules were preserved.

**Verification performed:** The browser logic runner reported 8/8 passed. A browser regression flow produced four items and a ₱165.00 total for two Fried Chicken, one Rice, and one Iced Tea; rejected blank and ₱100.00 payments; accepted ₱200.00; displayed ₱35.00 change; rendered matching receipt lines; and reset to zero items and ₱0.00. No browser warnings or errors were reported.

**Code evidence:** `index.html`, `css/styles.css`, `js/app.js`, `README.md`, and `docs/TEST_RESULTS.md`. The redesign was later committed as `432aa73` (`Modification for UI`).

**Human evaluation/adaptation:** _Pending student review of the redesigned layout on the examination computer._

## Entry 6 — Codebase refactoring

**User prompt:** Refactor the completed POS to improve organization, readability, maintainability, and testability while preserving the approved interface, features, calculations, and workflow. Inspect and plan first, wait for approval, then implement and verify without changing Git history.

**AI contribution:** Extracted pure formatting functions into `js/format.js`, isolated DOM queries, rendering, navigation, focus, feedback, and visual reset behavior in `js/ui.js`, and reduced `js/app.js` to transaction state and orchestration. Organized the existing CSS with section labels, removed only confirmed-unused rules, and made the same logic suite runnable in both a browser and Node without adding dependencies.

**Verification performed:** JavaScript syntax checks passed for all source and test modules. `git diff --check` passed. The expanded logic suite reported 10/10 passed in Node, all 35 required UI selectors matched existing HTML IDs, and the local server returned HTTP 200 for the application and new modules. The post-refactor visual browser replay was not completed because the available browser controller rejected localhost navigation after the server restart; this check remains pending rather than being reported as passed.

**Code evidence:** `js/app.js`, `js/ui.js`, `js/format.js`, `css/styles.css`, `tests/logic.test.js`, `README.md`, and the evidence documents. No refactoring commit was created by the AI.

**Human evaluation/adaptation:** _Pending student review and browser replay on the examination computer._

