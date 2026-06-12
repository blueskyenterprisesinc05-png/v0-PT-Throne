import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zenithsolar.com'
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/unsubscribed'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
