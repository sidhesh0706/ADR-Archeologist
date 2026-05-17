export interface AnalyzeRequest {
  repoUrl: string
  pathFilter?: string
  focusAreas?: string[]
}

export interface ADR {
  id: string
  title: string
  status: 'accepted' | 'deprecated' | 'superseded'
  date: string
  category: string
  confidence: number
  inferredDate: string
  context: string
  decision: string
  consequences: {
    positive: string[]
    negative: string[]
  }
  alternatives: Array<{
    option: string
    reason: string
  }>
  archaeology: Array<{
    option: string
    evidenceFile: string
    evidenceType: string
    rejectionReason: string
  }> | null
  evidenceFiles: string[]
  relatedDecisions?: string[]
}

export interface RepoValidation {
  valid: boolean
  fileCount?: number
  language?: string
  error?: string
}

export interface PRResponse {
  prUrl?: string
  error?: string
}

// Flat shape — must stay in sync with the backend's ADRPackage in
// src/types.ts. This is exactly what the Express server emits over the
// SSE `pipeline_done` event and what /github/pr expects. Do NOT reintroduce
// a nested `metadata` object: the backend never sends one.
export interface ADRPackage {
  adrs: Array<ADR & { filename: string; markdownContent: string }>
  indexContent: string
  repoName: string
  repoUrl: string
  totalDecisions: number
  archaeologyCount: number
  totalTimeMs: number
}

export type SSEEvent =
  | { type: 'stage_start'; stage: 1 | 2 | 3 | 4 }
  | { type: 'stage_complete'; stage: 1 | 2 | 3 | 4; count: number; durationMs: number }
  | { type: 'adr_ready'; adr: ADR }
  | { type: 'pipeline_done'; package: ADRPackage }
  | { type: 'error'; message: string }

// Made with Bob
