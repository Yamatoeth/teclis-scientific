"use client";
import { ArrowRight, Download, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from '@/i18n/routing';
import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

interface ProductCardProps {
  productKey: string;
  title: string;
  description: string;
  image?: string;
  video?: string;
  features?: string[];
  price?: string;
  badge?: string;
  href?: string;
  to?: string;
  onDownload?: () => void;
}

const ProductCard = ({ 
  productKey,
  title, 
  description: _description, 
  image,
  video,
  features,
  price,
  badge,
  href: _href,
  to,
  onDownload
}: ProductCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      el.classList.remove("opacity-0", "translate-y-8");
    });
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const t = useTranslations();

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative cursor-pointer flex flex-col h-full opacity-0 translate-y-8 transition-all duration-700 ease-out"
    >
      {/* Make entire card clickable via Link, except the PDF button */}
      {to && (
        <Link
          href={to}
          className="absolute inset-0 z-10"
          aria-label={`${t(`productsOverview.${productKey}.title`)} - ${t("learnMore")}`}
        >
          <div className="w-full h-full" />
        </Link>
      )}

      {/* Glow effect on hover */}
      <div 
        className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, hsl(var(--primary) / 0.15), transparent 40%)`,
        }}
      />

      {/* Card container with glass morphism */}
      <div className="relative bg-card/80 backdrop-blur-sm rounded-3xl border border-border/50 overflow-hidden h-full flex flex-col transition-all duration-500 group-hover:border-primary/20 group-hover:shadow-xl group-hover:shadow-primary/5">
        {/* Gradient border effect */}
        <div className="absolute inset-0 rounded-3xl p-px bg-linear-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        {/* Inner content */}
        <div className="relative p-6 flex flex-col h-full">
          {/* Image container */}
          <div className="relative w-full aspect-4/3 mb-6 rounded-2xl overflow-hidden bg-linear-to-br from-secondary/30 to-secondary/10">
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
            
            {video ? (
              <video
                src={video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 rounded-2xl"
              />
            ) : image ? (
              <Image
                src={image}
                alt={title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw, "
                className="object-cover transition-transform duration-700 group-hover:scale-105 rounded-2xl"
              />
            ) : null}

            {/* Badge */}
            {badge && (
              <div className="absolute top-4 left-4">
                <Badge className="bg-linear-to-r from-primary to-accent text-white border-0 shadow-lg shadow-primary/25 flex items-center gap-1.5">
                  <Sparkles size={12} />
                  {badge}
                </Badge>
              </div>
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-card/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Content area */}
          <div className="flex-1 flex flex-col space-y-4">
            {/* Title */}
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                {t(`productsOverview.${productKey}.title`)}
              </h3>
              <p className="text-muted-foreground leading-relaxed line-clamp-2">
                {t(`productsOverview.${productKey}.description`)}
              </p>
            </div>

            {/* Features */}
            {features && features.length > 0 && (
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-semibold text-primary/80 uppercase tracking-wider">
                  {t("keyFeatures")}
                </h4>
                <ul className="space-y-1.5">
                  {features.slice(0, 3).map((feature, index) => (
                    <li 
                      key={index} 
                      className="text-sm text-muted-foreground flex items-center gap-2 group/item"
                      style={{ transitionDelay: `${index * 50}ms` }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-linear-to-r from-primary to-accent shrink-0 group-hover/item:scale-125 transition-transform" />
                      <span className="group-hover/item:text-foreground transition-colors">
                        {t(`productsOverview.${productKey}.features.${index}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Price indicator */}
          {price && (
            <div className="text-lg font-semibold text-primary mt-4 flex items-center gap-2">
              <span>{t("ContactforQuote")}</span>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-2 pt-4 mt-auto">
            {to && (
              <Button
                variant="ghost"
                size="sm"
                className="flex-1 group/btn relative inline-flex items-center justify-center rounded-xl border-2 border-primary/30 px-4 py-3 text-primary font-medium overflow-hidden transition-all duration-300 hover:border-primary hover:text-white hover:shadow-lg hover:shadow-primary/20"
                asChild
              >
                <Link href={to} className="relative flex items-center gap-2 text-sm w-full">
                  {/* Button gradient fill */}
                  <div className="absolute inset-0 bg-linear-to-r from-primary to-accent translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                  <span className="relative flex items-center gap-2 text-sm">
                    {t("learnMoreAbout")} {t(`productsOverview.${productKey}.title`)}
                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </Button>
            )}
            
            {onDownload && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card navigation
                  onDownload();
                }}
                className="text-primary hover:text-primary-hover hover:bg-primary/10 rounded-xl"
              >
                <Download size={16} className="mr-2" />
                PDF
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
