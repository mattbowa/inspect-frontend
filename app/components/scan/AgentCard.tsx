'use client'

import { useState } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import type { AgentResult } from './types'
import { AGENT_LABEL, ISSUE_TYPE_LABEL } from './types'
import { SeverityBadge } from './SeverityBadge'
import { t } from '../../theme'

const Card = styled.div`
  border-radius: 12px;
  border: 1px solid ${t.border};
  background: ${t.surface};
  overflow: hidden;
`

const Header = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  text-align: left;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background 150ms ease;
  color: inherit;

  &:hover {
    background: rgba(255, 255, 255, 0.04);
  }
`

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const AgentName = styled.span`
  font-weight: 600;
  font-size: 15px;
  color: ${t.textPrimary};
`

const Summary = styled.span`
  font-size: 13px;
  color: ${t.textSecondary};
`

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: 16px;
  flex-shrink: 0;
`

const ErrorCount = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: ${t.errorText};
`

const WarnCount = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: ${t.warning};
`

const Chevron = styled.svg<{ open: boolean }>`
  width: 16px;
  height: 16px;
  color: ${t.textMuted};
  transition: transform 200ms ease;
  ${(p) => p.open && css`transform: rotate(180deg);`}
`

const IssueList = styled.div`
  border-top: 1px solid ${t.border};

  & > * + * {
    border-top: 1px solid ${t.border};
  }
`

const IssueRow = styled.div`
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const IssueHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`

const PageUrl = styled.span`
  font-size: 11px;
  font-family: monospace;
  color: ${t.textMuted};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 300px;
`

const IssueDescription = styled.p`
  font-size: 13px;
  color: ${t.textSecondary};
  margin: 0;
`

const IssueSuggestion = styled.p`
  font-size: 13px;
  color: ${t.textMuted};
  font-style: italic;
  margin: 0;
`

const IssueTypeTag = styled.span`
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${t.textMuted};
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${t.border};
  border-radius: 4px;
  padding: 1px 6px;
  flex-shrink: 0;
`

const Empty = styled.div`
  border-top: 1px solid ${t.border};
  padding: 16px 20px;
  font-size: 13px;
  color: ${t.textMuted};
`

const AllClear = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #4ade80;
`

type Props = {
  result: AgentResult
}

export const AgentCard = ({ result }: Props) => {
  const [open, setOpen] = useState(false)
  const label = AGENT_LABEL[result.agent] ?? result.agent
  const errorCount = result.issues.filter((i) => i.severity === 'error').length
  const warnCount = result.issues.filter((i) => i.severity === 'warning').length

  return (
    <Card>
      <Header onClick={() => setOpen((o) => !o)}>
        <HeaderLeft>
          <AgentName>{label}</AgentName>
          <Summary>{result.summary}</Summary>
        </HeaderLeft>
        <HeaderRight>
          {errorCount > 0 && (
            <ErrorCount>{errorCount} error{errorCount > 1 ? 's' : ''}</ErrorCount>
          )}
          {warnCount > 0 && (
            <WarnCount>{warnCount} warning{warnCount > 1 ? 's' : ''}</WarnCount>
          )}
          {errorCount === 0 && warnCount === 0 && (
            <AllClear>✓ No issues</AllClear>
          )}
          <Chevron open={open} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </Chevron>
        </HeaderRight>
      </Header>

      {open && (
        result.issues.length > 0 ? (
          <IssueList>
            {result.issues.map((issue, i) => (
              <IssueRow key={i}>
                <IssueHeader>
                  <SeverityBadge severity={issue.severity} />
                  <IssueTypeTag>{ISSUE_TYPE_LABEL[issue.type] ?? issue.type}</IssueTypeTag>
                  <PageUrl>{issue.page_url}</PageUrl>
                </IssueHeader>
                <IssueDescription>{issue.description}</IssueDescription>
                {issue.suggestion && (
                  <IssueSuggestion>{issue.suggestion}</IssueSuggestion>
                )}
              </IssueRow>
            ))}
          </IssueList>
        ) : (
          <Empty>No issues found.</Empty>
        )
      )}
    </Card>
  )
}
