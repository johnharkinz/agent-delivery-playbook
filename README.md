# Agent Delivery Playbook

Reusable workflow assets for agent-assisted software development.

This repository is a portable playbook for starting and running software projects with AI coding agents. It contains:

- `skills/`: reusable agent workflows and prompt instructions
- `templates/`: starter files to copy into new project repositories
- `examples/`: reference material from real or trial project usage
- `PLAYBOOK.md`: space for the higher-level operating playbook as it evolves

The important rule: future projects should remain self-contained. This repo is not a runtime dependency, package, framework, or shared source tree. Copy the useful templates into a project, adapt them to that project, and let the project own its own context, issues, docs, decisions, and history.

## Why This Exists

AI agents are most useful when the work is clear, bounded, and reviewable. They struggle when project context is scattered, domain language is vague, issues are too large, or decisions live only in chat history.

This playbook provides a small set of reusable assets that help turn loose ideas into deliverable software work:

```text
idea / conversation
  |
  v
grilled plan and clarified language
  |
  v
project docs and durable decisions
  |
  v
small vertical-slice issues
  |
  v
agent implementation
  |
  v
reviewable pull request
  |
  v
session summary and updated project memory
```

The playbook is intentionally lightweight. It supports judgement; it does not replace it. Use the parts that improve delivery and skip the parts that would only create ceremony.

## Repository Map

### `skills/`

Skills are reusable instructions for agents. They describe how an agent should behave in a particular mode of work.

Current skills include:

- `grill-me`: stress-test a plan through one-question-at-a-time interrogation
- `grill-with-docs`: stress-test a plan against project docs, domain language, and ADRs
- `to-issues`: turn a plan, PRD, or specification into small vertical-slice issues
- `implement-issue`: implement one GitHub issue safely and produce a PR-style result
- `tdd`: work through red-green-refactor using behavior-focused tests
- `handoff`: create an operational handoff for a fresh agent session
- `synthesize-session`: turn a session into an Obsidian-ready personal summary
- `to-prd`: draft or refine a product requirements document

Use skills directly in an agent conversation by naming the skill or copying its instructions into the agent environment you are using.

### `templates/`

Templates are files to copy into a future project repository.

They are starting points, not sacred documents. Edit them aggressively so they reflect the real project.

Key template areas:

- `templates/project/`: root-level project instructions and domain-language templates for agents
- `templates/docs/`: product, technical, state, and ADR docs
- `templates/github/`: issue and pull request templates
- `templates/obsidian/`: personal session-summary format

### `examples/`

Examples should capture proven uses of the playbook. Add examples after a real project trial, not before. The point is to preserve patterns that survived contact with actual delivery.

## How To Use This With A New Project

### 1. Start the project repo

Create the new project repository however you normally would. Then copy in the relevant templates from this playbook.

Suggested minimum starter set:

```text
AGENTS.md
DOMAIN-LANGUAGE.md
DOMAIN-LANGUAGE-MAP.md
docs/product.md
docs/technical.md
docs/state.md
docs/adr/README.md
docs/adr/0000-template.md
.github/ISSUE_TEMPLATE/agent-slice.md
.github/pull_request_template.md
```

You do not need every file on day one. For a tiny project, start with `AGENTS.md`, `DOMAIN-LANGUAGE.md`, `docs/product.md`, `docs/technical.md`, and the GitHub issue template.

### 2. Adapt `AGENTS.md`

`AGENTS.md` is the first file an agent should read in the project. Use it to define how agents should work in that specific repository.

Include things like:

- standard setup commands
- standard test and check commands
- coding conventions
- documentation expectations
- branching and PR expectations
- files or directories agents should avoid touching without approval
- project-specific safety rules

Keep `AGENTS.md` practical. It should help an agent start work safely, not document the whole project.

### 3. Fill in domain language

Use `DOMAIN-LANGUAGE.md` for domain language. This should be a glossary, not a specification.

Good `DOMAIN-LANGUAGE.md` entries answer questions like:

- What are the canonical terms in this project?
- Which terms are overloaded or should be avoided?
- What distinctions matter to the domain?
- What names would confuse a future maintainer?

Use `DOMAIN-LANGUAGE-MAP.md` only when the project has multiple meaningful bounded contexts. For example, a larger app might have separate ordering, billing, and reporting areas. The map tells agents where to find the right local domain language.

### 4. Create lightweight product and technical docs

Use `docs/product.md` to describe what the product is, who it is for, what problem it solves, what is currently in scope, and what is explicitly out of scope.

Use `docs/technical.md` to describe the system shape, stack, key modules, data flow, test strategy, deployment, constraints, and useful commands.

These docs do not need to be long. Their job is to give agents and humans enough context to avoid rediscovering the same facts in every session.

### 5. Capture durable decisions with ADRs

Create ADRs only when a decision is:

- hard to reverse
- surprising without context
- the result of a real trade-off

Do not create an ADR for every implementation detail. Most decisions belong in code, tests, issues, or short docs updates. ADRs are for decisions future contributors would reasonably ask about.

Use `docs/adr/0000-template.md` as the starting point for new ADRs.

### 6. Break work into agent-sized issues

Use the `to-issues` skill to turn a plan or PRD into small vertical slices.

A good agent issue:

- delivers one narrow, complete behavior
- is demoable or verifiable on its own
- has clear acceptance criteria
- names what is in scope and out of scope
- identifies whether it is `AFK` or `HITL`
- avoids stale implementation guesses unless they encode an important decision

Prefer many small issues over one large ambiguous issue. Agents perform better when each issue has a bounded end state.

### 7. Implement one issue at a time

Use the `implement-issue` skill when asking an agent to work from a GitHub issue.

The expected pattern is:

1. Read `AGENTS.md`.
2. Read the issue.
3. Read relevant product, technical, context, and ADR docs.
4. Implement only the issue scope.
5. Add or update behavior-focused tests where practical.
6. Run the standard project check command.
7. Return a PR-style summary with tests, docs impact, and follow-ups.

Do not ask an agent to opportunistically clean up unrelated parts of the project while implementing an issue. Capture follow-up work as new issues instead.

### 8. Use TDD for risky or logic-heavy work

Use the `tdd` skill when the work benefits from test-first implementation.

The playbook's preferred testing style is behavior-focused and interface-driven:

- write one failing test for one behavior
- implement the smallest useful change
- repeat through vertical slices
- refactor only when tests are green

Avoid writing a large batch of imagined tests before the implementation has taught you anything.

### 9. Keep state, handoffs, and memory separate

Use `handoff` for operational continuity between agent sessions. A handoff should help the next agent pick up the current work without rereading the entire conversation.

Use `synthesize-session` for personal memory, especially if you keep notes in Obsidian. Personal memory should reference project artifacts rather than duplicating them.

Project source of truth should remain in the project repository: code, docs, issues, PRs, commits, and ADRs.

## Recommended New Project Setup

Use the init script to copy the standard playbook files into a new project.

The script is written in Node.js so it works on macOS and Windows. It copies files from this playbook repo into the target project; after that, the target project is self-contained.

Requirements:

- Node.js installed
- quote paths that contain spaces

The target project directory may already exist. If it does not exist, the script asks before creating it. In `--dry-run` mode, it reports `CREATE_DIR` and does not create anything.

Run a dry run first:

```bash
node /path/to/agent-delivery-playbook/scripts/init-project.js /path/to/new-project --dry-run
```

If the dry run looks right, run it for real:

```bash
node /path/to/agent-delivery-playbook/scripts/init-project.js /path/to/new-project
```

On Windows, use the same command with Windows paths:

```powershell
node C:\path\to\agent-delivery-playbook\scripts\init-project.js C:\path\to\new-project --dry-run
node C:\path\to\agent-delivery-playbook\scripts\init-project.js C:\path\to\new-project
```

By default, the script does not overwrite existing files. Existing files are reported as `SKIP`.

Dry-run output uses these labels:

- `CREATE_DIR`: target project directory does not exist and would be created
- `COPY`: file does not exist yet and would be copied
- `SKIP`: file already exists and would be left alone
- `OVERWRITE`: file already exists and would be replaced because `--force` was passed

To overwrite existing files, pass `--force`:

```bash
node /path/to/agent-delivery-playbook/scripts/init-project.js /path/to/new-project --force
```

You can combine `--dry-run` and `--force` to see what would be overwritten:

```bash
node /path/to/agent-delivery-playbook/scripts/init-project.js /path/to/new-project --dry-run --force
```

The script copies:

```text
AGENTS.md
DOMAIN-LANGUAGE.md
DOMAIN-LANGUAGE-MAP.md
docs/product.md
docs/technical.md
docs/state.md
docs/adr/README.md
docs/adr/0000-template.md
.github/ISSUE_TEMPLATE/agent-slice.md
.github/pull_request_template.md
.agents/skills/
```

Codex discovers repo-local skills from `.agents/skills/`, so the copied skills are available to Codex inside the new project.

After running it, edit every copied file. Replace placeholders with real project information before relying on agents to use them.

## Suggested First Conversation For A New Project

Once the starter docs exist, a useful first agent conversation is:

```text
Use the grill-with-docs skill.

Read AGENTS.md, DOMAIN-LANGUAGE.md, docs/product.md, and docs/technical.md.
Interview me one question at a time until the product scope, core domain terms,
and first implementation milestone are clear. Update DOMAIN-LANGUAGE.md as terms are
resolved. Suggest ADRs only for decisions that are hard to reverse, surprising
without context, and the result of a real trade-off.
```

After that, use `to-issues` to create the first batch of vertical slices.

## Operating Principles

- Keep projects self-contained.
- Keep issues small enough for reviewable agent work.
- Prefer vertical slices over horizontal layer work.
- Capture domain language as it is clarified.
- Use ADRs sparingly.
- Let tests describe behavior through public interfaces.
- Update docs when behavior, setup, architecture, or deployment changes.
- Treat chat as temporary unless it is synthesized into durable artifacts.
- Review and prune the playbook after real project use.

## Maintaining This Playbook

This repo should evolve through trial, not theory.

Add or change a skill when a real agent workflow has repeated enough times to deserve a reusable instruction. Add or change a template when a real project needed the same file shape more than once.

When updating the playbook:

- keep new assets lightweight
- prefer concrete workflows over abstract methodology
- remove templates or skills that do not help delivery
- add examples only after real usage
- avoid making future projects depend on this repo

The goal is not to build a project-management system. The goal is to make future agent-assisted projects easier to start, easier to steer, and easier to review.
