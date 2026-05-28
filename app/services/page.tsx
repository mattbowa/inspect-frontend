import type { Metadata } from 'next'
import Link from 'next/link'
import { t } from '../theme'

export const metadata: Metadata = {
  title: "SEO Fix Services",
  description: "We fix the technical SEO issues found in your audit. Starting from $99. Supports WordPress, Shopify, Webflow, Wix, and more.",
  alternates: { canonical: "https://www.inspectflux.com/services" },
  openGraph: {
    title: "SEO Fix Services — InspectFlux",
    description: "Done-for-you SEO fixes starting from $99. Contact us for a quote.",
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
          Done-for-you SEO fixes
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: t.textPrimary }}>
          We fix the issues. You focus on your business.
        </h1>
        <p style={{ fontSize: 15, color: t.textSecondary, lineHeight: 1.7 }}>
          Run a free audit to find what&apos;s holding your site back, then contact us and we&apos;ll give you a quote to fix it. Starting from as low as $99.
        </p>
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
          WordPress, Shopify, Webflow, Wix, Squarespace, Magento, BigCommerce, Framer, custom-built sites, and more. If it has a URL, we can fix it.
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
          Pricing depends on the complexity of the fixes. Run a free audit first, then contact us and we&apos;ll review your report and send you a quote.
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
