# CSS & Animation Rules

## Mission

Write clean, maintainable, production-ready CSS.

Never guess selectors.

Always inspect before editing.

Animations should feel premium and intentional.

---

# CSS Search Rules

Before writing CSS:

Search the project.

Locate the existing selector.

Read the current styles.

Check media queries.

Check utility classes.

Only then edit.

Never invent selectors.

---

# Existing CSS

Always reuse existing classes.

Always extend existing styles.

Never duplicate CSS.

Never write conflicting styles.

Never override styles without understanding why.

---

# CSS Variables

Always use existing variables.

Reuse:

Colors

Spacing

Typography

Border Radius

Transitions

Z-index

Never hardcode values if variables already exist.

---

# Selector Rules

Use the existing selector hierarchy.

Keep specificity low.

Avoid deep nesting.

Never create unnecessary wrappers.

Never target generated classes.

---

# !important

Avoid using !important.

Only use it when:

- Third-party CSS cannot be modified.
- A verified override is required.

Never use it as a shortcut.

---

# Layout

Preserve:

Grid

Flexbox

Spacing

Alignment

Responsive behavior

Never change layout unless requested.

---

# Responsive Design

Every change must work on:

Desktop

Laptop

Tablet

Mobile

Landscape

Portrait

Never break responsiveness.

---

# Images

Never distort images.

Never stretch images.

Maintain aspect ratio.

Optimize image rendering.

---

# Icons

Reuse the existing icon library.

Never mix icon sets.

Keep:

Size

Stroke

Weight

Alignment

Consistent across the project.

---

# Typography

Reuse existing typography.

Never create random font sizes.

Maintain the existing hierarchy.

---

# Animations

Animations should be:

Smooth

Minimal

Premium

Natural

Responsive

Never flashy.

Never distracting.

Never slow.

---

# Animation Rules

Prefer:

transform

opacity

filter (sparingly)

Avoid animating:

width

height

left

top

margin

padding

These trigger layout recalculations.

---

# Performance

Use GPU-friendly properties.

Prefer:

transform

translate3d()

scale()

rotate()

opacity

Avoid expensive repaints.

---

# Transitions

Reuse existing transition durations.

Keep timing consistent.

Avoid inconsistent easing curves.

---

# Scroll Animations

Preserve scroll performance.

Never block scrolling.

Never create layout shifts.

Animations should feel connected to user interaction.

---

# Header Behavior

If editing the header:

Maintain sticky behavior.

Maintain navigation.

Maintain accessibility.

Preserve mobile menu.

Never break cart functionality.

---

# Product Cards

Never change product proportions.

Preserve image ratios.

Preserve spacing.

Preserve hover behavior.

Maintain alignment across rows.

---

# Hover Effects

Hover effects should:

Feel subtle.

Be fast.

Not move layouts.

Never surprise the user.

---

# Verification

Before returning code verify:

✓ CSS selector exists

✓ No duplicate CSS

✓ Responsive layout

✓ No layout shift

✓ Animation is smooth

✓ Hover works

✓ Mobile works

✓ No visual regression

✓ No console errors

If verification fails:

STOP.

Report the issue.

Do not guess.

---

# Goal

Behave like a senior frontend engineer.

Small, verified changes are always better than large speculative ones.