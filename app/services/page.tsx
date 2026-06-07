import type { Metadata } from 'next'
import Link from 'next/link'
import { t } from '../theme'

export const metadata: Metadata = {
  title: "SEO Services",
  description: "Done-for-you SEO services: foundation setup (metadata, OG image, sitemap, robots.txt, Google Search Console) and audit issue fixes. Starting from $99.",
  alternates: { canonical: "https://www.inspectflux.com/services" },
  openGraph: {
    title: "SEO Services — InspectFlux",
    description: "SEO foundation setup and done-for-you audit fixes. Starting from $99. We handle the technical work so you don't have to.",
    url: "https://www.inspectflux.com/services",
  },
}

// Pricing tiers — commented out until ready to launch
// const tiers = [
//   {
//     name: 'Quick Fix',
//     price: '$99',
//     description: 'Best for sites with a handful of specific issues.',
//     features: [
//       'Fix up to 5 technical issues',
//       'Missing tags, broken links, canonical errors',
//       'Delivered within 3 business days',
//       'One round of revisions',
//     ],
//   },
//   {
//     name: 'Full Audit Fix',
//     price: '$249',
//     description: 'We fix everything flagged in your InspectFlux report.',
//     features: [
//       'Fix all technical issues from your audit',
//       'robots.txt, sitemap, HTTPS, structured data',
//       'Canonical and redirect chain fixes',
//       'Delivered within 5 business days',
//       'Two rounds of revisions',
//     ],
//     highlight: true,
//   },
//   {
//     name: 'Custom',
//     price: 'Get a quote',
//     description: 'Complex sites, CMS integrations, or ongoing support.',
//     features: [
//       'Everything in Full Audit Fix',
//       'CMS-specific fixes (WordPress, Shopify, etc.)',
//       'Ongoing monthly SEO maintenance',
//       'Priority turnaround',
//     ],
//   },
// ]


// How it works steps — commented out until pricing tiers are live
// const steps = [
//   { n: '01', title: 'Run a free audit', body: 'Use InspectFlux to scan your site and get a full list of technical issues.' },
//   { n: '02', title: 'Choose a plan', body: 'Pick the tier that matches your needs, or contact us for a custom quote.' },
//   { n: '03', title: 'We get to work', body: 'Our team fixes the issues directly in your codebase or CMS and delivers a summary.' },
//   { n: '04', title: 'Re-scan to verify', body: 'Run another audit to confirm everything is resolved. Your score should improve.' },
// ]

const services = [
  {
    tag: 'SEO foundation',
    title: 'SEO Foundation Setup',
    price: 'From $149',
    description:
      'We implement the complete technical SEO foundation your site needs to get indexed, ranked, and shared correctly — done in one go.',
    includes: [
      'Rich metadata (title, description, keywords)',
      'Open Graph & Twitter card tags',
      'Custom OG image (1200×630)',
      'Auto-generated sitemap.xml',
      'robots.txt with correct crawl rules',
      'JSON-LD structured data (Schema.org)',
      'Google Search Console verification',
      'Sitemap submission to Google',
    ],
    bestFor: 'New sites, launches, or sites that have never had SEO set up properly.',
  },
  {
    tag: 'Done-for-you fixes',
    title: 'Audit Issue Fixes',
    price: 'From $99',
    description:
      'Run a free InspectFlux audit, then send us the report. We fix every flagged issue and deliver a clean site.',
    includes: [
      'Fix all issues from your audit report',
      'Broken links & redirect chains',
      'Canonical tag errors',
      'Missing or duplicate meta tags',
      'HTTPS & mixed content issues',
      'Structured data errors',
      'One round of revisions included',
    ],
    bestFor: 'Sites that already have an audit and need the problems resolved fast.',
  },
]

export default function Services() {
  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-16 sm:px-6">
      {/* Hero */}
      <div className="w-full max-w-2xl text-center mb-14">
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: t.accent,
            marginBottom: 12,
          }}
        >
          Done-for-you SEO
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: t.textPrimary }}>
          We fix the issues. You focus on your business.
        </h1>
        <p style={{ fontSize: 15, color: t.textSecondary, lineHeight: 1.7 }}>
          From setting up your SEO foundation from scratch to fixing every issue in your audit report — we handle the technical work so you don&apos;t have to.
        </p>
      </div>

      {/* Service cards */}
      <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14">
        {services.map((s) => (
          <div
            key={s.title}
            style={{
              borderRadius: 16,
              border: `1px solid ${t.border}`,
              background: t.surface,
              padding: '28px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: 0,
            }}
          >
            <p
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: t.accent,
                marginBottom: 8,
              }}
            >
              {s.tag}
            </p>
            <p style={{ fontSize: 17, fontWeight: 700, color: t.textPrimary, marginBottom: 4 }}>
              {s.title}
            </p>
            <p style={{ fontSize: 20, fontWeight: 800, color: t.textPrimary, marginBottom: 12 }}>
              {s.price}
            </p>
            <p style={{ fontSize: 13, color: t.textSecondary, lineHeight: 1.7, marginBottom: 16 }}>
              {s.description}
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {s.includes.map((item) => (
                <li key={item} style={{ fontSize: 13, color: t.textSecondary, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <span style={{ color: t.success, fontWeight: 700, flexShrink: 0 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <p style={{ fontSize: 12, color: t.textMuted, lineHeight: 1.6, marginTop: 'auto', paddingTop: 12, borderTop: `1px solid ${t.border}` }}>
              <span style={{ fontWeight: 600, color: t.textSubtle }}>Best for: </span>{s.bestFor}
            </p>
          </div>
        ))}
      </div>

      {/* Platforms */}
      <div className="w-full max-w-2xl mb-14 text-center">
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-4"
          style={{ color: t.textMuted }}
        >
          Works with
        </p>
        <p style={{ fontSize: 14, color: t.textSecondary, lineHeight: 1.8 }}>
          WordPress, Shopify, Webflow, Wix, Squarespace, Magento, BigCommerce, Framer, Next.js, custom-built sites, and more. If it has a URL, we can fix it.
        </p>
      </div>

      {/* CTA */}
      <div
        style={{
          width: '100%',
          maxWidth: 560,
          borderRadius: 16,
          border: `1px solid ${t.border}`,
          background: t.surface,
          padding: '36px 32px',
          textAlign: 'center',
        }}
      >
        <p style={{ fontSize: 18, fontWeight: 700, color: t.textPrimary, marginBottom: 8 }}>
          Get a quote
        </p>
        <p style={{ fontSize: 13, color: t.textSecondary, marginBottom: 24, lineHeight: 1.7 }}>
          Not sure which service you need? Run a free audit first, then contact us and we&apos;ll review your site and send a quote.
        </p>
        <Link
          href="/contact"
          style={{
            borderRadius: 10, padding: '10px 28px', fontSize: 14, fontWeight: 600,
            background: t.accent, color: t.textPrimary, textDecoration: 'none', display: 'inline-block',
          }}
        >
          Contact us
        </Link>
      </div>
    </main>
  )
}
