import Layout from '@/components/Layout/Layout';
import Section from '@/components/ui/section';
import ProductListClient from '../products/ProductListClient';
import { setRequestLocale } from "next-intl/server";
import { generateMetadata as generatePageMetadata } from "@/lib/metadata";
import { createCollectionPageSchema, attachSchemaToMetadata } from "@/lib/metadata-schemas";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import { getTranslations } from "next-intl/server";
import { Link } from '@/i18n/routing';
import ProductsHero from '@/components/ui/products-hero';
import CTASection from '@/components/ui/cta-section';
import { Zap, Target, Shield, HeadphonesIcon } from 'lucide-react';
import { Suspense } from 'react';

export const generateMetadata = async (
  props: { params: Promise<{ locale: string }> }
) => {
  const params = await props.params;

  const baseMetadata = await generatePageMetadata({
    params,
    namespace: "Metadata",
    path: "products"
  });

  const productCollectionSchema = createCollectionPageSchema({
    name: baseMetadata.title as string,
    description: baseMetadata.description,
    url: `${SITE_URL}/products`,
    siteUrl: SITE_URL,
    siteName: SITE_NAME
  });

  return attachSchemaToMetadata(baseMetadata, productCollectionSchema);
};

export default async function Products({ params }: {params: Promise<{ locale: string }> }) {
   const {locale} = await params;

  setRequestLocale(locale);
  const t = await getTranslations({locale});

  // Features data
  const features = [
    {
      icon: Zap,
      title: t('chooseTeclis.p1.title'),
      description: t('chooseTeclis.p1.description'),
    },
    {
      icon: Target,
      title: t('chooseTeclis.p2.title'),
      description: t('chooseTeclis.p2.description'),
    },
    {
      icon: Shield,
      title: t('chooseTeclis.p3.title'),
      description: t('chooseTeclis.p3.description'),
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <ProductsHero locale={locale} />

      {/* Products Grid Section */}
      <Section 
        headingLevel="h2"
        id="products-grid"
        background="default"
      >
        <Suspense fallback={<div className="animate-pulse h-64 bg-secondary/50 rounded-2xl" />}>
          <ProductListClient />
        </Suspense>
      </Section>

      {/* Why Choose Teclis Section */}
      <Section
        headingLevel="h2"
        background="mesh"
        decorated
        subtitle={t('chooseTeclis.subtitle')}
        title={t('chooseTeclis.title')}
        description={t('chooseTeclis.description')}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="group relative p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/20 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5"
              >
                {/* Gradient hover effect */}
                <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-linear-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Support Banner */}
      <Section
        headingLevel="h2"
        background="muted"
        compact
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 rounded-2xl bg-linear-to-r from-primary/5 via-accent/5 to-primary/5 border border-border/50">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <HeadphonesIcon className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">{t("products.support.title")}</h3>
              <p className="text-muted-foreground text-sm">{t("products.support.description")}</p>
            </div>
          </div>
          <Link 
            href="/contact" 
            locale={locale} 
            className="btn-hero whitespace-nowrap"
          >
            {t('cta.contact')}
          </Link>
        </div>
      </Section>

      {/* CTA Section */}
      <CTASection locale={locale} />
    </Layout>
  );
};
