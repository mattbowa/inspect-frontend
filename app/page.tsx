import type { Metadata } from 'next';
import { ScanForm } from './components/scan/ScanForm';
import { t } from './theme';

export const metadata: Metadata = {
  title: "InspectFlux — Free SEO Audit Tool | AI-Powered Site Analysis",
  description: "Run a free SEO audit on any website. 18+ automated checks covering technical health, HTTPS, robots.txt, broken links, canonical tags, structured data, and more. Get a prioritised action plan in minutes.",
  alternates: { canonical: "https://www.inspectflux.com" },
  openGraph: {
    title: "InspectFlux — Free SEO Audit Tool",
    description: "18+ automated SEO checks and an AI-powered action plan. Free to start.",
    url: "https://www.inspectflux.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "InspectFlux",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "description": "AI-powered SEO auditing tool. Run 18+ automated checks and get a prioritised action plan.",
  "url": "https://www.inspectflux.com",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "Free plan available. Paid plans from $9.99/month.",
  },
  "creator": {
    "@type": "Organization",
    "name": "InspectFlux",
    "url": "https://www.inspectflux.com",
  },
};

const features = [
  { icon: '⟨/⟩', label: 'Meta tags', description: 'Controls your search snippet — bad titles kill click-through rates.' },
  { icon: '≡', label: 'Heading structure', description: 'Signals page hierarchy to Google and keeps readers on your page.' },
  { icon: '⬚', label: 'Image SEO', description: 'Missing alt text means Google can\'t index your images.' },
  { icon: '⊞', label: 'Structured data', description: 'Unlocks rich snippets — stars, prices, FAQs — in search results.' },
  { icon: '✦', label: 'Content quality', description: 'Thin content gets demoted. We flag pages that won\'t compete.' },
  { icon: '⇄', label: 'Internal linking', description: 'Spreads authority across your site and helps Google find every page.' },
  { icon: '◎', label: 'Canonical tags', description: 'Prevents duplicate content from splitting your ranking power.' },
  { icon: '◈', label: 'Open Graph', description: 'Controls how your pages look when shared — drives referral traffic.' },
  { icon: '⊘', label: 'Noindex detection', description: 'Catches pages accidentally hidden from Google\'s index.' },
  { icon: '⟳', label: 'Redirect chains', description: 'Each extra hop slows load time and bleeds link authority.' },
  { icon: '◉', label: 'Orphan pages', description: 'No inbound links means Google may never find the page.' },
  { icon: '↗', label: 'Broken ext. links', description: 'Dead outbound links signal poor maintenance and hurt credibility.' },
];

const steps = [
  {
    number: '01',
    title: 'Enter your URL',
    description: 'Paste any website URL — no account or setup required.',
  },
  {
    number: '02',
    title: 'We scan your site',
    description:
      'Our AI agents crawl your pages and check technical health, content quality, and link structure.',
  },
  {
    number: '03',
    title: 'Get your action plan',
    description:
      'Receive an SEO score and a prioritised list of fixes ranked by impact.',
  },
];

export default function Home() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <main
      className="min-h-screen flex flex-col items-center px-4 py-16 sm:px-6"
      style={{
        background: `radial-gradient(ellipse 100% 55% at 50% 0%, rgba(99, 102, 241, 0.13) 0%, transparent 70%)`,
      }}
    >
      {/* Hero */}
      <div className="w-full max-w-3xl flex flex-col items-center text-center mb-10">
        <div
          className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs mb-6"
          style={{
            border: `1px solid ${t.border}`,
            background: 'rgba(79, 70, 229, 0.1)',
            color: t.info,
          }}
        >
          AI-powered SEO auditing
        </div>
        <h1
          className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-4 text-balance"
          style={{ color: t.textPrimary }}
        >
          Find what&apos;s holding your<br />
          <span style={{ color: t.accent }}>SEO back</span>
        </h1>
        <p className="w-full max-w-2xl text-left" style={{ color: t.textSecondary, lineHeight: 1.7 }}>
          93% of online experiences start with a search engine. If search engines can&apos;t crawl, understand, or trust your site, they won&apos;t rank it — no matter how good your content is. We find exactly what&apos;s in the way.
        </p>
      </div>

      {/* How it works */}
      <div className="mt-10 w-full max-w-2xl">
        <p
          className="text-center text-xs font-semibold uppercase tracking-widest mb-8"
          style={{ color: t.textMuted }}
        >
          How it works
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-xl p-5"
              style={{ border: `1px solid ${t.border}`, background: t.surface }}
            >
              <span
                className="text-xs font-bold"
                style={{ color: t.accent, letterSpacing: '0.08em' }}
              >
                {step.number}
              </span>
              <p
                className="mt-2 font-semibold text-sm"
                style={{ color: t.textPrimary }}
              >
                {step.title}
              </p>
              <p
                className="mt-1 text-xs leading-relaxed"
                style={{ color: t.textSecondary }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scan form + results */}
      <div className="mt-10 w-full max-w-2xl">
        <ScanForm />
      </div>

      {/* What we analyse */}
      <div className="mt-20 w-full max-w-3xl">
        <p
          className="text-center text-xs font-semibold uppercase tracking-widest mb-4"
          style={{ color: t.textMuted }}
        >
          What we analyse
        </p>
        <p className="text-center mb-3" style={{ fontSize: 22, fontWeight: 700, color: t.textPrimary }}>
          Technical issues are invisible — until they tank your rankings
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {features.map((f) => (
            <div
              key={f.label}
              className="flex flex-col rounded-xl p-3"
              style={{ border: `1px solid ${t.border}`, background: t.surface, gap: 4 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 14, color: t.accent }}>{f.icon}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: t.textPrimary }}>
                  {f.label}
                </span>
              </div>
              <span style={{ fontSize: 11, color: t.textMuted, lineHeight: 1.5 }}>
                {f.description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
    </>
  );
}
