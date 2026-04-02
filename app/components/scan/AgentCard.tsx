'use client'

import { useState } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import type { AgentResult } from './types'
import { AGENT_LABEL } from './types'
import { SeverityBadge } from './SeverityBadge'

const Card = styled.div`
  border-radius: 12px;
  border: 1px solid #27272a;
  background: #111113;
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
    background: rgba(255, 255, 255, 0.03);
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
  color: #fafafa;
`

const Summary = styled.span`
  font-size: 13px;
  color: #71717a;
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
  color: #f87171;
`

const WarnCount = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #fbbf24;
`

const Chevron = styled.svg<{ open: boolean }>`
  width: 16px;
  height: 16px;
  color: #52525b;
  transition: transform 200ms ease;
  ${(p) => p.open && css`transform: rotate(180deg);`}
`

const IssueList = styled.div`
  border-top: 1px solid #27272a;

  & > * + * {
    border-top: 1px solid #27272a;
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
  color: #52525b;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 300px;
`

const IssueDescription = styled.p`
  font-size: 13px;
  color: #d4d4d8;
  margin: 0;
`

const IssueSuggestion = styled.p`
  font-size: 13px;
  color: #71717a;
  font-style: italic;
  margin: 0;
`

const Empty = styled.div`
  border-top: 1px solid #27272a;
  padding: 16px 20px;
  font-size: 13px;
  color: #52525b;
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
