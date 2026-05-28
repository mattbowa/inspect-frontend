'use client'

import Link from 'next/link'
import { t } from '../theme'

const plans = [
  {
    name: 'Basic',
    plan: null,
    price: 0,
    description: 'Try it out for free.',
    pages: '2 pages per scan',
    frequency: 'On demand',
    features: [
      '2 pages audited per scan',
      'Technical, content & linking analysis',
      'AI-generated action plan',
    ],
    cta: 'Get started free',
    href: '/',
    highlighted: false,
  },
  {
    name: 'Business',
    plan: 'business',
    price: 9.99,
    description: 'For growing sites that need regular monitoring.',
    pages: 'Full site scan',
    frequency: 'Weekly automated monitoring',
    features: [
      'Unlimited pages per scan',
      'Weekly automated monitoring',
      'Email alerts when new issues detected',
      'Technical, content & linking analysis',
      'AI-generated action plan',
      'Scan history',
    ],
    cta: 'Start Business',
    href: '/signup?plan=business',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    plan: 'enterprise',
    price: 29.99,
    description: 'For teams that need daily visibility.',
    pages: 'Full site scan',
    frequency: 'Daily automated monitoring',
    features: [
      'Unlimited pages per scan',
      'Daily automated monitoring',
      'Email alerts when new issues detected',
      'Technical, content & linking analysis',
      'AI-generated action plan',
      'Scan history',
      'Priority support',
    ],
    cta: 'Start Enterprise',
    href: '/signup?plan=enterprise',
    highlighted: false,
  },
]

export default function Pricing() {
  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-16 sm:px-6">
      {/* Header */}
      <div className="w-full max-w-3xl flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-4" style={{ color: t.textPrimary }}>
          Simple, transparent pricing
        </h1>
        <p className="text-lg max-w-lg" style={{ color: t.textSecondary }}>
          Start for free. Upgrade when you need full site coverage.
        </p>
      </div>

      {/* Plans */}
      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-6">
        {plans.map((p) => (
          <div
            key={p.name}
            style={{
              borderRadius: 16,
              border: `1px solid ${p.highlighted ? t.accent : t.border}`,
              background: p.highlighted ? 'rgba(79, 70, 229, 0.08)' : t.surface,
              padding: 28,
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
              position: 'relative',
            }}
          >
            {p.highlighted && (
              <div style={{
                position: 'absolute',
                top: -12,
                left: '50%',
                transform: 'translateX(-50%)',
                background: t.accent,
                color: t.textPrimary,
                fontSize: 11,
                fontWeight: 700,
                padding: '3px 12px',
                borderRadius: 999,
                whiteSpace: 'nowrap',
              }}>
                Most popular
              </div>
            )}

            {/* Name + price */}
            <div>
              <p style={{ fontSize: 13, color: t.textMuted, marginBottom: 4 }}>{p.name}</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span style={{ fontSize: 40, fontWeight: 700, color: t.textPrimary }}>
                  {p.price === 0 ? 'Free' : `$${p.price.toFixed(2)}`}
                </span>
                {p.price > 0 && (
                  <span style={{ fontSize: 14, color: t.textMuted }}>/month</span>
                )}
              </div>
              <p style={{ fontSize: 13, color: t.textSecondary, marginTop: 6 }}>{p.description}</p>
            </div>

            {/* Scan details */}
            <div style={{
              borderRadius: 8,
              border: `1px solid ${t.border}`,
              padding: '10px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: t.textPrimary, margin: 0 }}>{p.pages}</p>
              <p style={{ fontSize: 12, color: t.textSecondary, margin: 0 }}>{p.frequency}</p>
            </div>

            {/* Features */}
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
              {p.features.map((f) => (
                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: t.textSecondary }}>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke={t.success} strokeWidth={2.5} style={{ flexShrink: 0 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link
              href={p.href!}
              style={{
                display: 'block',
                textAlign: 'center',
                borderRadius: 10,
                padding: '12px 0',
                fontWeight: 600,
                fontSize: 14,
                textDecoration: 'none',
                background: p.highlighted ? t.accent : 'transparent',
                color: p.highlighted ? t.textPrimary : t.accent,
                border: `1px solid ${p.highlighted ? t.accent : t.border}`,
              }}
            >
              {p.cta}
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-12" style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        <Link href="/" style={{ fontSize: 13, color: t.textMuted, textDecoration: 'none' }}>
          ← Back to audit
        </Link>
        <Link href="/manage" style={{ fontSize: 13, color: t.textMuted, textDecoration: 'none' }}>
          Already subscribed? Manage your plan →
        </Link>
      </div>
    </main>
  )
}
