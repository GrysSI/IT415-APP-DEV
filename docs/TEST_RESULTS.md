# Campus Cafeteria POS Test Results

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

