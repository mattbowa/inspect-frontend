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
  pages_crawled: number
  pages_discovered: number
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

export const ISSUE_TYPE_LABEL: Record<string, string> = {
  missing_title: 'Missing Title',
  duplicate_title: 'Duplicate Title',
  title_too_long: 'Title Too Long',
  missing_meta_description: 'Missing Meta Description',
  duplicate_meta_description: 'Duplicate Meta Description',
  multiple_h1: 'Multiple H1 Tags',
  missing_h1: 'Missing H1',
  images_missing_alt: 'Missing Alt Text',
  broken_internal_links: 'Broken Internal Links',
  broken_external_links: 'Broken External Links',
  thin_content: 'Thin Content',
  missing_canonical: 'Missing Canonical',
  canonical_external_domain: 'External Canonical',
  noindex_detected: 'Noindex Detected',
  missing_og_tags: 'Missing OG Tags',
  missing_structured_data: 'Missing Structured Data',
  redirect_detected: 'Redirect Detected',
  orphan_page: 'Orphan Page',
  internal_link_opportunity: 'Link Opportunity',
  keyword_cannibalization: 'Keyword Cannibalization',
  content_suggestion: 'Content Suggestion',
}
