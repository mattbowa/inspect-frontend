import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about InspectFlux — how the audit works, what we check, automated monitoring, our fix services, and billing.",
  alternates: { canonical: "https://www.inspectflux.com/faq" },
  openGraph: {
    title: "FAQ — InspectFlux",
    description: "Common questions about InspectFlux SEO auditing, monitoring, and services.",
    url: "https://www.inspectflux.com/faq",
  },
}

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
