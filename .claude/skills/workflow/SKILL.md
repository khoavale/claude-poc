---
name: workflow
description: Run the full design-to-release SDLC workflow. Scans docs/design/ for assets, has BA produce specs from them, then drives UX → SA → Dev → QA → release. Usage: /workflow or /workflow <feature-name>
---

# /workflow

Runs the full SDLC workflow starting from design assets.

**Usage:**
- `/workflow` — run for all design assets in `docs/design/`
- `/workflow <feature-name>` — run for a specific feature (must have a matching design asset or existing spec)

---

You are the workflow orchestrator. Execute each phase in order using the Agent tool.
Refer to each agent's definition in `agents/<role>/agent.md` when spawning it.
Do not pause between phases — complete each phase and immediately start the next one.
Only stop if a phase produces a hard error that makes the next phase impossible (e.g. a design asset cannot be read).

---

## Step 0 — Determine scope

### If `$ARGUMENTS` is provided
- Set `FEATURE_LIST = [$ARGUMENTS]`
- Check if `docs/specs/$ARGUMENTS.md` already exists:
  - If YES → skip Phase 1 (BA spec production) and go straight to Phase 2
  - If NO → run all phases including Phase 1

### If `$ARGUMENTS` is empty (full project run)
1. Scan `docs/design/` for all image and file assets
2. For each design asset, check if a corresponding spec already exists in `docs/specs/`:
   - Already has spec + tickets → add to `READY_LIST` (skip Phases 1–3)
   - Has spec but no tickets → add to `NEEDS_TICKETS_LIST` (skip Phase 1–2, run from Phase 3)
   - No spec yet → add to `NEEDS_SPEC_LIST` (run all phases)
3. Also scan `docs/specs/` for any specs that have no matching design asset (manually written specs)
4. Read `docs/pm/status.md` if it exists — exclude features already marked shipped
5. Read `docs/pm/risks.md` if it exists — note open High risks

Print a plan summary:

```
Design assets found:    <list>
Features with specs:    <list>
Features needing spec:  <list>
Skipping (shipped):     <list>
```

Build `FEATURE_LIST` from all non-shipped features and proceed immediately.

**All phases below run once per feature in `FEATURE_LIST`.**

---

## Phase 0 — PM: Pre-flight check

Spawn a **PM agent** (`claude-haiku-4-5-20251001`) for each feature.

Instructions:
- Check that `docs/design/` contains at least one asset for this feature (or that a spec exists)
- Check `docs/pm/risks.md` — flag any open High risks
- Check `docs/pm/status.md` — confirm not already shipped
- Report: READY / BLOCKED / SKIP with reason

Print results:

| Feature | Design asset | Status | Blocker |
|---------|-------------|--------|---------|
| ...     | ...         | READY  | —       |

Drop BLOCKED/SKIP features from `FEATURE_LIST` and proceed immediately with READY ones.

---

## Phase 1 — BA: Produce requirements & spec from design

> Skip this phase if `docs/specs/<feature>.md` already exists and is current.

For each feature in `FEATURE_LIST`, spawn a **BA agent** (`claude-sonnet-4-6`).

Instructions:
- Follow the full BA workflow defined in `agents/ba/agent.md`
- Read every design asset in `docs/design/` that belongs to this feature
- Infer the feature name and scope from the design content
- Produce `docs/requirements/<feature>.md` (Step 3 of BA workflow)
- Produce `docs/specs/<feature>.md` with user stories and acceptance criteria (Step 4)
- List any design ambiguities found (Step 5)
- Output:
  - Path to requirements doc
  - Path to spec
  - List of ambiguities (may be empty)

After all BA agents complete:
- Print the list of produced specs and any ambiguities found
- Log ambiguities as open items in `docs/pm/risks.md` under a new "Design Ambiguities" section
- Proceed immediately to Phase 2 — ambiguities are logged, not blocking

---

## Phase 2 — UX: UI specification

> Skip if `docs/ux/<feature>.md` already exists and design has not changed.

For each feature in `FEATURE_LIST`, spawn a **UX agent** (`claude-sonnet-4-6`).

Instructions:
- Read `docs/specs/<feature>.md`
- Read every design asset referenced in the spec's Design Reference section
- Produce `docs/ux/<feature>.md` using the UX spec template from `agents/ux/agent.md`
- Ensure all colours reference tokens in `docs/ux/tokens.md`; update tokens if new values appear
- Run the UX Handoff Checklist before finishing
- Output: path to UX spec, list of remaining design ambiguities

Log any remaining ambiguities in `docs/pm/risks.md` and proceed immediately to Phase 3.

---

## Phase 3 — SA: Architecture review + ticket breakdown

> Skip ticket creation if `docs/tickets/<feature>/` already contains up-to-date tickets.

For each feature in `FEATURE_LIST`, spawn a **SA agent** (`claude-sonnet-4-6`).

Instructions:
- Read `docs/specs/<feature>.md` and `docs/ux/<feature>.md`
- If tickets exist, verify they are still aligned with the current spec; update stale ones
- Otherwise: decompose the spec into ordered tickets → `docs/tickets/<feature>/<ticket-id>.md`
- Document architectural decisions → `docs/architecture/decisions/`
- Output: ordered ticket list with IDs, titles, and dependencies

After all SA agents complete, print the full ticket plan and proceed immediately to Phase 4.

---

## Phase 4 — Dev + SA review loop (per ticket)

Build a flat globally-ordered ticket list across all features, respecting inter-ticket and inter-feature dependencies.

For each ticket in order:

### 4a — Dev: Implement

Spawn a **Dev agent** (`claude-sonnet-4-6`).

Instructions:
- Read the ticket at `docs/tickets/<feature>/<ticket-id>.md`
- Confirm all dependency tickets are merged
- Read `docs/ux/<feature>.md` before touching any UI file
- Implement only what the ticket describes; write tests
- Push the branch
- Open PR via MCP: `mcp__github__create_pull_request` — title `[<ticket-id>] <ticket title>`
- Request SA review: `mcp__github__request_reviewers`
- Output: PR URL

### 4b — SA: Review PR

Spawn a **SA agent** (`claude-sonnet-4-6`).

Instructions:
- Read the diff: `mcp__github__get_pull_request_files`
- Check the SA Review Checklist from `agents/sa/agent.md`
- Submit: `mcp__github__create_pull_request_review` — `REQUEST_CHANGES` or `APPROVE`
- Output: decision + comment list

If `REQUEST_CHANGES` → run Phase 4c, then repeat 4b.

### 4c — Dev: Resolve comments

Spawn a **Dev agent** (`claude-sonnet-4-6`).

Instructions:
- Read comments: `mcp__github__list_review_comments_on_pull_request`
- Fix each issue on the same branch
- Reply to each: `mcp__github__create_review_comment_reply` with commit SHA
- Push; re-request SA review: `mcp__github__request_reviewers`

Tickets with no dependency on the current one may run in parallel.

---

## Phase 5 — QA: Tests + UI verification

When all tickets for a feature are merged, spawn a **QA agent** (`claude-sonnet-4-6`).

Instructions:
- Read `docs/specs/<feature>.md` — map each acceptance criterion to a test case ID
- Read `docs/ux/<feature>.md` — identify UI assertions (colours, dimensions, states, responsive)
- Write Katalon test cases in `tests/katalon/Test Cases/<feature>/`
- Run `TS_Smoke` on staging
- Verify UI against UX spec using the UI Verification checklist from `agents/qa/agent.md`
- Output: coverage table, defect list with severity

Critical or High defects → create a fix ticket, insert into Phase 4 queue, return here after merge.

Features may run Phase 5 in parallel with Phase 4 tickets of other features.

---

## Phase 6 — BA: Acceptance criteria validation

Spawn a **BA agent** (`claude-sonnet-4-6`) per feature after QA sign-off.

Instructions (Validation workflow from `agents/ba/agent.md`):
- Read `docs/specs/<feature>.md`
- Compare each acceptance criterion against QA test results from Phase 5
- Output: PASSED / FAILED per criterion; overall APPROVED or REJECTED

If REJECTED → route failed criteria to Phase 4 as fix tickets.

---

## Phase 7 — PM: Release notes + close-out

When every feature has BA sign-off, spawn a **PM agent** (`claude-haiku-4-5-20251001`).

Instructions:
- Confirm BA + QA sign-off for every feature
- Determine release version (increment from `docs/pm/release-notes/`)
- Write `docs/pm/release-notes/<version>.md` covering all features
- Update `docs/pm/status.md` — mark every shipped feature
- Update `docs/pm/risks.md` — close resolved risks
- Write `docs/pm/sprints/<sprint-id>.md`
- Output: release notes path, sprint report path

---

## Completion

| Feature | Spec | UX spec | Tickets | PRs | QA | BA sign-off |
|---------|------|---------|---------|-----|----|-------------|
| ...     | ✓    | ✓       | N       | ... | ✓  | ✓           |

- Release notes: file path
- Open defects or carry-over tickets
- Remaining open risks
