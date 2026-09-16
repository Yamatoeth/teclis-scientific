import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 't72u1s0s',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // false pour du contenu frais en dev, true en prod
})

// Query helpers

export function productQuery() {
  return `*[_type == "product" && !defined(age)] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    productKey,
    description,
    shortDescription,
    category,
    price,
    "imageUrl": image.asset->url,
    "videoUrl": video.asset->url,
    pdfUrl,
    features,
    specifications,
    applications,
    modules,
    measurementCapabilities,
    heroSubtitle,
    heroHighlights,
  }`
}

export function getProductBySlug(_slug: string) {
  return `*[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    productKey,
    description,
    shortDescription,
    category,
    price,
    "imageUrl": image.asset->url,
    "videoUrl": video.asset->url,
    pdfUrl,
    features,
    specifications,
    applications,
    modules,
    measurementCapabilities,
    heroSubtitle,
    heroHighlights,
  }`
}

export function industryQuery() {
  return `*[_type == "industry" && isActive == true] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    key,
    description,
    "heroImageUrl": heroImage.asset->url,
    accentColor,
    applications,
    benefits,
    "productRefs": products[]->{ _id, name, "slug": slug.current, productKey },
    caseStudy,
  }`
}

export function getIndustryBySlug(_slug: string) {
  return `*[_type == "industry" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    key,
    description,
    "heroImageUrl": heroImage.asset->url,
    accentColor,
    applications,
    benefits,
    "productRefs": products[]->{ _id, name, "slug": slug.current, productKey },
    caseStudy,
  }`
}

export function careerQuery() {
  return `*[_type == "career" && isActive == true] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    department,
    location,
    type,
    level,
    description,
    requirements,
    publishedAt,
  }`
}

export function teamMembersQuery() {
  return `*[_type == "teamMember" && isActive == true] | order(name asc) {
    _id,
    name,
    position,
    bio,
    expertise,
    "photoUrl": photo.asset->url,
    linkedin,
  }`
}

export function partnerQuery() {
  return `*[_type == "partner" && isActive == true] | order(logoVariant asc) {
    _id,
    name,
    "slug": slug.current,
    "logoUrl": logo.asset->url,
    website,
    industry,
    logoVariant,
  }`
}

export function postQuery() {
  return `*[_type == "post" && publishedAt <= $now] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "category": category,
    "publishedAt": publishedAt,
    readTime,
    media,
    pdfurl,
  }`
}
