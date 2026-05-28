import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the InspectFlux team for support, billing questions, or to get a quote on fixing your SEO issues.",
  alternates: { canonical: "https://www.inspectflux.com/contact" },
  openGraph: {
    title: "Contact — InspectFlux",
    description: "Get in touch for support, billing, or an SEO fix quote.",
    url: "https://www.inspectflux.com/contact",
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
