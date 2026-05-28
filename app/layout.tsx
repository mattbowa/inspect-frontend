import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://www.inspectflux.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "InspectFlux — Free SEO Audit Tool",
    template: "%s — InspectFlux",
  },
  description: "Run a free SEO audit on any website. 18+ automated checks covering technical health, broken links, canonical tags, structured data, and more. Get an AI-powered action plan in minutes.",
  keywords: ["SEO audit", "SEO checker", "technical SEO", "site audit", "SEO tool", "broken links", "meta tags"],
  authors: [{ name: "InspectFlux" }],
  creator: "InspectFlux",
  openGraph: {
    type: "website",
    siteName: "InspectFlux",
    title: "InspectFlux — Free SEO Audit Tool",
    description: "Run a free SEO audit on any website. 18+ automated checks, AI-powered action plan.",
    url: BASE_URL,
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    title: "InspectFlux — Free SEO Audit Tool",
    description: "Run a free SEO audit on any website. 18+ automated checks, AI-powered action plan.",
  },
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
