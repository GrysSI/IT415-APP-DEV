# IT415 Touchscreen POS Practical-Exam Instructions

This reference summarizes requirements extracted from the user-supplied practical-exam PDF. The PDF also contains a completed group submission. Personal names, usernames, repository links, hosted URLs, branch names, commit identifiers, pull-request numbers, test counts, screenshots, and checked boxes in that submission are evidence for that group only and must never be copied as facts for another project.

## Product requirements

The application should provide a touchscreen-oriented point-of-sale kiosk flow with:

- Large product buttons or cards suitable for tapping.
- At least six products with visible prices.
- Product selection plus quantity increase, quantity decrease, and item removal.
- Correct item subtotals and order total.
- An order summary and a way to return and modify the order.
- At least three payment methods: cash, simulated QR, and simulated card.
- Cash validation that rejects blank, invalid, negative, and insufficient amounts with clear feedback.
- Correct change calculation.
- A payment-success screen with a unique transaction reference.
- A receipt containing correct transaction details and the selected payment method.
- A New Transaction action that resets the application.
- Meaningful feedback throughout the flow.

## Requirements analysis

Document:

- The problem and target users.
- Inputs, outputs, and kiosk functions.
- Technology choices and their rationale.
- The data-storage approach, including what is static and what persists.
- Setup, dependencies, and exact run steps.

## AI-assisted development

The project evidence should include genuine examples of:

- Generation: a prompt with enough context, requirements, constraints, and expected behavior.
- Debugging: the observed error, the prompt and useful response, the applied fix, and verification.
- Refactoring: the original issue, the improvement, and proof that behavior remained correct.
- Human evaluation: what was accepted, rejected, or changed and why.
- Attribution: the member responsible for each AI-assisted entry and the related code, commit, or pull request when available.

Do not present AI output as automatically correct. Record meaningful human adaptation and verification.

## Git and GitHub workflow

- Use one shared repository unless the instructor's current instructions say otherwise.
- Clone and use the repository locally.
- Keep project files organized and tracked.
- Represent at least seven genuine development stages in history: setup, interface, core functionality, validation, bug fix, refactoring, and documentation.
- Use meaningful commit messages and identifiable authorship.
- Develop feature work on branches and push the actual branch commits.
- Open pull requests from feature branches to the integration branch.
- Record review evidence before merge, including requested changes and their resolution.
- Merge completed work and ensure the demonstrated application matches the recorded final integration commit.
- Do not create artificial commits solely to satisfy the minimum history requirement.

## Code-quality expectations

- Organize code by responsibility.
- Reuse repeated logic and separate business calculations from UI/DOM behavior.
- Validate inputs and show understandable error messages.
- Use the same calculation source for order totals, payment validation, change, success details, and receipt values.
- Verify important logic with tests where practical.

## Documentation and demonstration

Prepare:

- A README with setup, dependencies, run instructions, technology and storage choices, and group contributions.
- An AI development log covering generation, debugging, refactoring, evaluation, adaptations, responsible members, and verification.
- A member register with identities, branches, tasks, commits, pull requests, reviews, and merge status.
- An acceptance checklist backed by a runnable demonstration and repository evidence.
- A final demonstration in which each member can explain their contribution, AI decisions, code, and Git workflow.

