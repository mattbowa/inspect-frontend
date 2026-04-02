'use client'

import styled from '@emotion/styled'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`

const Label = styled.span`
  font-size: 13px;
  color: #71717a;
`

const scoreColor = (score: number) =>
  score >= 70 ? '#22c55e' : score >= 40 ? '#f59e0b' : '#ef4444'

type Props = {
  score: number
}

export const ScoreRing = ({ score }: Props) => {
  const radius = 52
  const circ = 2 * Math.PI * radius
  const offset = circ - (score / 100) * circ
  const color = scoreColor(score)

  return (
    <Wrapper>
      <svg width="130" height="130" viewBox="0 0 130 130">
        <circle cx="65" cy="65" r={radius} fill="none" stroke="#27272a" strokeWidth="10" />
        <circle
          cx="65"
          cy="65"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          transform="rotate(-90 65 65)"
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
        <text
          x="65"
          y="65"
          textAnchor="middle"
          dominantBaseline="central"
          fill={color}
          fontSize="28"
          fontWeight="700"
        >
          {score}
        </text>
      </svg>
      <Label>SEO Score</Label>
    </Wrapper>
  )
}
