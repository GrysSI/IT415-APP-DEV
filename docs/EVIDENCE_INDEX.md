# Campus Cafeteria POS Evidence Index

This index points each individual Scenario 1 criterion to repository evidence. It does not claim instructor approval.

| Criterion | Repository evidence | Verification evidence |
| --- | --- | --- |
| Six required products and prices | `js/products.js` | Logic test 1; product catalog browser view |
| Add products and change quantities | `js/cart.js`, `js/app.js`, `js/ui.js` | Logic tests 2 and 4; browser cart controls |
| Remove an item | `js/cart.js`, `js/app.js`, `js/ui.js` | Logic test 4; browser Remove control |
| Item subtotals and order total | `js/cart.js`, `js/ui.js` | Logic tests 2 and 4; cart and review totals |
| Order review and return to editing | `index.html`, `js/app.js`, `js/ui.js` | Browser Review Order and Back to Menu flow |
| Blank/malformed/negative cash rejection | `js/payment.js`, `js/ui.js` | Logic test 5; browser messages |
| Insufficient cash rejection | `js/payment.js`, `js/ui.js` | Logic test 6; browser shortfall message |
| Change calculation | `js/payment.js` | Logic tests 8–9; browser confirmation |
| Unique transaction reference | `js/payment.js` | Logic test 10; browser confirmation and receipt |
| Complete digital receipt | `index.html`, `js/ui.js` | Browser receipt flow |
| New Transaction reset | `js/app.js`, `js/ui.js` | Browser reset verification |
| Hard-coded products and in-memory data | `js/products.js`, `js/app.js` | Source inspection |
| No prohibited features | Entire application source | Source and file inventory inspection |
| Run and test instructions | `README.md` | Local-server and test-runner instructions |
| AI-assisted development record | `docs/AI_DEVELOPMENT_LOG.md` | Stage commits and verification notes |
| Shared currency formatting | `js/format.js` | Logic test 3 |
| Recorded final test outcomes | `docs/TEST_RESULTS.md` | Historical 8/8 browser record and refactoring 10/10 logic result |

## Actual development commits

- `5ee4af8` — `stage1`
- `63df6d2` — `Stage 2 Done`
- `0e5e7ae` — `Stage 3 Done`
- `19fa48f` — `Stage 4 Done`
- `432aa73` — `Modification for UI`

The codebase refactoring remains uncommitted until the student reviews and commits the actual changes.

