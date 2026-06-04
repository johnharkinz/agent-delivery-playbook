# Skill: To Issues

## Purpose

Turn a product or technical plan into small, vertical GitHub issues suitable for human review and agent implementation.

This is a holding version of the skill. Refine it after real use.

## Inputs

- Product or technical plan
- Existing repo context, if available
- Known constraints, risks, or decisions

## Output

A numbered list of GitHub issues.

Each issue should include:

- Title
- Type: AFK or HITL
- Context
- User value
- Scope in
- Scope out
- Acceptance criteria
- Test notes
- Docs impact
- Agent notes

## Rules

- Prefer small vertical slices.
- Avoid broad refactors unless explicitly requested.
- Each issue should be independently reviewable.
- Each issue should have clear acceptance criteria.
- Mark as AFK only when an agent can safely implement from the issue and repo context.
- Mark as HITL when the work requires product judgement, credentials, deployment, payment, privacy, external account setup, or unclear decisions.
- Do not invent scope beyond the source plan.
- If something important is unknown, state it clearly in the issue and tell the agent to ask the human.
