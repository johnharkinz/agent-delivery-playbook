# DOMAIN-LANGUAGE.md Format

## Structure

```md
# {Domain or Bounded Context Name}

{One or two sentence description of this domain area and why its language matters.}

## Language

**Order**:
{A one or two sentence description of the term}
_Avoid_: Purchase, transaction

**Invoice**:
A request for payment sent to a customer after delivery.
_Avoid_: Bill, payment request

**Customer**:
A person or organization that places orders.
_Avoid_: Client, buyer, account
```

## Rules

- **Be opinionated.** When multiple words exist for the same concept, pick the best one and list the others under `_Avoid_`.
- **Keep definitions tight.** One or two sentences max. Define what it IS, not what it does.
- **Only include terms specific to this project's domain language.** General programming concepts (timeouts, error types, utility patterns) don't belong even if the project uses them extensively. Before adding a term, ask: is this a domain concept or a general programming concept? Only domain concepts belong.
- **Group terms under subheadings** when natural clusters emerge. If all terms belong to a single cohesive area, a flat list is fine.

## Single vs multi-context repos

**Single domain language (most repos):** One `DOMAIN-LANGUAGE.md` at the repo root.

**Multiple bounded contexts:** A `DOMAIN-LANGUAGE-MAP.md` at the repo root lists the bounded contexts, where they live, and how they relate to each other:

```md
# Domain Language Map

## Bounded Contexts

- [Ordering](./src/ordering/DOMAIN-LANGUAGE.md) — receives and tracks customer orders
- [Billing](./src/billing/DOMAIN-LANGUAGE.md) — generates invoices and processes payments
- [Fulfillment](./src/fulfillment/DOMAIN-LANGUAGE.md) — manages warehouse picking and shipping

## Relationships

- **Ordering → Fulfillment**: Ordering emits `OrderPlaced` events; Fulfillment consumes them to start picking
- **Fulfillment → Billing**: Fulfillment emits `ShipmentDispatched` events; Billing consumes them to generate invoices
- **Ordering ↔ Billing**: Shared types for `CustomerId` and `Money`
```

The skill infers which structure applies:

- If `DOMAIN-LANGUAGE-MAP.md` exists, read it to find bounded contexts
- If only a root `DOMAIN-LANGUAGE.md` exists, there is one shared domain language
- If neither exists, create a root `DOMAIN-LANGUAGE.md` lazily when the first term is resolved

When multiple bounded contexts exist, infer which one the current topic relates to. If unclear, ask.
