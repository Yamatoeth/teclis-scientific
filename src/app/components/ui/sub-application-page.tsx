"use client";

import { ReactNode } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface Application {
  image: string;
  titleKey: string;
  descriptionKey: string;
}

interface Benefit {
  icon: ReactNode;
  titleKey: string;
  textKey: string;
}

interface Product {
  slug: string;
  label: string;
}

interface SubApplicationPageProps {
  locale: string;
  breadcrumbKey: string;
  heroImage: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  products: Product[];
  applications: Application[];
  benefits: Benefit[];
  accentColor?: string;
}

const SubApplicationPage = ({
  locale,
  breadcrumbKey,
  heroImage,
  badge,
  title,
  subtitle,
  description,
  products,
  applications,
  benefits,
  accentColor = "from-primary to-accent",
}: SubApplicationPageProps) => {
  const t = useTranslations();

  return (
    <div className="min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-6 pt-6 pb-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">{t("nav.home")}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/applications">{t("nav.applications")}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{t(breadcrumbKey)}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Compact Hero Section */}
      <section className="relative py-8 md:py-12 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <Badge
                  variant="outline"
                  className={`px-4 py-1.5 text-sm border-primary/30 bg-linear-to-r ${accentColor} bg-clip-text text-transparent font-medium`}
                >
                  {badge}
                </Badge>
                <p className="text-sm uppercase tracking-wider text-muted-foreground font-medium">
                  {subtitle}
                </p>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  {title}
                </h1>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                {description}
              </p>

              {/* Products Tags */}
              <div className="flex flex-wrap gap-2">
                {products.map((product) => (
                  <Link
                    key={product.slug}
                    href={`/products/${product.slug}`}
                    className="group relative inline-block"
                  >
                    <Badge
                      variant="secondary"
                      className="px-3 py-1.5 bg-secondary/50 hover:bg-primary/10 hover:text-primary hover:border-primary transition-all duration-200 cursor-pointer border-border/50"
                    >
                      {product.label}
                      <ArrowRight size={12} className="ml-1 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-1 transition-all duration-200" />
                    </Badge>
                  </Link>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href="/contact" locale={locale}>
                  <Button
                    size="lg"
                    className={`bg-linear-to-r ${accentColor} text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl px-6 group`}
                  >
                    {t("cta.contact")}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/products" locale={locale}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-xl px-6 border-2"
                  >
                    {t("cta.viewProducts")}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={heroImage}
                  alt={title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-linear-to-tr ${accentColor} opacity-10`} />
              </div>
              {/* Decorative elements */}
              <div className={`absolute -bottom-4 -right-4 w-24 h-24 bg-linear-to-br ${accentColor} rounded-2xl opacity-20 blur-xl`} />
              <div className={`absolute -top-4 -left-4 w-16 h-16 bg-linear-to-br ${accentColor} rounded-full opacity-30 blur-lg`} />
            </div>
          </div>
        </div>
      </section>

      {/* Applications Grid - Compact */}
      <section className="py-12 md:py-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              {t("keyFeatures")}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {applications.slice(0, 4).map((app, index) => (
              <article
                key={index}
                className="group relative bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-border/50"
              >
                {/* Image */}
                <div className="relative h-36 overflow-hidden">
                  <Image
                    src={app.image}
                    alt={t(app.titleKey)}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent`} />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-1 line-clamp-1">
                    {t(app.titleKey)}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {t(app.descriptionKey)}
                  </p>
                </div>

                {/* Hover accent */}
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r ${accentColor} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
              </article>
            ))}
          </div>

          {/* Show more applications if available */}
          {applications.length > 4 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {applications.slice(4).map((app, index) => (
                <article
                  key={index + 4}
                  className="group relative bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-border/50"
                >
                  <div className="relative h-36 overflow-hidden">
                    <Image
                      src={app.image}
                      alt={t(app.titleKey)}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground mb-1 line-clamp-1">
                      {t(app.titleKey)}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {t(app.descriptionKey)}
                    </p>
                  </div>
                  <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r ${accentColor} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Benefits - Inline Compact */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-300"
              >
                <div className={`shrink-0 w-12 h-12 rounded-xl bg-linear-to-br ${accentColor} flex items-center justify-center text-white shadow-lg`}>
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {t(benefit.titleKey)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(benefit.textKey)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Related Links */}
          <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm">
            <span className="text-muted-foreground">{t("cta.relatedLinks") || "Explore more:"}:</span>
            <Link href="/services" locale={locale} className={`font-medium hover:underline text-primary`}>
              {t("nav.services")}
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/about" locale={locale} className={`font-medium hover:underline text-primary`}>
              {t("nav.about")}
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/news" locale={locale} className={`font-medium hover:underline text-primary`}>
              {t("nav.news")}
            </Link>
          </div>
        </div>
      </section>

      {/* Compact CTA */}
      <section className="py-10 md:py-14">
        <div className="container mx-auto px-6">
          <div className={`relative overflow-hidden rounded-2xl bg-linear-to-r ${accentColor} p-8 md:p-10`}>
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                  backgroundSize: "24px 24px",
                }}
              />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {t("cta.title")}
                </h2>
                <p className="text-white/80 max-w-lg">
                  {t("cta.description")}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link href="/contact" locale={locale}>
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90 shadow-lg rounded-xl px-6 group"
                  >
                    {t("cta.contact")}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/news" locale={locale}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/30 text-white hover:bg-white/10 rounded-xl px-6"
                  >
                    {t("cta.buttonCatalog")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubApplicationPage;
