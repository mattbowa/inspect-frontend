'use client'

import { useState } from 'react'
import Link from 'next/link'
import { t } from '../theme'

const faqs = [
  {
    category: 'General',
    items: [
      {
        q: 'What is InspectFlux?',
        a: 'InspectFlux is an AI-powered SEO auditing tool. Enter any website URL and we crawl your pages, run 18+ automated checks, and deliver a prioritised action plan with an SEO score.',
      },
      {
        q: 'How does the audit work?',
        a: 'We run a 3-stage pipeline: first our crawler visits your pages using a real browser (so JavaScript-rendered content is captured), then AI agents analyse technical health, content quality, and internal linking, and finally a strategy agent synthesises everything into a prioritised top-5 action list.',
      },
      {
        q: 'Do I need to create an account?',
        a: 'No account is required for a free scan. Just enter your URL and hit Run Audit. Paid plans require an email address to unlock full-site scanning and automated monitoring.',
      },
    ],
  },
  {
    category: 'Scans & checks',
    items: [
      {
        q: 'What does InspectFlux check?',
        a: 'We run 18+ checks including: title tags, meta descriptions, H1 structure, image alt text, broken internal and external links, HTTPS, robots.txt, XML sitemap, canonical tags, noindex directives, Open Graph tags, structured data (JSON-LD), redirect chains, orphan pages, thin content, and internal linking opportunities.',
      },
      {
        q: 'How many pages are crawled on the free plan?',
        a: 'The free plan crawls 1 page per scan. Paid plans unlock full-site scanning with no page cap.',
      },
      {
        q: 'How long does a scan take?',
        a: 'A single-page scan typically takes 30–60 seconds. Full-site scans depend on the number of pages — most sites complete in 2–5 minutes.',
      },
      {
        q: 'Does it work on JavaScript-heavy sites?',
        a: 'Yes. We use a real Chromium browser to render pages, so JavaScript-rendered content, SPAs, and dynamic sites are all supported.',
      },
    ],
  },
  {
    category: 'Monitoring & alerts',
    items: [
      {
        q: 'What is automated monitoring?',
        a: 'On paid plans, InspectFlux automatically re-scans your site on a schedule — weekly for Business, daily for Enterprise. If new SEO issues are detected since your last scan, you\'ll receive an email alert.',
      },
      {
        q: 'When will I receive an email alert?',
        a: 'Only when new issues are detected that weren\'t present in your previous scan. We won\'t email you if nothing has changed.',
      },
      {
        q: 'Can I trigger a scan manually on a paid plan?',
        a: 'Yes. You can run a manual scan at any time from the homepage in addition to your automated schedule.',
      },
    ],
  },
  {
    category: 'Services',
    items: [
      {
        q: 'Can you fix the issues found in my audit?',
        a: 'Yes — we offer a done-for-you fix service starting from $99. Run a free audit, then contact us with your report and we\'ll send you a quote based on the complexity of the issues.',
      },
      {
        q: 'What platforms do you support?',
        a: 'We work with all major platforms including WordPress, Shopify, Webflow, Wix, Squarespace, Magento, BigCommerce, Framer, and custom-built sites. If it has a URL, we can fix it.',
      },
      {
        q: 'How long does it take to fix my issues?',
        a: 'Turnaround depends on the complexity of the fixes. We\'ll include an estimated timeline in your quote. Simple fixes are typically completed within a few business days.',
      },
    ],
  },
  {
    category: 'Billing',
    items: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit and debit cards via Stripe. No PayPal or invoicing at this time.',
      },
      {
        q: 'Can I cancel at any time?',
        a: 'Yes. You can cancel your subscription at any time from the billing portal. You\'ll retain access until the end of your current billing period.',
      },
      {
        q: 'Is there a free trial on paid plans?',
        a: 'We don\'t offer a free trial, but the free plan lets you run single-page audits indefinitely so you can evaluate the quality of our reports before upgrading.',
      },
    ],
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ borderBottom: `1px solid ${t.border}` }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
          padding: '18px 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span style={{ fontSize: 15, fontWeight: 500, color: t.textPrimary }}>{q}</span>
        <svg
          width="16"
          height="16"
          fill="none"
          viewBox="0 0 24 24"
          stroke={t.textMuted}
          strokeWidth={2}
          style={{ flexShrink: 0, transition: 'transform 200ms ease', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <p style={{ fontSize: 14, color: t.textSecondary, lineHeight: 1.7, margin: '0 0 18px' }}>
          {a}
        </p>
      )}
    </div>
  )
}

export default function FAQ() {
  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-16 sm:px-6">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-2" style={{ color: t.textPrimary }}>
          Frequently asked questions
        </h1>
        <p className="mb-12" style={{ fontSize: 14, color: t.textSecondary }}>
          Can&apos;t find what you&apos;re looking for?{' '}
          <Link href="/contact" style={{ color: t.accent, textDecoration: 'none' }}>
            Contact us
          </Link>
          .
        </p>

        <div className="flex flex-col gap-12">
          {faqs.map((section) => (
            <div key={section.category} id={section.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: t.textMuted,
                  marginBottom: 4,
                }}
              >
                {section.category}
              </p>
              <div>
                {section.items.map((item) => (
                  <FaqItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <Link href="/" style={{ fontSize: 13, color: t.textMuted, textDecoration: 'none' }}>
            ← Back to audit
          </Link>
        </div>
      </div>
    </main>
  )
}
