"use client"
import { useState, useMemo, useCallback } from "react"
import ProductCard from "@/components/ui/product-card"
import CategoryFilter from "@/components/ui/category-filter"
import BrochureModal from "@/components/ui/brochure-modal"
import { useTranslations } from "next-intl"
import { useSearchParams, useRouter, usePathname } from "next/navigation"

const CATEGORY_ALIASES: Record<string, string> = {
  surface: "tension",
  rheometers: "rheology",
}

type Product = {
  productKey: string
  title: string
  description: string
  features: string[]
  image?: string
  video?: string
  pdfUrl?: string
  path: string
  price?: string
  category?: string
}

interface ProductListClientProps {
  initialProducts?: Product[]
}

export default function ProductListClient({ initialProducts = [] }: ProductListClientProps) {
  const t = useTranslations()
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const [activeCategory, setActiveCategory] = useState<string>(() => {
    const urlCategory = searchParams.get("category")
    if (!urlCategory) return "all"
    return CATEGORY_ALIASES[urlCategory] || urlCategory
  })

  const [brochureModalOpen, setBrochureModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const handleDownload = useCallback((product: Product) => {
    setSelectedProduct(product)
    setBrochureModalOpen(true)
  }, [])

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category)
    const params = new URLSearchParams(searchParams.toString())
    if (category === "all") {
      params.delete("category")
    } else {
      const originalCategory = Object.entries(CATEGORY_ALIASES)
        .find(([, alias]) => alias === category)?.[0] || category
      params.set("category", originalCategory)
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }, [searchParams, router, pathname])

  const normalizedProducts = useMemo(() => {
    return initialProducts as Product[]
  }, [initialProducts])

  const filteredProducts = useMemo(() => {
    if (!activeCategory || activeCategory === "all") return normalizedProducts

    const categoryMap: Record<string, string> = {
      trackerTensiometer: "tension",
      foamscan: "foam",
      bubbleStatistics: "rheology",
      foamscanHTMP: "tension",
      trackerHTHP: "accessories",
      jetscan: "tension",
    }

    return normalizedProducts.filter(product => {
      const productCategory = product.category ?? categoryMap[product.productKey] ?? ''
      return productCategory === activeCategory
    })
  }, [activeCategory, normalizedProducts])

  return (
    <>
      <div className="space-y-12">
        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {t("products.page.showing", { count: filteredProducts.length })}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product: Product) => (
            <div
              key={product.productKey}
              className="animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              <ProductCard
                title={product.title}
                description={product.description}
                features={product.features}
                price={product.price}
                image={product.image || undefined}
                video={product.video || undefined}
                to={product.path || undefined}
                onDownload={() => handleDownload(product)}
                productKey={product.productKey}
              />
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
              <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {t("products.page.noResults.title")}
            </h3>
            <p className="text-muted-foreground">
              {t("products.page.noResults.description")}
            </p>
          </div>
        )}
      </div>

      <BrochureModal
        open={brochureModalOpen}
        onOpenChange={setBrochureModalOpen}
        productName={selectedProduct?.title ?? ''}
        instrumentName={selectedProduct?.title ?? ''}
        productKey={selectedProduct?.productKey ?? ''}
      />
    </>
  )
}
