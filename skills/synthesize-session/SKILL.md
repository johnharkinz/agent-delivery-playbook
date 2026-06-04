---
name: synthesize-session
description: Turn a planning or development conversation into an Obsidian-ready session summary. Use when the user wants durable personal memory from a conversation without making it project source of truth.
---

# Skill: Synthesize Session

## Purpose

Turn a planning or development conversation into a concise, useful session summary for local Obsidian.

Obsidian is personal memory, not project source of truth. Reference project artifacts by path, issue, PR, or commit instead of duplicating them.

## Output

Produce an Obsidian-ready summary with:

- What was discussed
- What was decided
- What was considered and rejected
- Open questions
- Next actions
- Repo docs or issues to create
- Links to relevant artifacts

If an Obsidian location is known or provided, save the summary there. Otherwise, return the summary in the conversation so the user can place it.

## Rules

- Focus on decisions and next actions.
- Do not preserve rambling discussion unless it explains a decision.
- Separate facts from assumptions.
- Capture unresolved questions clearly.
- Prefer concise bullet points over long narrative.
- If repo changes are needed, name the target repo and file paths.
- If issues are needed, suggest issue titles and scopes.
- If something important is unknown, say so rather than inventing it.
