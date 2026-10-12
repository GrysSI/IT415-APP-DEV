# Campus Cafeteria POS Test Results

## Stage 4 baseline record

Test date: October 12, 2026  
Environment: Local PHP development server and Chromium-based in-app browser  
Commit tested: `0e5e7ae` plus the uncommitted Stage 4 test and documentation files

## Automated browser logic tests

Test page: `tests/logic.test.html`  
Result: **8/8 passed**

1. Six required products and prices are exact — PASS
2. Worked-example order has four items and totals ₱165.00 — PASS
3. Decrease and remove operations update the total — PASS
4. Blank, malformed, and negative cash values are rejected — PASS
5. Insufficient cash is rejected with the correct shortfall — PASS
6. Exact cash produces zero change — PASS
7. ₱200.00 for a ₱165.00 order produces ₱35.00 change — PASS
8. Sequential transaction references are unique — PASS

## End-to-end worked-example flow

- Added two Fried Chicken, one Rice, and one Iced Tea.
- Cart item count: 4.
- Cart total: ₱165.00.
- Review total: ₱165.00.
- Blank cash message: `Enter the cash amount.`
- Malformed cash message: `Enter a valid number with no more than two decimal places.`
- Negative cash message: `Cash amount cannot be negative.`
- ₱100.00 cash message: `Cash is insufficient. Add ₱65.00 more.`
- ₱200.00 cash accepted.
- Confirmation change: ₱35.00.
- Receipt contained the three product lines, quantities, subtotals, ₱165.00 total, Cash method, ₱200.00 received, ₱35.00 change, date, and reference.
- New Transaction returned to 0 items and ₱0.00, cleared the input, hid the receipt, and removed rendered receipt items.

## Remaining acceptance cases

- Increasing Pork Adobo from one to two changed the total from ₱60.00 to ₱120.00 — PASS
- Decreasing it back to one changed the total to ₱60.00 — PASS
- Removing it returned the total to ₱0.00 and displayed the empty-cart state — PASS
- Fried Chicken plus Rice totaled ₱80.00 in review — PASS
- Back to Menu preserved the ₱80.00 cart — PASS
- Exact ₱80.00 cash produced ₱0.00 change — PASS
- New Transaction returned the total to ₱0.00 — PASS
- Browser console errors: none

## Manual student checks still required

- Repeat the complete flow independently before submission.
- Confirm the layout on the actual desktop or laptop used for the examination.
- Add required student, section, and instructor metadata.
- Capture screenshots only if required by the instructor.

## UI redesign regression verification

Verification date: October 12, 2026

Environment: Local Node static server and Chromium-based in-app browser

- Browser logic tests: **8/8 passed**.
- Redesigned menu displayed all six product cards and explicit Add to order actions.
- Worked-example cart and review: 4 items and ₱165.00 — PASS.
- Blank payment message: `Enter the cash amount.` — PASS.
- ₱100.00 payment message: `Cash is insufficient. Add ₱65.00 more.` — PASS.
- ₱200.00 payment produced ₱35.00 change — PASS.
- Receipt matched Fried Chicken ×2, Rice ×1, Iced Tea ×1, ₱165.00 total, ₱200.00 paid, and ₱35.00 change — PASS.
- New Transaction restored 0 items, ₱0.00, the empty-cart state, and hid the previous receipt — PASS.
- Browser warnings and errors: none.

## Codebase refactoring verification

Verification date: October 12, 2026

Baseline commit: `432aa73` (`Modification for UI`)

Refactoring state: uncommitted working-tree changes

### Completed checks

- JavaScript syntax checks for `app.js`, `ui.js`, `format.js`, `cart.js`, `payment.js`, `products.js`, and `logic.test.js` — PASS.
- `git diff --check` — PASS.
- Dependency-free Node logic runner: **10/10 passed**.
- Required DOM selector audit: all 35 IDs referenced by `ui.js` exist in `index.html` — PASS.
- Local server returned HTTP 200 for the application, `app.js`, `ui.js`, and `format.js` — PASS.
- `app.js` reduced from 442 lines to 125 lines while keeping transaction state and orchestration in one controller.
- Confirmed-unused CSS tokens `--page-accent`, `--radius-sm`, and selector `.message-success` were removed.

### Pending browser regression

The post-refactor browser logic page and full visual transaction replay were not completed because the available browser controller rejected localhost navigation after the local server restarted. The earlier pre-refactoring baseline was 8/8 with no console errors, but it is not being reused as proof of the refactored browser behavior.

Before submission, open `/tests/logic.test.html` and confirm `10/10 tests passed`, then repeat the worked transaction, invalid-payment checks, receipt, reset, visual comparison, and console check.

