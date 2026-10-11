# Campus Cafeteria POS Evidence Index

This index points each individual Scenario 1 criterion to repository evidence. It does not claim instructor approval.

| Criterion | Repository evidence | Verification evidence |
| --- | --- | --- |
| Six required products and prices | `js/products.js` | Logic test 1; product catalog browser view |
| Add products and change quantities | `js/cart.js`, `js/app.js` | Logic tests 2–3; browser cart controls |
| Remove an item | `js/cart.js`, `js/app.js` | Logic test 3; browser Remove control |
| Item subtotals and order total | `js/cart.js` | Logic tests 2–3; cart and review totals |
| Order review and return to editing | `index.html`, `js/app.js` | Browser Review Order and Back to Menu flow |
| Blank/malformed/negative cash rejection | `js/payment.js`, `js/app.js` | Logic test 4; browser messages |
| Insufficient cash rejection | `js/payment.js`, `js/app.js` | Logic test 5; browser shortfall message |
| Change calculation | `js/payment.js` | Logic tests 6–7; browser confirmation |
| Unique transaction reference | `js/payment.js` | Logic test 8; browser confirmation and receipt |
| Complete digital receipt | `index.html`, `js/app.js` | Browser receipt flow |
| New Transaction reset | `js/app.js` | Browser reset verification |
| Hard-coded products and in-memory data | `js/products.js`, `js/app.js` | Source inspection |
| No prohibited features | Entire application source | Source and file inventory inspection |
| Run and test instructions | `README.md` | Local-server and test-runner instructions |
| AI-assisted development record | `docs/AI_DEVELOPMENT_LOG.md` | Stage commits and verification notes |
| Recorded final test outcomes | `docs/TEST_RESULTS.md` | 8/8 logic tests and browser acceptance flow |

## Actual development commits

- `5ee4af8` — `stage1`
- `63df6d2` — `Stage 2 Done`
- `0e5e7ae` — `Stage 3 Done`

The Stage 4 commit identifier should be added after the student reviews and commits these files.

