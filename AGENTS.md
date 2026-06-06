# AGENTS

This repository is the source playbook for bootstrapping future agent-assisted projects.

Future projects should be self-contained. Templates and skills are copied into each new project; new projects should not depend on this repository at runtime.

## Bootstrap Script Sync Rule

Whenever you create, rename, move, delete, or change the intended destination of any file or folder that should be copied into new projects, revisit:

```text
scripts/init-project.js
```

In particular, check the script when changing:

- `templates/project/`
- `templates/docs/`
- `templates/github/`
- `skills/`
- any documented new-project destination path, such as `AGENTS.md`, `DOMAIN-LANGUAGE.md`, `docs/state.md`, `.github/pull_request_template.md`, or `.agents/skills/`

The script's `entries` list is the source of what gets copied into a new project. Keep it aligned with the README, PLAYBOOK, and actual template tree.

## Documentation Sync Rule

When changing the new-project structure, update all relevant documentation:

- `README.md`
- `PLAYBOOK.md`
- `templates/project/AGENTS.md`
- `templates/docs/state.md`
- any affected skill instructions

Avoid documenting a file as part of the new-project setup unless `scripts/init-project.js` copies it, or the docs clearly explain that it is optional.

## Verification

After changing templates, skills, or `scripts/init-project.js`, run:

```bash
node scripts/init-project.js /path/to/test-project --dry-run
```

For script behavior changes, also test against a temporary empty directory and verify:

- first `--dry-run` reports expected `COPY` entries
- real run copies the expected files
- second `--dry-run` reports expected `SKIP` entries
- `--dry-run --force` reports expected `OVERWRITE` entries

Use a temporary directory outside this repo for script tests.

## Editing Principles

- Keep this repo lightweight.
- Prefer project-local templates over skill-local hidden formats.
- Keep skills focused on agent behavior.
- Keep durable project document formats visible in templates.
- Do not add process that does not help future project delivery.
