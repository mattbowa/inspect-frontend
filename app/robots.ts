import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/manage', '/history', '/signup', '/success'],
    },
    sitemap: 'https://www.inspectflux.com/sitemap.xml',
  }
}
