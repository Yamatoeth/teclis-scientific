"use client";
import { useState, useMemo, useCallback } from "react";
import ProductCard from "@/components/ui/product-card";
import CategoryFilter from "@/components/ui/category-filter";
import BrochureModal from "@/components/ui/brochure-modal";
import { products } from "@/types/products";
import { useTranslations } from "next-intl";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

// Category aliases mapping
const CATEGORY_ALIASES: Record<string, string> = {
  surface: "tension",
  rheometers: "rheology",
};

export default function ProductListClient() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Initialize from URL or default to "all"
  const [activeCategory, setActiveCategory] = useState<string>(() => {
    const urlCategory = searchParams.get("category");
    if (!urlCategory) return "all";
    // Apply alias mapping
    return CATEGORY_ALIASES[urlCategory] || urlCategory;
  });

  const [brochureModalOpen, setBrochureModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);

  // Handle PDF download / brochure request
  const handleDownload = useCallback((product: typeof products[0]) => {
    // PDF files don't exist in public/pdf/, so open the brochure request modal
    setSelectedProduct(product);
    setBrochureModalOpen(true);
  }, []);

  // Update URL when category changes (without page reload)
  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);

    // Build new URL with updated category
    const params = new URLSearchParams(searchParams.toString());
    if (category === "all") {
      params.delete("category");
    } else {
      // Store the original category value (not the alias) in URL for cleaner URLs
      const originalCategory = Object.entries(CATEGORY_ALIASES)
        .find(([, alias]) => alias === category)?.[0] || category;
      params.set("category", originalCategory);
    }

    // Update URL without navigation/reload
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, router, pathname]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return products;
    return products.filter((product) => product.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <div className="space-y-12">
        {/* Category Filter */}
        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Products count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {t("products.page.showing", { count: filteredProducts.length })}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={product.productKey}
              style={{ animationDelay: `${index * 100}ms` }}
              className="animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              <ProductCard
                title={product.title}
                description={product.description}
                features={product.features}
                price={product.price}
                image={product.image}
                video={product.video}
                to={product.path}
                onDownload={() => handleDownload(product)}
                productKey={product.productKey}
              />
            </div>
          ))}
        </div>

        {/* Empty state */}
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

      {/* Brochure Request Modal */}
      <BrochureModal
        open={brochureModalOpen}
        onOpenChange={setBrochureModalOpen}
        productName={selectedProduct?.title}
        instrumentName={selectedProduct?.title}
      />
    </>
  );
}
