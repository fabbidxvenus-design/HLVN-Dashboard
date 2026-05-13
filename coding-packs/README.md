# HLVN Dashboard Coding Packs — Vibecode Kit v5.0

> AI Quality Command Center — Coding Packs for HLVN Dashboard
> Generated from Vibecode Kit v5.0 framework
> Design Source: Stitch Project 14474775540072767519

## How to Use

### Power Triangle

```
CON NGUOI (Chủ nhà)            ← Bạn: Approve, decide, relay
        |
    ----+----
    |        |
CLAUDE CHAT                   CLAUDE CODE
(Chủ thầu)                    (Thợ thi công)
Design, interview              Implement TIPs
Orchestrate                   Self-test, report
```

### Workflow

1. **Read `00-PROJECT-CONTEXT.md`** — Understand project context + design source
2. **Run `/vibecode:rri`** — Capture requirements from Stitch UI
3. **Run `/vibecode:blueprint`** — Generate architecture + task graph
4. **Pick a TIP** from `tips/` folder (follow dependency order)
5. **Paste TIP into Claude Code** — Builder implements it
6. **Builder returns Completion Report** — Relay to Architect
7. **Repeat** until all TIPs done

## File Structure

```
coding-packs/
├── README.md                         # This file
├── 00-PROJECT-CONTEXT.md             # Scan Report + Vision
├── 01-REQUIREMENTS-MATRIX.md         # Requirements traceability (by RRI)
├── 02-TASK-GRAPH.md                  # Task dependency graph (by Blueprint)
├── BUILDER-HANDOFF.md                # Builder instructions (by Blueprint)
├── research/                         # Research outputs (by /research)
├── plans/                            # Implementation plans
├── reports/                          # Completion reports, verify reports
├── standards/                         # Tribal knowledge standards
│   └── README.md
└── tips/                             # TIP files (populated by /tip)
    ├── TIP-001-xxx.md
    └── ...
```

## Tech Stack

| Layer | Technology | Version |
|-------|------------|--------|
| Build | Vite | 6.x |
| Framework | React | 19.x |
| Routing | React Router | v7 |
| Language | TypeScript | Strict |
| Styling | Tailwind CSS | v4 |
| UI Components | shadcn/ui + CVA | Latest |
| State | Zustand | Latest |
| Forms | react-hook-form + Zod | Latest |
| Tables | TanStack Table | Latest |
| Charts | Recharts | Latest |
| Auth | Supabase | Latest |
| Toasts | sonner | Latest |

## Execution Order

| Week | TIPs | Focus |
|------|------|-------|
| 1 | TIP-001, 002, 003 | Scaffold + Design + Layout |
| 2 | TIP-004, 005, 006 | Auth + Routes + UI Primitives |
| 3 | TIP-007, 008 | Dashboard + Scans |
| 4 | TIP-009, 010, 011 | Users + Analytics + Export |
| 5 | TIP-012, 013 | Realtime + Polish |

## Design Source

- **Stitch Project**: HLVN Dashboard Redesign v5
- **URL**: https://stitch.withgoogle.com/projects/14474775540072767519
- **Primary Color**: #10B981 (Emerald)
- **Typography**: Manrope + Inter + Public Sans

## Source Documents

- Scan Report: `00-PROJECT-CONTEXT.md`
- Requirements: `01-REQUIREMENTS-MATRIX.md`
- Task Graph: `02-TASK-GRAPH.md`

---

*Generated: 2026-05-12 | Framework: Vibecode Kit v5.0 | Project: HLVN Dashboard*
