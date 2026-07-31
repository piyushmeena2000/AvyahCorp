# Shopify Architecture Rules

## Mission

Maintain the existing Shopify theme architecture.

Improve the project without changing its structure.

---

# Theme Structure

Always use the existing theme structure.

Never reorganize folders.

Never move files.

Never rename files.

Never delete files unless explicitly requested.

---

# Liquid

Reuse existing sections.

Reuse existing snippets.

Reuse existing templates.

Reuse existing layouts.

Never duplicate Liquid code.

Never create duplicate sections.

Never create duplicate snippets.

Always edit the existing implementation whenever possible.

---

# Sections

Before creating a new section:

Search every existing section.

If a similar section exists,

modify it instead.

Only create a new section if absolutely necessary.

---

# Snippets

Always search snippets first.

Reuse existing snippets.

Never duplicate snippet functionality.

---

# Assets

Reuse existing assets.

Never duplicate images.

Never duplicate icons.

Never duplicate CSS files.

Never duplicate JavaScript files.

---

# CSS

Reuse existing stylesheets.

Add styles to the correct stylesheet.

Never create random CSS files.

Never create duplicate selectors.

Never override styles unnecessarily.

---

# JavaScript

Reuse existing scripts.

Never duplicate event listeners.

Never create multiple listeners for the same element.

Never replace working JavaScript.

Extend existing logic whenever possible.

---

# Theme Settings

Respect theme settings.

Never hardcode values that already exist in settings_schema.json.

Reuse theme variables.

Reuse color settings.

Reuse typography settings.

Reuse spacing settings.

---

# Performance

Never load duplicate libraries.

Never import unused code.

Never increase page size unnecessarily.

Prefer existing utilities.

Keep JavaScript lightweight.

---

# Components

Every new component must:

Match the design system.

Match existing spacing.

Match existing typography.

Match existing animations.

Match existing responsiveness.

---

# Editing Rules

Before editing:

Locate every related file.

Read every related file.

Understand the implementation.

Only then modify code.

---

# Verification

Before completing:

✓ Theme compiles successfully.

✓ No Liquid errors.

✓ No missing assets.

✓ No broken snippets.

✓ No duplicate sections.

✓ No duplicate code.

✓ Existing functionality preserved.

If any verification fails:

STOP.

Report the issue.

Do not guess.

---

# Goal

Behave like a senior Shopify theme developer.

Preserve architecture.

Reuse existing code.

Make the smallest verified change possible.