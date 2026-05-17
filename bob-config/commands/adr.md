# Slash Command: /adr
# File: bob-config/commands/adr.md
# Usage: Copy contents into Bob IDE → Settings → Commands → New Command
# Command: /adr generate | /adr generate --focus=infrastructure,auth

## Description
Generate Architecture Decision Records for the current repository.

## Implementation
This command is implemented as a CLI script at `scripts/adr-generate.ts` and can be run via:
```bash
npm run adr:generate
npm run adr:generate -- --focus=infrastructure,auth
```

## Arguments
- generate: run full ADR generation workflow
- --focus={areas}: scope to specific decision categories
  Valid areas: infrastructure, database, auth, caching, structure, testing, communication, error_handling
- --repo={url}: analyze a different repository (default: current git remote)
- --path={prefix}: filter files by path prefix (e.g., src/)

## Behaviour
When /adr generate is called:
1. Detect current repository from git remote (or use --repo)
2. Execute the 4-stage pipeline (Decision Detection → Context Inference → Alternatives Archaeology → ADR Generation)
3. Create docs/adr/ directory if it doesn't exist
4. Write each ADR as a separate .md file (e.g., 0001-use-redis-for-caching.md)
5. Write docs/adr/README.md as an index with summary table
6. Report: "Generated {N} ADRs. Found {M} archaeology discoveries."

When /adr generate --focus={areas} is called:
Same workflow but limit Stage 1 detection to specified categories.

## Example usage
```bash
# Generate ADRs for current repository
npm run adr:generate

# Focus on specific areas
npm run adr:generate -- --focus=infrastructure,auth,database

# Analyze different repository
npm run adr:generate -- --repo=https://github.com/django/django

# Filter by path
npm run adr:generate -- --path=src/
```

## Output
Creates `docs/adr/` directory containing:
- Individual ADR markdown files following MADR format
- README.md index with summary table
- Archaeology discoveries marked with [ARCHAEOLOGY] tags
