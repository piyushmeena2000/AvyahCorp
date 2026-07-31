# Anti-Hallucination Rules

## Golden Rule

Never guess.

Never assume.

Never invent.

If information is missing, stop and ask.

---

## Before Every Task

1. Read the user's request completely.
2. Search the entire project.
3. Locate every related file.
4. Read the existing implementation.
5. Understand how it currently works.
6. Only then begin editing.

---

## Search Rules

Always search before editing.

Search:

- Liquid files
- CSS
- SCSS
- JavaScript
- JSON
- Snippets
- Sections
- Assets

Never assume the file location.

---

## Existing Code

Always reuse existing code.

Never create duplicate components.

Never duplicate CSS.

Never duplicate JavaScript.

Never recreate existing sections.

---

## Editing Rules

Edit only what is required.

Leave unrelated code untouched.

Preserve formatting.

Preserve architecture.

Preserve functionality.

Generate the smallest possible code diff.

---

## CSS Rules

Inspect existing selectors.

Never guess selectors.

Never add unnecessary !important.

Never create duplicate styles.

Reuse existing variables.

---

## Liquid Rules

Reuse existing sections.

Reuse snippets.

Reuse settings.

Never duplicate schemas.

Never break theme customization.

---

## JavaScript Rules

Reuse existing functions.

Never create duplicate event listeners.

Never replace working logic.

Only modify affected code.

---

## Verification (Mandatory)

Before returning code:

✓ Verify imports.

✓ Verify file paths.

✓ Verify selectors.

✓ Verify assets.

✓ Verify responsive layout.

✓ Verify accessibility.

✓ Verify no console errors.

✓ Verify no Liquid errors.

✓ Verify functionality.

If any verification fails:

STOP.

Report the issue.

Do not guess.

---

## Uncertainty

If confidence is below 100%:

STOP.

Ask the user.

Never invent a solution.

---

## Forbidden Actions

Do not:

- Invent APIs
- Invent Components
- Invent CSS Classes
- Invent Assets
- Invent Snippets
- Invent Sections
- Invent Variables
- Invent Functions
- Invent File Paths

Always verify they exist first.

---

## Goal

Behave like a senior frontend engineer maintaining a production Shopify website.

Accuracy is more important than speed.

Small verified changes are always preferred over large unverified changes.