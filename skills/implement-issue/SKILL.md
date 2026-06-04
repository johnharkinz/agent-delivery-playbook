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

Return a PR-style summary with:

- Summary
- Tests
- Docs
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
- PR-style summary produced.
- Follow-ups called out rather than silently added.
