#!/usr/bin/env node
/**
 * ADR Generate CLI
 *
 * Generates Architecture Decision Records for the current repository.
 *
 * Usage:
 *   npm run adr:generate
 *   npm run adr:generate -- --focus=infrastructure,auth
 *
 * This script:
 * 1. Analyzes the current repository using the 4-stage pipeline
 * 2. Creates docs/adr/ directory if needed
 * 3. Writes one .md file per ADR
 * 4. Writes docs/adr/README.md as index
 * 5. Reports: "Generated {N} ADRs. Found {M} archaeology discoveries."
 */

// Load environment variables first
import { config } from 'dotenv'
config({ path: '.env.local' })

import * as fs from 'fs'
import * as path from 'path'
import { runPipeline } from '../src/lib/pipeline'
import { toMADR, toFilename, buildIndex } from '../src/lib/export/madr'
import type { FocusArea, SSEEvent } from '../src/types'

// ─── Parse Command Line Arguments ────────────────────────────────────────────

interface CLIArgs {
  focusAreas?: FocusArea[]
  repoUrl: string
  pathFilter?: string
}

function parseArgs(): CLIArgs {
  const args = process.argv.slice(2)
  
  // Default to current directory's git remote
  let repoUrl = ''
  let focusAreas: FocusArea[] | undefined
  let pathFilter: string | undefined
  
  // Try to get repo URL from git remote
  try {
    const { execSync } = require('child_process')
    const remote = execSync('git config --get remote.origin.url', { encoding: 'utf-8' }).trim()
    
    // Convert SSH URL to HTTPS if needed
    if (remote.startsWith('git@github.com:')) {
      repoUrl = remote.replace('git@github.com:', 'https://github.com/').replace('.git', '')
    } else {
      repoUrl = remote.replace('.git', '')
    }
  } catch (error) {
    console.error('Error: Could not detect git repository. Please run this command in a git repository.')
    process.exit(1)
  }
  
  // Parse --focus argument
  for (const arg of args) {
    if (arg.startsWith('--focus=')) {
      const areas = arg.replace('--focus=', '').split(',').map(a => a.trim())
      
      // Validate focus areas
      const validAreas: FocusArea[] = [
        'infrastructure', 'database', 'auth', 'caching', 
        'structure', 'testing', 'communication', 'error_handling'
      ]
      
      const invalidAreas = areas.filter(a => !validAreas.includes(a as FocusArea))
      if (invalidAreas.length > 0) {
        console.error(`Error: Invalid focus areas: ${invalidAreas.join(', ')}`)
        console.error(`Valid areas: ${validAreas.join(', ')}`)
        process.exit(1)
      }
      
      focusAreas = areas as FocusArea[]
    } else if (arg.startsWith('--path=')) {
      pathFilter = arg.replace('--path=', '')
    } else if (arg.startsWith('--repo=')) {
      repoUrl = arg.replace('--repo=', '')
    }
  }
  
  if (!repoUrl) {
    console.error('Error: Could not determine repository URL')
    process.exit(1)
  }
  
  return { repoUrl, focusAreas, pathFilter }
}

// ─── Progress Reporter ───────────────────────────────────────────────────────

function reportProgress(event: SSEEvent): void {
  switch (event.type) {
    case 'stage_start':
      console.log(`\n🔄 Stage ${event.stage}: ${event.name}...`)
      break
      
    case 'stage_complete':
      console.log(`✅ Stage ${event.stage} complete: ${event.count} items (${event.durationMs}ms)`)
      break
      
    case 'adr_ready':
      console.log(`  📄 ${event.adr.id}: ${event.adr.title}`)
      break
      
    case 'pipeline_done':
      console.log(`\n✨ Pipeline complete!`)
      break
      
    case 'error':
      console.error(`\n❌ Error: ${event.message}`)
      break
  }
}

// ─── File System Operations ──────────────────────────────────────────────────

function ensureDirectoryExists(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
    console.log(`📁 Created directory: ${dirPath}`)
  }
}

function writeADRFile(adrDir: string, filename: string, content: string): void {
  const filePath = path.join(adrDir, filename)
  fs.writeFileSync(filePath, content, 'utf-8')
}

// ─── Main Function ───────────────────────────────────────────────────────────

async function main() {
  console.log('🏛️  ADR Archaeologist - Generate Architecture Decision Records\n')
  
  // Parse arguments
  const { repoUrl, focusAreas, pathFilter } = parseArgs()
  
  console.log(`📦 Repository: ${repoUrl}`)
  if (pathFilter) {
    console.log(`📂 Path filter: ${pathFilter}`)
  }
  if (focusAreas) {
    console.log(`🎯 Focus areas: ${focusAreas.join(', ')}`)
  }
  
  try {
    // Run the pipeline
    const result = await runPipeline(
      { repoUrl, pathFilter, focusAreas },
      reportProgress
    )
    
    // Create docs/adr directory
    const adrDir = path.join(process.cwd(), 'docs', 'adr')
    ensureDirectoryExists(adrDir)
    
    // Write individual ADR files
    console.log(`\n📝 Writing ADR files to ${adrDir}...`)
    for (const adr of result.adrs) {
      const filename = toFilename(adr)
      const content = toMADR(adr)
      writeADRFile(adrDir, filename, content)
      console.log(`  ✓ ${filename}`)
    }
    
    // Write README.md index
    const indexPath = path.join(adrDir, 'README.md')
    fs.writeFileSync(indexPath, result.indexContent, 'utf-8')
    console.log(`  ✓ README.md`)
    
    // Final report
    console.log(`\n✅ Generated ${result.adrs.length} ADRs. Found ${result.archaeologyCount} archaeology discoveries.`)
    console.log(`📊 Total time: ${(result.totalTimeMs / 1000).toFixed(2)}s`)
    console.log(`📁 Output directory: ${adrDir}`)
    
  } catch (error) {
    const err = error as Error
    console.error(`\n❌ Failed to generate ADRs: ${err.message}`)
    if (err.stack) {
      console.error(err.stack)
    }
    process.exit(1)
  }
}

// ─── Run ─────────────────────────────────────────────────────────────────────

main().catch(error => {
  console.error('Unexpected error:', error)
  process.exit(1)
})

// Made with Bob
