---
name: to-prd
description: Turn the current conversation context into a local PRD file that can feed a later to-issues session. Use when user wants to create a PRD from the current context.
---

This skill takes the current conversation context and codebase understanding and produces a PRD. Do NOT interview the user - just synthesize what you already know.

Do not publish the PRD to the issue tracker. Save it as a local Markdown file, then tell the user that the file can be used as input for a later `to-issues` session.

## Process

1. Explore the repo to understand the current state of the codebase, if you haven't already. Use the project's domain glossary vocabulary throughout the PRD, and respect any ADRs in the area you're touching.

2. Sketch out the seams at which you're going to test the feature. Existing seams should be preferred to new ones. Use the highest seam possible. If new seams are needed, propose them at the highest point you can.

If the seams are uncertain, state the assumption in the PRD rather than stopping to interview the user.

3. Write the PRD using the template below and save it to a local Markdown file.

Default location:

```text
docs/prd/<short-feature-slug>.md
```

If the repo already has a PRD or planning-doc convention, use that instead. Create the directory only when saving the PRD.

4. Return the file path and suggest running `to-issues` against the saved PRD when the user is ready to create implementation issues.

<prd-template>

## Problem Statement

The problem that the user is facing, from the user's perspective.

## Solution

The solution to the problem, from the user's perspective.

## User Stories

A LONG, numbered list of user stories. Each user story should be in the format of:

1. As an <actor>, I want a <feature>, so that <benefit>

<user-story-example>
1. As a mobile bank customer, I want to see balance on my accounts, so that I can make better informed decisions about my spending
</user-story-example>

This list of user stories should be extremely extensive and cover all aspects of the feature.

## Implementation Decisions

A list of implementation decisions that were made. This can include:

- The modules that will be built/modified
- The interfaces of those modules that will be modified
- Technical clarifications from the developer
- Architectural decisions
- Schema changes
- API contracts
- Specific interactions

Do NOT include specific file paths or code snippets. They may end up being outdated very quickly.

Exception: if a prototype produced a snippet that encodes a decision more precisely than prose can (state machine, reducer, schema, type shape), inline it within the relevant decision and note briefly that it came from a prototype. Trim to the decision-rich parts - not a working demo, just the important bits.

## ADR Candidates

List any decisions that may deserve an ADR because they appear hard to reverse, surprising without context, and the result of a real trade-off.

Do not create ADRs here unless the user asked for docs to be updated. Mark them as candidates for implementation or planning follow-up.

## Testing Decisions

A list of testing decisions that were made. Include:

- A description of what makes a good test (only test external behavior, not implementation details)
- Which modules will be tested
- Prior art for the tests (i.e. similar types of tests in the codebase)

## Out of Scope

A description of the things that are out of scope for this PRD.

## Further Notes

Any further notes about the feature.

</prd-template>
