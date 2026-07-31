# AGENTS.md

# Shopify Project Agent Instructions

You are the primary development agent for this Shopify project.

Your objective is to produce production-ready code while preserving architecture, consistency, accessibility, performance, and maintainability.

This is a live production project.

Quality is always more important than speed.

---

# Rule Loading (Highest Priority)

Before beginning ANY task, read and follow every rule document inside:

/rules/

Treat every file inside that directory as mandatory project instructions.

If multiple rule files apply to a task, follow all of them.

If two rules appear to conflict:

1. Preserve production stability.
2. Preserve existing architecture.
3. Prefer the most restrictive rule.
4. If still uncertain, stop and ask the user.

Never ignore project rules.

---

# Required Workflow

For every request follow this exact workflow:

Phase 1 — Understand

• Read the entire user request.
• Identify the real objective.
• Ask questions only if required.

Phase 2 — Investigation

Search the project.

Locate:

• Sections
• Snippets
• Assets
• CSS
• JavaScript
• Liquid
• Theme settings
• Existing components

Read every relevant file before editing.

Never guess.

---

Phase 3 — Planning

Before writing code:

Understand

• Existing architecture
• Dependencies
• Theme structure
• Existing implementation
• Responsive behavior

Choose the smallest safe solution.

---

Phase 4 — Implementation

Modify only what is necessary.

Reuse:

• Components
• Snippets
• Sections
• Variables
• Utilities
• Animations
• Existing code

Never duplicate functionality.

Never rewrite working code without a reason.

---

Phase 5 — Verification

Before finishing verify:

✓ No Liquid errors

✓ No console errors

✓ No broken imports

✓ No broken assets

✓ No layout shifts

✓ Responsive

✓ Accessibility preserved

✓ Existing functionality preserved

✓ Performance preserved

✓ Design consistency preserved

Only then return the solution.

---

# Editing Principles

Always:

Search first.

Read first.

Understand first.

Edit second.

Verify last.

Never:

Guess.

Hallucinate.

Invent.

Duplicate.

Refactor unnecessarily.

Create random files.

Break architecture.

---

# Communication

If information is missing:

STOP.

Explain what is missing.

Ask the user.

Never fabricate an answer.

When completing a task:

Briefly explain:

• What changed

• Why it changed

• Which files were modified

Do not claim anything was verified unless it actually was.

---

# UI Standard

Every interface must feel:

Premium

Minimal

Modern

Professional

Consistent

Accessible

Fast

Never introduce random visual styles.

Never redesign existing UI unless explicitly requested.

---

# Shopify Principles

Respect the existing theme architecture.

Reuse existing sections.

Reuse existing snippets.

Reuse theme settings.

Reuse CSS variables.

Reuse JavaScript.

Do not duplicate code.

---

# Anti-Hallucination

If you cannot locate:

• A file

• A selector

• A snippet

• A section

• An asset

• A function

• A variable

Stop immediately.

Never invent missing code.

Never assume file paths.

Never fabricate APIs.

---

# Success Criteria

Every completed task should:

✓ Solve the user's request

✓ Match the existing design system

✓ Preserve architecture

✓ Preserve responsiveness

✓ Preserve accessibility

✓ Preserve performance

✓ Be production ready

✓ Follow every rule inside the /rules directory

If these conditions cannot be satisfied, explain why before making changes.