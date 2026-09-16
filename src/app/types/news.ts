import { createClient } from '@sanity/client'

const sanityClient = createClient({
  projectId: 't72u1s0s',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

export interface Article {
  title: string
  category: string
  date?: string
  readTime?: string
  media?: string
  excerpt?: string
  pdfurl?: string
  slug?: string
}

// Static fallback articles (used when Sanity is empty or unavailable)
export const articles: Article[] = [
  {
    title: "Newsletter August 2025",
    excerpt: "For many researchers, analyzing foams under pressure remains a challenge, often requiring complex and costly laboratory equipment. The FOAMSCAN™ High Temperature–Mid Pressure provides a practical, affordable and science-based solution, enabling foam analysis at temperatures up to 120 °C and pressures up to 8 bar.",
    category: "newsletter",
    date: "2025-08-17",
    readTime: "1 min read",
    pdfurl: "/pdf/TECLIS Newsletter 2025-08.pdf",
  },
  {
    title: "Breakthrough in Foam Stability Research Published in Nature",
    excerpt: "Teclis instruments contribute to groundbreaking research on foam stability mechanisms, published in Nature Materials.",
    category: "scientific_papers",
    date: "2024-03-10",
    readTime: "8 min read",
  },
  {
    title: "Teclis Scientific at European Colloid & Interface Society Conference",
    excerpt: "Join us at ECIS 2024 in Barcelona where we'll showcase our latest innovations and present cutting-edge research.",
    category: "events",
    date: "2024-03-05",
    readTime: "3 min read",
  },
  {
    title: "Partnership with Leading Pharmaceutical Company Announced",
    excerpt: "Major pharmaceutical company selects Teclis instruments for their global research and development operations.",
    category: "company",
    date: "2024-02-28",
    readTime: "4 min read",
  },
  {
    title: "New Application Note: Surface Tension in Food Emulsions",
    excerpt: "Comprehensive guide to measuring and optimizing surface tension in food emulsion systems for better product stability.",
    category: "scientific_papers",
    date: "2024-02-20",
    readTime: "6 min read",
  },
  {
    title: "FOAMSCAN™ Software Update: Enhanced Analysis Capabilities",
    excerpt: "Latest software update includes advanced foam characterization algorithms and improved user interface design.",
    category: "newsletter",
    date: "2024-02-15",
    readTime: "4 min read",
  },
  {
    title: "Teclis Scientific Wins Innovation Award at Analytica 2024",
    excerpt: "Our RHEOSCAN™ Interface Rheometer recognized for outstanding innovation in analytical instrumentation.",
    category: "company",
    date: "2024-02-10",
    readTime: "3 min read",
  },
  {
    title: "Webinar Series: Advanced Interface Science Techniques",
    excerpt: "Join our monthly webinar series featuring expert presentations on cutting-edge interface science applications.",
    category: "events",
    date: "2024-02-01",
    readTime: "2 min read",
  },
  {
    title: "How to measure the interfacial properties of solid oils with TRACKER™",
    excerpt: "TRACKER™ enables accurate surface-tension measurements of solidifying oils by heating syringe and needle to maintain liquid state during analysis.",
    category: "application_notes",
    date: "2024-01-15",
    readTime: "5 min",
  },
  {
    title: "Characterizing foams produced by an external device",
    excerpt: "FOAMSCAN™ analyzes foam from dispensers by quantifying liquid fraction and bubble-size distribution for hands-disinfectant applications.",
    category: "application_notes",
    date: "2023-06-01",
    readTime: "4 min",
  },
  {
    title: "The influence of experiment settings on foaming capacity",
    excerpt: "Gas-flow rate, frit porosity, stirring speed, and liquid volume strongly influence foaming time and wetness in FOAMSCAN™ measurements.",
    category: "application_notes",
    date: "2023-03-15",
    readTime: "6 min",
    media: "/images/articles-img/2022AN5_impact.avif",
  },
  {
    title: "Standard error: five reasons you should check the drop profile",
    excerpt: "Residual-pattern analysis in TRACKER™ reveals non-Laplacian drops caused by vibrations, bubbles, dust, interfacial films, or moving contours.",
    category: "application_notes",
    date: "2022-11-20",
    readTime: "5 min",
    media: "/images/articles-img/2022AN4_Standard-error.avif",
  },
]

export async function getSanityArticles() {
  try {
    const results = await sanityClient.fetch(
      `*[_type == "post" && publishedAt <= $now] | order(publishedAt desc) {
        title,
        "slug": slug.current,
        excerpt,
        "category": category,
        "date": publishedAt,
        readTime,
        media,
        pdfurl,
      }`,
      { now: new Date().toISOString() }
    )
    return results || []
  } catch {
    return []
  }
}

export async function getAllArticles(): Promise<Article[]> {
  const sanityList = await getSanityArticles()
  if (sanityList && sanityList.length > 0) {
    return sanityList
  }
  return articles
}
