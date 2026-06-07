---
name: tdd
description: Test-driven development with red-green-refactor loop. Use when user wants to build features or fix bugs using TDD, mentions "red-green-refactor", or asks for test-first integration work.
---

# Test-Driven Development

## Philosophy

**Core principle**: Tests should verify behavior through public interfaces, not implementation details. Code can change entirely; tests shouldn't.

**Good tests** are integration-style: they exercise real code paths through public APIs. They describe _what_ the system does, not _how_ it does it. A good test reads like a specification - "user can checkout with valid cart" tells you exactly what capability exists. These tests survive refactors because they don't care about internal structure.

**Bad tests** are coupled to implementation. They mock internal collaborators, test private methods, or verify through external means (like querying a database directly instead of using the interface). The warning sign: your test breaks when you refactor, but behavior hasn't changed. If you rename an internal function and tests fail, those tests were testing implementation, not behavior.

See [tests.md](tests.md) for examples and [mocking.md](mocking.md) for mocking guidelines.

## Anti-Pattern: Horizontal Slices

**DO NOT write all tests first, then all implementation.** This is "horizontal slicing" - treating RED as "write all tests" and GREEN as "write all code."

This produces **crap tests**:

- Tests written in bulk test _imagined_ behavior, not _actual_ behavior
- You end up testing the _shape_ of things (data structures, function signatures) rather than user-facing behavior
- Tests become insensitive to real changes - they pass when behavior breaks, fail when behavior is fine
- You outrun your headlights, committing to test structure before understanding the implementation

**Correct approach**: Vertical slices via tracer bullets. One test -> one implementation -> repeat. Each test responds to what you learned from the previous cycle. Because you just wrote the code, you know exactly what behavior matters and how to verify it.

```
WRONG (horizontal):
  RED:   test1, test2, test3, test4, test5
  GREEN: impl1, impl2, impl3, impl4, impl5

RIGHT (vertical):
  RED->GREEN: test1->impl1
  RED->GREEN: test2->impl2
  RED->GREEN: test3->impl3
  ...
```

## Workflow

### 1. Planning

When exploring the codebase, use the project's domain glossary so that test names and interface vocabulary match the project's language, and respect ADRs in the area you're touching.

Before writing any code, make the plan explicit. Confirm with the user when the issue is unclear, when the work changes public interfaces, or when the slice is marked HITL.

- [ ] Identify interface changes needed
- [ ] Identify whether any interface, boundary, dependency, or test-seam decision may be ADR-worthy
- [ ] Identify which durable docs may need reconciliation after the slice: `docs/product.md`, `docs/technical.md`, `docs/state.md`, and `docs/adr/`
- [ ] Identify which behaviors to test and prioritize
- [ ] Identify opportunities for [deep modules](deep-modules.md) (small interface, deep implementation)
- [ ] Design interfaces for [testability](interface-design.md)
- [ ] List the behaviors to test (not implementation steps)
- [ ] Get user approval on the plan when the work is ambiguous, public-interface changing, or HITL

If needed, ask: "What should the public interface look like? Which behaviors are most important to test?"

If the plan introduces a durable interface, boundary, external dependency, storage model, deployment assumption, or testing seam that is hard to reverse, surprising without context, and the result of a real trade-off, flag it as an ADR candidate before implementation. If the decision is unresolved, treat the slice as HITL and ask the user.

**You can't test everything.** Focus testing effort on critical paths and complex logic, not every possible edge case. If priorities are unclear, ask the user which behaviors matter most.

### 2. Tracer Bullet

Write ONE test that confirms ONE thing about the system:

```
RED:   Write test for first behavior -> test fails
GREEN: Write minimal code to pass -> test passes
```

This is your tracer bullet - proves the path works end-to-end.

### 3. Incremental Loop

For each remaining behavior:

```
RED:   Write next test -> fails
GREEN: Minimal code to pass -> passes
```

Rules:

- One test at a time
- Only enough code to pass current test
- Don't anticipate future tests
- Keep tests focused on observable behavior

### 4. Refactor

After all tests pass, look for [refactor candidates](refactoring.md):

- [ ] Extract duplication
- [ ] Deepen modules (move complexity behind simple interfaces)
- [ ] Apply SOLID principles where natural
- [ ] Consider what new code reveals about existing code
- [ ] Run tests after each refactor step

During refactor, watch for architecture becoming real. If a refactor creates or changes a public interface, module boundary, dependency inversion, persistence boundary, external integration boundary, or testing strategy, perform an ADR check before finishing.

**Never refactor while RED.** Get to GREEN first.

When TDD is used to implement an issue or phase slice, do not stop at green tests. Reconcile durable docs before finishing. `docs/state.md` captures current status and next-agent notes, but `docs/product.md` and `docs/technical.md` must also reflect completed capabilities, architecture, constraints, commands, and deployment when those changed.

## Checklist Per Cycle

```
[ ] Test describes behavior, not implementation
[ ] Test uses public interface only
[ ] Test would survive internal refactor
[ ] Code is minimal for this test
[ ] No speculative features added
```

## Completion Checklist

- [ ] All tests pass
- [ ] Standard project check command run where available
- [ ] Refactor completed only while GREEN
- [ ] Docs updated if behavior, setup, deployment, or architecture changed
- [ ] Docs reconciliation completed: product, technical, state, and ADR docs either still match the completed behavior or were updated
- [ ] ADR check completed: either no decision met the ADR bar, or an ADR was added or updated
