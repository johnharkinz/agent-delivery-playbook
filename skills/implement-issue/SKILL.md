---
name: implement-issue
description: Implement one GitHub issue safely using Codex or another coding agent. Use when the user wants an agent to work from a specific issue and produce a reviewable PR-style result.
---

# Skill: Implement Issue

## Purpose

Implement one GitHub issue safely using Codex or another coding agent.

This is a holding version of the skill. Refine it after real use.

## Core Prompt

Work on issue #<number>.

Follow AGENTS.md.

Use the GitHub issue as the source of scope. Use docs/product.md and docs/technical.md for context where they exist.

Implement only this vertical slice. Do not make unrelated changes.

Use behaviour-focused tests where practical. Run the standard project check command before finishing.

Update docs only if behaviour, setup, deployment, or architecture changes.

Before finishing, reconcile durable docs. `docs/state.md` captures current status and next-agent notes, but it is not a substitute for product and technical truth. Check whether `docs/product.md`, `docs/technical.md`, `docs/state.md`, and `docs/adr/` still match the completed behavior, architecture, constraints, commands, deployment, and decisions; update the smallest fitting files when they do not.

Before finishing, perform an ADR check: if the work introduced a decision that is hard to reverse, surprising without context, and the result of a real trade-off, add or update an ADR under `docs/adr/` using the project template. If no decision meets the bar, say that explicitly in the final summary.

Return a PR-style summary with:

- Summary
- Tests
- Docs
- ADRs
- Follow-ups

## Rules

- Read AGENTS.md first when it exists.
- Read the issue before changing code.
- Check relevant product and technical docs when they exist.
- Stay inside the issue scope.
- Do not perform opportunistic refactors.
- Prefer tests around observable behaviour.
- If the issue is ambiguous, make the smallest safe interpretation and note the assumption.
- If an unknown blocks safe implementation, stop and ask the human.
- Do not add dependencies unless the issue explicitly requires them or there is a strong reason.
- Update docs only when the change affects behaviour, setup, deployment, or architecture.

## Completion Checklist

- Issue scope satisfied.
- Relevant tests added or updated where practical.
- Standard check command run where available.
- Docs updated only if needed.
- Docs reconciliation completed: product, technical, state, and ADR docs either still match the completed work or were updated.
- ADR check completed: either no decision met the ADR bar, or an ADR was added or updated.
- PR-style summary produced.
- Follow-ups called out rather than silently added.
