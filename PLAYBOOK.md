# Agent Delivery Playbook

This is the operating guide for using AI agents to help deliver software projects.

The playbook is a v0 field manual. It captures the current working model implied by this repository's skills and templates. Treat it as useful, not final. Revise it after real project use.

## Core Idea

Agents work best when the work is clear, bounded, and reviewable.

This playbook helps move from loose thinking to shippable slices:

```text
idea / conversation
  |
  v
grill the plan
  |
  v
capture language and decisions
  |
  v
split into vertical-slice issues
  |
  v
implement one issue
  |
  v
review the PR
  |
  v
update docs, state, handoff, and memory
```

The point is not to automate judgement. The point is to make judgement easier to apply.

## Project Truth

Every project should own its own source of truth.

Use this repository as a kit. Copy templates into the project repo and adapt them. Do not make future projects depend on this repo at runtime.

Project truth should live in:

- code
- tests
- issues
- pull requests
- commits
- `AGENTS.md`
- `DOMAIN-LANGUAGE.md`
- `docs/product.md`
- `docs/technical.md`
- ADRs where needed

Chat history is temporary unless it is converted into one of those artifacts.

## The Standard Project Setup

For a new project, start with the smallest useful documentation set.

Recommended files:

```text
AGENTS.md
DOMAIN-LANGUAGE.md
docs/product.md
docs/technical.md
docs/state.md
docs/adr/README.md
docs/adr/0000-template.md
.github/ISSUE_TEMPLATE/agent-slice.md
.github/pull_request_template.md
```

Add `DOMAIN-LANGUAGE-MAP.md` when the project has multiple bounded contexts.

Add ADRs only when the decision deserves durable explanation.

## File Roles

### `AGENTS.md`

The first file an agent should read.

Use it for project-specific working rules:

- how to install dependencies
- how to run tests and checks
- how to start the app
- what conventions matter
- what docs to read
- what not to touch without approval
- how to summarize work

Keep it operational. It should help an agent start safely.

### `DOMAIN-LANGUAGE.md`

The project glossary.

Use it to capture shared domain language:

- canonical terms
- terms to avoid
- distinctions that matter
- naming questions still open

Do not turn `DOMAIN-LANGUAGE.md` into a specification. It should explain language, not implementation.

### `DOMAIN-LANGUAGE-MAP.md`

Use this only for projects with multiple bounded contexts.

For example, a product might have separate billing, ordering, and reporting areas. Each can have its own local `DOMAIN-LANGUAGE.md`; the map tells agents where to find the right domain language.

### `docs/product.md`

Use this for product intent:

- what the product is
- who it serves
- what problem it solves
- current capabilities
- out-of-scope areas
- near-term roadmap
- open product questions

### `docs/technical.md`

Use this for technical orientation:

- architecture summary
- stack
- key modules
- data flow
- test strategy
- deployment
- constraints
- useful commands

### `docs/state.md`

Use this as durable project state.

It should help a human or agent understand the current state of the project without reading every issue and PR.

### ADRs

Use ADRs sparingly.

Create an ADR only when a decision is:

- hard to reverse
- surprising without context
- the result of a real trade-off

If the decision is obvious, local, or easy to change, prefer code, tests, issue notes, or a short docs update.

Use `docs/adr/0000-template.md` as the starting point for new ADRs. Keep the template in place and create numbered ADRs such as `0001-postgres-for-primary-data.md`.

## Skill Roles

### `grill-me`

Use when a plan needs sharper thinking.

The agent asks one question at a time, recommends an answer, and keeps going until the decision tree is clearer.

Good for:

- early product ideas
- architectural sketches
- fuzzy implementation plans
- "I think this is right, challenge me" moments

### `grill-with-docs`

Use when a plan needs to be tested against an existing project.

The agent reads project docs, checks terminology, compares claims with code where possible, and updates `DOMAIN-LANGUAGE.md` as language gets resolved.

Good for:

- domain-heavy work
- projects with established terminology
- decisions that may need ADRs
- plans that might conflict with existing code or docs

### `to-prd`

Use when a product idea needs to become a clearer product requirements document.

Good for:

- turning a conversation into product scope
- separating user value from implementation detail
- identifying open questions before issue slicing

### `to-issues`

Use when a plan, PRD, or specification needs to become implementation tickets.

The goal is vertical-slice issues, not horizontal layer tickets.

A good slice:

- delivers one narrow behavior end to end
- is independently reviewable
- has clear acceptance criteria
- names what is in and out of scope
- identifies blockers
- is marked `AFK` or `HITL`

### `implement-issue`

Use when asking an agent to implement one issue.

The agent should:

1. Read `AGENTS.md`.
2. Read the issue.
3. Read relevant docs and ADRs.
4. Stay inside the issue scope.
5. Add or update tests where practical.
6. Run the standard project check command.
7. Return a PR-style summary.

### `tdd`

Use for risky, logic-heavy, or interface-sensitive work.

The preferred loop:

```text
RED: write one failing behavior test
GREEN: write the smallest useful implementation
REPEAT: add the next behavior
REFACTOR: clean up only when tests are green
```

Tests should describe behavior through public interfaces. Avoid tests that lock onto private implementation details.

### `handoff`

Use when a fresh agent session needs to continue current work.

This is operational continuity, not permanent project memory. Save handoffs outside the repo unless the project specifically wants a durable state update.

### `synthesize-session`

Use when a conversation should become durable personal memory, especially for Obsidian.

Do not duplicate project source of truth. Link to files, issues, PRs, and commits instead.

## Delivery Workflow

### 1. Clarify the work

Start with the smallest conversation that can make the work clear.

Use `grill-me` for raw plans. Use `grill-with-docs` when the project already has code or docs.

The goal is to clarify:

- user value
- domain language
- scope
- constraints
- unknowns
- likely first milestone
- decisions that may need ADRs

Do not rush to implementation while the nouns are still unstable.

### 2. Capture durable context

When terms are clarified, update `DOMAIN-LANGUAGE.md`.

When product scope is clarified, update `docs/product.md`.

When architecture, setup, testing, deployment, or system shape changes, update `docs/technical.md`.

When a meaningful trade-off is resolved, consider an ADR.

### 3. Slice the work

Use `to-issues` to convert the plan into thin vertical slices.

Avoid tickets like:

- "Build the database layer"
- "Create all UI components"
- "Implement backend"
- "Add tests"

Prefer tickets like:

- "User can create the first project from the dashboard"
- "User can invite one teammate by email"
- "System rejects expired invite links"
- "Maintainer can see failed import details"

Each issue should produce something observable.

### 4. Classify slices

Mark each slice as one of:

- `AFK`: an agent can implement it without human interaction
- `HITL`: human input is expected before or during implementation

Prefer `AFK` when the issue is clear. Use `HITL` when the work needs product judgement, design judgement, architectural approval, or external information.

### 5. Implement one issue

Ask the agent to implement exactly one issue.

Good prompt shape:

```text
Use the implement-issue skill.

Work on issue #123.
Follow AGENTS.md.
Stay within the issue scope.
Use TDD if the behavior is logic-heavy or risky.
Run the standard check command before finishing.
Return a PR-style summary.
```

The issue is the scope boundary. If the agent discovers adjacent work, it should report follow-ups rather than silently expanding the change.

### 6. Review the result

Review for:

- whether the issue scope was satisfied
- whether unrelated changes slipped in
- whether tests cover important behavior
- whether docs need updates
- whether assumptions were stated
- whether follow-up issues are needed

Agent work should be easy to review because each slice is small.

### 7. Preserve useful memory

At the end of a meaningful session:

- update project docs if project truth changed
- update `docs/state.md` if project state changed
- use `handoff` if another agent needs to continue immediately
- use `synthesize-session` if the conversation should become personal memory

Keep the distinction clear: project truth belongs in the project; personal reflections can live elsewhere.

## Issue Design Rules

A good agent issue has:

- a clear behavior
- a bounded scope
- acceptance criteria
- test notes
- docs impact
- blockers if any
- enough context to start
- no unnecessary implementation prescription

Avoid file-path-heavy issues unless the path is genuinely part of the decision. File paths go stale quickly.

If a prototype produced an important state shape, reducer, schema, or algorithm, include the decision-rich part in the issue. Do not paste a whole prototype.

## Testing Rules

Prefer tests that verify observable behavior through public interfaces.

Good tests:

- read like specifications
- survive internal refactors
- exercise real code paths
- focus on important behavior

Weak tests:

- assert private function calls
- mirror implementation structure
- mock internal collaborators unnecessarily
- pass while user-visible behavior is broken

Use mocks at system boundaries or when the real dependency is slow, expensive, flaky, or external. Do not mock just to avoid designing a testable interface.

## Documentation Rules

Update docs when:

- behavior changes
- setup changes
- deployment changes
- architecture changes
- terminology changes
- a decision would confuse a future reader without context

Do not update docs just to narrate every code change.

Use the smallest durable artifact that fits:

- term clarified: `DOMAIN-LANGUAGE.md`
- product scope changed: `docs/product.md`
- system shape changed: `docs/technical.md`
- project status changed: `docs/state.md`
- trade-off resolved: ADR
- implementation work identified: issue
- personal memory needed: Obsidian summary

## Agent Prompt Patterns

### Planning prompt

```text
Use the grill-with-docs skill.

Read AGENTS.md, DOMAIN-LANGUAGE.md, docs/product.md, and docs/technical.md.
Interview me one question at a time until the scope and domain language are clear.
Update DOMAIN-LANGUAGE.md as terms are resolved.
Suggest ADRs only for durable trade-off decisions.
```

### Issue creation prompt

```text
Use the to-issues skill.

Break this plan into thin vertical-slice issues.
Classify each issue as AFK or HITL.
Show me the proposed breakdown before publishing anything.
```

### Implementation prompt

```text
Use the implement-issue skill.

Work on issue #123.
Follow AGENTS.md.
Stay inside the issue scope.
Run the standard project check command.
Summarize the result in PR format.
```

### TDD prompt

```text
Use the tdd skill.

Implement this behavior one test at a time.
Tests should verify behavior through public interfaces.
Do not refactor while tests are red.
```

### Session wrap-up prompt

```text
Use the synthesize-session skill.

Summarize what was decided, what changed, what remains open,
and which project artifacts should be updated.
```

## Anti-Patterns

Avoid these:

- letting chat history become the only source of truth
- giving an agent a large vague milestone
- creating horizontal layer issues
- asking an agent to "clean things up" during scoped implementation
- writing ADRs for routine implementation details
- writing tests that mostly verify private implementation
- copying templates without adapting them
- adding process because it sounds mature rather than because it helps delivery

## Review After First Trial

After using this playbook on a real project, review it.

Questions to ask:

- Which skills were actually useful?
- Which templates were edited heavily or ignored?
- Which docs helped agents avoid mistakes?
- Which docs became ceremony?
- Were issues small enough?
- Did `AFK` and `HITL` labels predict reality?
- Did agents update the right durable artifacts?
- Did reviewers have enough context?
- What should be removed?

Prune aggressively. A smaller playbook that gets used is better than a complete playbook that gets ignored.

## Current Principle

Start small.

Use this playbook to support practical delivery, not to create a parallel management system. The best version of this repo is the one that makes future projects easier to start, steer, review, and remember.
