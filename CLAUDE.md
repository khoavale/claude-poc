# Shoes Selling Management — CLAUDE.md

## Project Overview
Full-stack shoes selling management system with a React frontend and Node/Express API.
SDLC is agent-driven: a PM agent owns visibility and risk, a BA agent handles requirements, a UX agent defines UI specs, an SA agent owns code quality standards, a Dev agent handles implementation, and a QA agent owns automated testing.

## Architecture
- **Frontend**: React + TypeScript + Tailwind CSS (Vite)
- **Backend**: Node.js + Express + TypeScript
- **Database**: SQLite (dev) / PostgreSQL (prod)
- **State**: React Query + Zustand

## Agent Roles
- `agents/pm/` — Product Manager agent: owns stakeholder communication, risk register, sprint reports, release notes
- `agents/ba/` — Business Analyst agent: owns requirements, user stories, acceptance criteria
- `agents/ux/` — UX agent: owns pixel specs, colour tokens, component states, and responsive layout
- `agents/sa/` — Solution Architect agent: owns code conventions, patterns, and DB best practices
- `agents/dev/` — Developer agent: owns implementation; must follow UX specs for all UI work
- `agents/qa/` — QA agent: owns automated test strategy, Katalon suites, and UX verification

## Directory Structure
```
src/
  components/    # Reusable UI components
  pages/         # Route-level page components
  api/           # API client + hooks
  types/         # Shared TypeScript types
  utils/         # Pure utility functions
docs/
  requirements/  # BA-produced requirements docs
  specs/         # Feature specs and user stories
  design/        # Wireframes and design decisions
  architecture/  # SA-produced conventions, patterns, and decision log
  tickets/       # SA-produced implementation tickets (one file per ticket)
  ux/            # UX-produced token definitions and per-feature UI specs
  qa/            # QA-produced test plans and coverage summaries
  pm/            # PM-produced status reports, risk register, release notes
agents/
  pm/            # PM agent prompts and workflows
  ba/            # BA agent prompts and workflows
  ux/            # UX agent prompts and workflows
  sa/            # SA agent prompts and workflows
  dev/           # Dev agent prompts and workflows
  qa/            # QA agent prompts and workflows
```

## MCP Integration

The project uses the **GitHub MCP server** to automate PR creation, review, and comment resolution between agents.

### Setup
```bash
export GITHUB_TOKEN=<your_personal_access_token>
# Token needs: repo, pull_requests, read:org scopes
```

Config lives in `.claude/settings.json` — the MCP server starts automatically when any agent runs.

### Agent → MCP responsibilities
| Agent | MCP actions |
|-------|------------|
| Dev | `create_pull_request`, `request_reviewers`, `list_review_comments_on_pull_request`, `create_review_comment_reply`, push updated branch |
| SA | `list_pull_requests`, `get_pull_request_files`, `create_pull_request_review` (REQUEST_CHANGES or APPROVE) |

### PR lifecycle
```
Dev pushes branch
  → Dev: create_pull_request + request_reviewers (SA)
    → SA: list_pull_requests → get PR → create_pull_request_review (REQUEST_CHANGES)
      → Dev: read comments → fix → create_review_comment_reply → push → request_reviewers (SA)
        → SA: create_pull_request_review (APPROVE)
          → merge
```

## Code Conventions
- TypeScript strict mode
- Named exports only (no default exports except pages)
- No `any` types
- Tailwind for all styling — no inline styles
- React Query for all server state; Zustand for client-only state

## SDLC Workflow
1. PM agent confirms all inputs are ready (design assets, stakeholder sign-off)
2. BA agent produces requirements → `docs/requirements/`
3. BA agent writes feature specs → `docs/specs/`
4. UX agent reads design assets and produces UX spec → `docs/ux/<feature>.md`
5. SA agent reviews spec for architectural impact; breaks spec into ordered tickets → `docs/tickets/<feature>/`
6. Dev agent implements one ticket per branch and opens one PR per ticket → `src/`
7. Dev agent writes unit tests alongside code
8. QA agent writes API + E2E tests; verifies UI against UX spec → `tests/katalon/`
9. SA agent reviews PR for convention adherence
10. QA agent runs regression suite on staging and signs off release
11. BA agent validates acceptance criteria
12. PM agent writes release notes and communicates to stakeholders
