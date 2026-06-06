# Architectural Decision Records

This directory contains Architectural Decision Records (ADRs): short notes that explain durable technical or product-technical decisions.

ADRs should be created sparingly. Use them when a decision is:

- hard to reverse
- surprising without context
- the result of a real trade-off

Do not create an ADR for routine implementation details, obvious choices, or decisions that are easy to change.

## File Naming

Use sequential numbering:

```text
0001-short-decision-slug.md
0002-another-decision.md
```

Keep `0000-template.md` as the template. Do not renumber existing ADRs.

## How To Write An ADR

Start from `0000-template.md`.

Most ADRs should be short. A single clear paragraph is often enough. The value is in recording that a decision was made and why, not in filling out sections.

Include optional sections only when they add real value:

- `Status`: useful when a decision is proposed, superseded, deprecated, or revisited
- `Considered Options`: useful when rejected alternatives are likely to come up again
- `Consequences`: useful when downstream effects are not obvious from the code

