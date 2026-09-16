// Types for Sanity data (generated from schema, used by pages)

export interface SanityProduct {
  _id: string
  name: string
  slug: string
  productKey?: string
  description: string
  shortDescription?: string
  category?: string
  price?: string
  imageUrl?: string
  videoUrl?: string
  pdfUrl?: string
  features?: string[]
  specifications?: { parameter: string; value: string }[]
  applications?: { title: string; description: string }[]
  modules?: { title: string; description: string; image?: { asset?: { url: string } } }[]
  measurementCapabilities?: { title: string; description: string }[]
  heroSubtitle?: string
  heroHighlights?: string[]
}

export interface SanityIndustry {
  _id: string
  name: string
  slug: string
  key?: string
  description?: string
  heroImageUrl?: string
  accentColor?: string
  applications?: { title: string; description: string; image?: { asset?: { url: string } } }[]
  benefits?: { title: string; description: string }[]
  productRefs?: { _id: string; name: string; slug: string; productKey?: string }[]
  caseStudy?: string
}

export interface SanityCareer {
  _id: string
  title: string
  slug: string
  department?: string
  location?: string
  type?: string
  level?: string
  description: string
  requirements?: string[]
  publishedAt?: string
}

export interface SanityTeamMember {
  _id: string
  name: string
  position?: string
  bio?: string
  expertise?: string[]
  photoUrl?: string
  linkedin?: string
}

export interface SanityPartner {
  _id: string
  name: string
  slug: string
  logoUrl?: string
  website?: string
  industry?: string
  logoVariant?: number
}

export interface SanityPost {
  _id: string
  title: string
  slug: string
  publishedAt?: string
  excerpt?: string
  body?: unknown // Portable Text blocks
  category?: string
  readTime?: string
  media?: string
  pdfurl?: string
}
