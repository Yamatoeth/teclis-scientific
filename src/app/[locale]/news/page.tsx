import { setRequestLocale } from 'next-intl/server'
import { createBreadcrumbSchema, attachSchemaToMetadata } from '@/lib/metadata-schemas'
import { SITE_URL } from '@/lib/constants'
import { postQuery } from '@/sanity/client'
import { client } from '@/sanity/client'
import type { SanityPost } from '@/sanity/types'
import NewsClient from './NewsClient'

export const revalidate = 3600

export const generateMetadata = async (
  _props: { params: Promise<{ locale: string }> }
) => {
  const baseMetadata = {
    title: `Actualités & Insights scientifiques | Teclis`,
    description: `Restez informé des dernières news, articles scientifiques, notes d'application et événements de Teclis.`,
  }

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: `${SITE_URL}/` },
    { name: 'News', url: `${SITE_URL}/news` },
  ])

  return attachSchemaToMetadata(baseMetadata, breadcrumbSchema)
}

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale
  setRequestLocale(locale)

  let articles: SanityPost[] = []
  try {
    articles = await client.fetch(postQuery()) as SanityPost[]
  } catch {
    console.warn('Sanity fetch failed, using static fallback')
  }

  return (
    <NewsClient locale={locale} t={(_key: string, _params?: Record<string, unknown>) => _key} initialArticles={articles} />
  )
}
