import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Pricing",
  description: "Start free, upgrade for full-site scanning and automated monitoring. Business from $49/month, Enterprise from $149/month.",
  alternates: { canonical: "https://www.inspectflux.com/pricing" },
  openGraph: {
    title: "Pricing — InspectFlux",
    description: "Start free. Business from $49/mo, Enterprise from $149/mo.",
    url: "https://www.inspectflux.com/pricing",
  },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
