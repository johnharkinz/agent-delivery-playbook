# AGENTS

This file is the first thing an AI coding agent should read before working in this repository.

It explains how to work in this project, what the project documentation is for, and when durable project memory should be updated.

## Working Model

This project follows an agent delivery workflow:

```text
idea / conversation
  |
  v
clarify the plan
  |
  v
capture language and decisions
  |
  v
split work into small vertical-slice issues
  |
  v
implement one issue at a time
  |
  v
review the pull request
  |
  v
update project docs and state notes
```

Agents should keep work clear, bounded, and reviewable. The issue, task, or explicit user request is the scope boundary.

## Before Starting Work

Before changing code:

1. Read this file.
2. Read the issue or user request carefully.
3. Read the relevant project docs listed below.
4. Inspect the current code before making assumptions.
5. Identify the smallest safe scope of work.
6. Ask for clarification only when an unknown blocks safe implementation.

Do not make unrelated changes while completing a scoped task. Capture follow-up work separately.

## Project Documentation

Project truth should live in the project repository, not in chat history.

Use these files as durable context:

- `DOMAIN-LANGUAGE.md`: domain glossary and canonical language
- `DOMAIN-LANGUAGE-MAP.md`: map of multiple bounded contexts, if this project has them
- `docs/product.md`: product intent, users, scope, roadmap, and open product questions
- `docs/technical.md`: architecture, stack, modules, data flow, test strategy, deployment, constraints, and useful commands
- `docs/state.md`: current project status, recent work, gotchas, open questions, and where the next agent should start
- `docs/adr/`: architectural decision records, when durable trade-off decisions need explanation; use `docs/adr/0000-template.md` for new ADRs
- GitHub issues: scoped units of implementation work
- Pull requests: reviewable records of completed work

If a file does not exist, do not create it unless the current work needs it.

## When To Update Docs

Update documentation when the work changes durable project truth.

Use the smallest fitting artifact:

- Domain term clarified or renamed: update `DOMAIN-LANGUAGE.md`.
- Product behavior, scope, target user, or roadmap changed: update `docs/product.md`.
- Architecture, setup, dependency, data flow, testing, deployment, or constraint changed: update `docs/technical.md`.
- Current project state, next steps, gotchas, or open questions changed: update `docs/state.md`.
- A decision is hard to reverse, surprising without context, and the result of a real trade-off: add or update an ADR using `docs/adr/0000-template.md`.
- New implementation work is discovered: propose or create a new issue rather than expanding the current scope silently.

Do not update docs just to narrate every code change. Documentation should stay useful and durable.

## Issue And Scope Rules

Prefer small vertical slices over horizontal layer work.

A good implementation issue should:

- deliver one narrow, complete behavior
- be independently reviewable
- include clear acceptance criteria
- define what is in scope and out of scope
- include test notes where useful
- identify blockers where they exist

When implementing an issue:

- stay inside the issue scope
- avoid opportunistic refactors
- avoid unrelated dependency changes
- note assumptions in the final summary
- report follow-ups instead of silently adding them

## Testing Rules

Prefer behavior-focused tests through public interfaces.

Good tests:

- describe observable behavior
- exercise real code paths
- survive internal refactors
- focus on important user, system, or maintainer outcomes

Avoid tests that mainly verify private implementation details.

Use mocks at system boundaries or when the real dependency is slow, expensive, flaky, or external. Do not mock internal collaborators just to make implementation easier.

For risky or logic-heavy work, use a red-green-refactor loop:

```text
RED: write one failing behavior test
GREEN: write the smallest useful implementation
REPEAT: add the next behavior
REFACTOR: clean up only when tests are green
```

## Coding Standards

Project-specific standards go here.

Default expectations:

- Prefer simple, readable code over clever abstractions.
- Follow existing patterns before introducing new ones.
- Keep changes scoped to the task.
- Add abstractions only when they remove real duplication or clarify meaningful complexity.
- Do not add new dependencies without a clear reason.
- Preserve public interfaces unless the task requires changing them.
- Use clear names that match the project's domain language.

## Favoured Technologies

Record project-specific technology preferences here.

Examples:

- Language:
- Frontend:
- Backend:
- Database:
- Testing:
- Styling:
- Build tooling:
- Deployment:

When a task conflicts with these preferences, call it out before proceeding.

## Commands

Fill these in for the project.

```bash
# Install dependencies

# Run tests

# Run type checks / lint checks

# Run all standard checks

# Start the app locally
```

Always run the relevant standard check command before finishing when the project provides one. If you cannot run it, explain why in the final summary.

## Pull Request Summary

When finishing implementation work, return a concise PR-style summary:

```text
Summary:
- ...

Tests:
- ...

Docs:
- ...

Assumptions:
- ...

Follow-ups:
- ...
```

Say explicitly when no tests were run or no docs were changed.
