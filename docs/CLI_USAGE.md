# ADR Generate CLI - Usage Guide

## Overview

The `/adr generate` command analyzes your repository and generates Architecture Decision Records (ADRs) automatically. It uses a 4-stage AI pipeline to detect decisions, infer context, discover rejected alternatives, and generate comprehensive documentation.

## Installation

No additional installation required. The command is available after running:

```bash
npm install
```

## Basic Usage

### Generate ADRs for Current Repository

```bash
npm run adr:generate
```

This will:
1. Detect the current repository from git remote
2. Analyze the codebase using the 4-stage pipeline
3. Create `docs/adr/` directory
4. Generate individual ADR markdown files
5. Create a `README.md` index

### Example Output

```
🏛️  ADR Archaeologist - Generate Architecture Decision Records

📦 Repository: https://github.com/suyashkumar102/ADR-Archeologist

🔄 Stage 1: Decision detection...
✅ Stage 1 complete: 8 items (12450ms)

🔄 Stage 2: Context inference...
✅ Stage 2 complete: 8 items (15230ms)

🔄 Stage 3: Alternatives archaeology...
✅ Stage 3 complete: 3 items (8920ms)

🔄 Stage 4: ADR generation...
  📄 ADR-001: Use Next.js for Frontend Framework
  📄 ADR-002: Use Express.js for Backend API
  📄 ADR-003: Use Groq AI for LLM Processing
✅ Stage 4 complete: 8 items (18340ms)

✨ Pipeline complete!

📝 Writing ADR files to d:\ADR_Arch\adr-archaeologist\docs\adr...
  ✓ 0001-use-nextjs-for-frontend-framework.md
  ✓ 0002-use-expressjs-for-backend-api.md
  ✓ 0003-use-groq-ai-for-llm-processing.md
  ✓ README.md

✅ Generated 8 ADRs. Found 3 archaeology discoveries.
📊 Total time: 54.94s
📁 Output directory: d:\ADR_Arch\adr-archaeologist\docs\adr
```

## Advanced Usage

### Focus on Specific Decision Categories

Limit analysis to specific architectural areas:

```bash
npm run adr:generate -- --focus=infrastructure,auth,database
```

**Valid Focus Areas:**
- `infrastructure` - Deployment, hosting, CI/CD
- `database` - Database choices, ORMs, migrations
- `auth` - Authentication, authorization, security
- `caching` - Caching strategies, Redis, CDN
- `structure` - Project structure, modularity
- `testing` - Testing frameworks, strategies
- `communication` - APIs, messaging, protocols
- `error_handling` - Error handling, logging, monitoring

### Analyze a Different Repository

```bash
npm run adr:generate -- --repo=https://github.com/django/django
```

### Filter by Subdirectory

Analyze only specific parts of the codebase:

```bash
npm run adr:generate -- --path=src/
npm run adr:generate -- --path=backend/
```

### Combine Multiple Options

```bash
npm run adr:generate -- --repo=https://github.com/django/django --path=django/core/ --focus=database,caching
```

## Output Structure

The command creates the following structure:

```
docs/
└── adr/
    ├── README.md                           # Index with summary table
    ├── 0001-use-nextjs-for-frontend.md    # Individual ADR files
    ├── 0002-use-expressjs-for-backend.md
    └── 0003-use-groq-ai-for-llm.md
```

### ADR File Format

Each ADR follows the [MADR](https://adr.github.io/madr/) format:

```markdown
# ADR-001: Use Next.js for Frontend Framework

Date: ~2024
Status: Accepted
Category: infrastructure
Confidence: 95%

## Context
[Problem statement and background]

## Decision
[What was chosen and why]

## Consequences

### Positive
- [Benefits]

### Negative
- [Tradeoffs]

## Alternatives Considered
- **Option A**: [Why rejected]
- **Option B**: [Why rejected]

## Archaeology
> Evidence of alternatives considered before this decision

- **Vue.js** — rejected: [reason]
  > Evidence (`commented_out`): `src/old-components/vue-setup.js`

## Evidence trail
- `package.json`
- `next.config.js`
- `app/layout.tsx`
```

## Requirements

### Environment Variables

The command requires AI provider credentials. Create a `.env.local` file:

```env
# Choose one AI provider
AI_PROVIDER=groq

# Groq (recommended - free, fast, 128k context)
GROQ_API_KEY=your_groq_api_key_here

# GitHub Token (for repository access)
GITHUB_TOKEN=your_github_token_here
```

Get API keys:
- **Groq**: https://console.groq.com/keys (free, no credit card)
- **GitHub**: https://github.com/settings/tokens (required for private repos)

### Git Repository

The command must be run in a git repository with a remote configured:

```bash
git remote -v
# Should show: origin https://github.com/owner/repo (fetch)
```

## Troubleshooting

### "Could not detect git repository"

**Solution**: Ensure you're in a git repository:
```bash
git init
git remote add origin https://github.com/owner/repo
```

### "GitHub API rate limit exceeded"

**Solution**: Add `GITHUB_TOKEN` to `.env.local`:
```env
GITHUB_TOKEN=ghp_your_token_here
```

This increases the rate limit from 60 to 5000 requests/hour.

### "Failed to validate repository"

**Possible causes:**
- Repository is private (requires `GITHUB_TOKEN`)
- Repository URL is incorrect
- Network connectivity issues

**Solution**: Verify the repository URL and add authentication if needed.

### "AI_PROVIDER not configured"

**Solution**: Set up your `.env.local` file with AI provider credentials:
```env
AI_PROVIDER=groq
GROQ_API_KEY=your_key_here
```

## Pipeline Stages

The command runs a 4-stage pipeline:

### Stage 1: Decision Detection
Scans the codebase for architectural decision patterns:
- Technology choices (dependencies, imports)
- Configuration files
- Project structure
- Testing patterns

### Stage 2: Context Inference
For each decision, infers:
- Problem it was solving
- Constraints that drove the choice
- Timeline estimation

### Stage 3: Alternatives Archaeology
Searches for evidence of rejected alternatives:
- Commented-out code
- Migration artifacts
- Dead imports/utilities
- Removed tests
- TODO comments

### Stage 4: ADR Generation
Generates complete MADR-format documentation with:
- Context and decision rationale
- Consequences (positive and negative)
- Alternatives considered
- Archaeology discoveries
- Evidence trail with file references

## Best Practices

1. **Run regularly**: Generate ADRs after major architectural changes
2. **Review output**: AI-generated ADRs should be reviewed and refined
3. **Use focus areas**: For large codebases, analyze specific areas first
4. **Commit to git**: Track ADR evolution over time
5. **Update manually**: Add human insights and corrections

## Integration with Bob IDE

This command implements the `/adr` slash command defined in Bob IDE configuration. It can be triggered:

1. **Via CLI**: `npm run adr:generate`
2. **Via Bob IDE**: Type `/adr generate` in Bob chat
3. **Via npm scripts**: Add to your workflow scripts

## Examples

### Example 1: Quick Analysis
```bash
npm run adr:generate
```

### Example 2: Focus on Backend Decisions
```bash
npm run adr:generate -- --focus=database,caching,communication
```

### Example 3: Analyze Django Core
```bash
npm run adr:generate -- --repo=https://github.com/django/django --path=django/core/
```

### Example 4: Security and Auth Review
```bash
npm run adr:generate -- --focus=auth,error_handling
```

## Support

For issues or questions:
- GitHub Issues: https://github.com/suyashkumar102/ADR-Archeologist/issues
- Documentation: See README.md and SPEC.md

---

Made with ❤️ using IBM Bob IDE