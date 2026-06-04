# AGENTS.md

## Project Summary

Describe what this project is and who it is for.

## Stack

- Runtime:
- Language:
- Framework:
- Test runner:
- Package manager:

## Standard Commands

```bash
npm install
npm run check
npm test
```

Adjust these per project.

## Source Of Truth

Agents should read:

1. This AGENTS.md
2. docs/product.md
3. docs/technical.md
4. docs/handover.md
5. The GitHub issue being implemented

## Implementation Rules

- Implement only the current issue.
- Do not make unrelated changes.
- Prefer simple, boring solutions.
- Avoid speculative abstractions.
- Do not add dependencies without a clear reason.
- Preserve existing behaviour unless the issue changes it.

## Testing Rules

- Add or update tests for behaviour changes.
- Prefer behaviour-focused tests over implementation-detail tests.
- Run the standard check command before finishing.

## Documentation Policy

Update docs only if behaviour, setup, deployment, or architecture changes.

## Completion Checklist

- Issue scope completed.
- Tests/checks run.
- Docs updated if needed.
- PR summary includes Summary, Tests, Docs, and Follow-ups.

## Human-In-The-Loop Rules

Stop and ask for help when work requires:

- credentials
- payment or billing changes
- production deployment
- external account setup
- destructive data changes
- unclear product decisions
- privacy/security judgement

## Security And Privacy

- Do not commit secrets.
- Do not expose personal data.
- Be cautious with logs and analytics data.
