# Code Quality & QA

## Mission

Every task must be production-ready before it is considered complete.

Never stop after writing code.

Always validate the result.

---

# Definition of Done

A task is complete only if:

- The requested feature works.
- No existing functionality is broken.
- Code follows project standards.
- Responsive layouts are preserved.
- Accessibility is maintained.
- Performance is not degraded.

---

# Code Quality

Code must be:

Clean

Readable

Maintainable

Reusable

Consistent

Minimal

Production-ready

Avoid:

Duplicate code

Dead code

Unused variables

Unused imports

Commented-out code

Temporary fixes

Quick hacks

---

# File Quality

Before editing:

Understand the purpose of the file.

Respect the existing architecture.

Maintain formatting.

Maintain naming conventions.

Do not reorganize unrelated code.

---

# HTML / Liquid QA

Verify:

✓ Valid Liquid syntax

✓ Valid HTML structure

✓ Semantic elements

✓ No duplicate IDs

✓ Correct ARIA attributes

✓ Theme editor compatibility

---

# CSS QA

Verify:

✓ Existing selector reused

✓ No duplicate styles

✓ Responsive layout

✓ Consistent spacing

✓ Consistent typography

✓ Consistent colors

✓ Smooth animations

✓ No unnecessary !important

---

# JavaScript QA

Verify:

✓ No console errors

✓ No duplicate event listeners

✓ Existing functionality preserved

✓ No memory leaks

✓ No unnecessary DOM queries

✓ Minimal execution cost

---

# Shopify QA

Verify:

✓ Sections render correctly

✓ Snippets render correctly

✓ Theme settings still work

✓ Assets load correctly

✓ No Liquid runtime errors

✓ No missing schema settings

---

# UI QA

Check:

Alignment

Spacing

Typography

Buttons

Icons

Cards

Forms

Navigation

Footer

Product Grid

Header

Everything should feel visually consistent.

---

# Responsive QA

Test:

Desktop

Laptop

Tablet

Mobile

Portrait

Landscape

No broken layouts.

No overflowing content.

No clipped elements.

---

# Accessibility QA

Verify:

Keyboard navigation

Focus states

Color contrast

Touch targets

Semantic structure

Screen reader compatibility where applicable

---

# Performance QA

Verify:

No unnecessary JavaScript

No duplicate CSS

No unnecessary reflows

No layout shifts

No oversized assets

No redundant rendering

---

# Regression Check

Ensure that changes did NOT affect:

Header

Footer

Navigation

Cart

Search

Collections

Product pages

Forms

Mobile menu

Theme settings

If something unrelated changed,

investigate before completing.

---

# Final Checklist

Before returning the task:

✓ User request completed

✓ Architecture preserved

✓ Design system respected

✓ Existing functionality preserved

✓ Responsive verified

✓ Accessibility maintained

✓ Performance maintained

✓ No regressions

✓ Code is production-ready

---

# If Verification Fails

Stop.

Do not guess.

Explain the issue.

Recommend the safest fix.

---

# Goal

Every change should be indistinguishable from code written by an experienced senior Shopify engineer working on a production store.