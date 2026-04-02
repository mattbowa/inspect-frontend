export type ScanStatus = 'idle' | 'pending' | 'crawling' | 'analysing' | 'done' | 'failed'

export type IssueSeverity = 'error' | 'warning' | 'info'

export interface Issue {
  page_url: string
  severity: IssueSeverity
  type: string
  description: string
  suggestion: string
}

export interface AgentResult {
  agent: string
  summary: string
  issues: Issue[]
}

export interface Report {
  scan_id: string
  url: string
  seo_score: number
  top_actions: string[]
  agents: AgentResult[]
}

export const STATUS_LABEL: Record<ScanStatus, string> = {
  idle: '',
  pending: 'Queued',
  crawling: 'Crawling pages',
  analysing: 'Analysing with AI',
  done: 'Done',
  failed: 'Failed',
}

export const AGENT_LABEL: Record<string, string> = {
  technical: 'Technical',
  content: 'Content',
  linking: 'Internal Linking',
  strategy: 'Strategy',
}
