# Domain Language Map

Use this file only when the project has multiple meaningful bounded contexts.

Each bounded context can have its own `DOMAIN-LANGUAGE.md`. This map tells humans and agents where those files live and how the contexts relate to each other.

For a project with one shared domain language, prefer a single root `DOMAIN-LANGUAGE.md` and delete this file.

## Bounded Contexts

- [{Context Name}](./path/to/DOMAIN-LANGUAGE.md) — {one sentence describing what this context owns}
- [{Context Name}](./path/to/DOMAIN-LANGUAGE.md) — {one sentence describing what this context owns}

## Relationships

- **{Context A} -> {Context B}**: {how these contexts interact}
- **{Context B} -> {Context C}**: {how these contexts interact}

## Rules

- Use one local `DOMAIN-LANGUAGE.md` per bounded context when terms differ by context.
- Keep system-wide terms in the root `DOMAIN-LANGUAGE.md` when they are truly shared.
- Prefer explicit context ownership over shared ambiguous terms.
- When a term means different things in different contexts, define it separately in each context.

