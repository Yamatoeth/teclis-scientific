"use client";
import Image from 'next/image';
import { Link, usePathname } from '@/i18n/routing'
import { MapPin, Phone, Mail, Linkedin, ArrowUpRight, Globe, Youtube } from 'lucide-react';
import { useTranslations } from "next-intl";


const FooterLink = ({ href, children, external = false }: { href: string; children: React.ReactNode; external?: boolean }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  if (external) {
    return (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="group flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors duration-200"
      >
        <span className="relative">
          {children}
          <span className="absolute bottom-0 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
        </span>
        <ArrowUpRight size={12} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
      </a>
    );
  }

  return (
    <Link 
      href={href} 
      className={`group relative inline-block ${isActive ? 'text-foreground font-medium' : 'text-muted-foreground'} hover:text-foreground transition-colors duration-200`}
    >
      <span className="relative">
        {children}
        <span className={`absolute bottom-0 left-0 h-px bg-accent transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
      </span>
    </Link>
  );
};

const Footer = () => {
  const t = useTranslations();

  return (
    <footer className="relative bg-linear-to-b from-background via-secondary/30 to-secondary/50 border-t border-border/50">
      {/* Decorative top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-accent/50 to-transparent" />
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }} />
      </div>

      <div className="container relative py-16 lg:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Company Info - Takes more space */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-4">
              <Image
                src="/images/logo.webp"
                alt="Teclis Scientific Logo"
                width={120}
                height={30}
                quality={60}
                className="h-10 w-auto object-contain"
              />
              <div className="h-8 w-px bg-border" />
              <Image
                src="/images/logoara.avif"
                alt="Auvergne Rhone Alpes Logo"
                width={130}
                height={32}
                quality={60}
                className="h-7 w-auto object-contain opacity-70"
              />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              {t("footer.companyDescription")}
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a 
                href="https://www.linkedin.com/company/teclis-scientific" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-10 h-10 rounded-full border border-border/50 bg-background/50 hover:border-accent/50 hover:bg-accent/10 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} className="text-muted-foreground group-hover:text-accent transition-colors" />
              </a>
              <a 
                href="https://www.youtube.com/@TeclisScientific" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-10 h-10 rounded-full border border-border/50 bg-background/50 hover:border-accent/50 hover:bg-accent/10 transition-all duration-300"
                aria-label="YouTube"
              >
                <Youtube size={18} className="text-muted-foreground group-hover:text-accent transition-colors" />
              </a>
              <a 
                href="#"
                className="group relative flex items-center justify-center w-10 h-10 rounded-full border border-border/50 bg-background/50 hover:border-accent/50 hover:bg-accent/10 transition-all duration-300"
                aria-label="Website"
              >
                <Globe size={18} className="text-muted-foreground group-hover:text-accent transition-colors" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              {t("footer.products.title")}
            </h3>
            <nav className="flex flex-col gap-3 text-sm">
              <FooterLink href="/products">
                {t("footer.products.all")}
              </FooterLink>
              <FooterLink href="/products?category=tension">
                {t("footer.products.surface")}
              </FooterLink>
              <FooterLink href="/products?category=foam">
                {t("footer.products.foam")}
              </FooterLink>
              <FooterLink href="/products?category=rheology">
                {t("footer.products.rheometers")}
              </FooterLink>
            </nav>
          </div>

          {/* Company */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              {t("footer.company.title")}
            </h3>
            <nav className="flex flex-col gap-3 text-sm">
              <FooterLink href="/about">
                {t("footer.company.about")}
              </FooterLink>
              <FooterLink href="/news">
                {t("footer.company.news")}
              </FooterLink>
              <FooterLink href="/careers">
                {t("footer.company.careers")}
              </FooterLink>
              <FooterLink href="/contact">
                {t("footer.company.support")}
              </FooterLink>
            </nav>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              {t("footer.contact.title")}
            </h3>
            <div className="space-y-4 text-sm">
              <div className="group flex items-start gap-3 p-3 rounded-lg hover:bg-accent/5 transition-colors cursor-default">
                <div className="shrink-0 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                  <MapPin size={14} className="text-accent" />
                </div>
                <span className="text-muted-foreground leading-relaxed pt-1">
                  {t("footer.contact.address")}
                </span>
              </div>
              <div className="group flex items-center gap-3 p-3 rounded-lg hover:bg-accent/5 transition-colors cursor-pointer">
                <div className="shrink-0 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                  <Phone size={14} className="text-accent" />
                </div>
                <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                  {t("footer.contact.phone")}
                </span>
              </div>
              <a href={`mailto:${t("footer.contact.email")}`} className="group flex items-center gap-3 p-3 rounded-lg hover:bg-accent/5 transition-colors">
                <div className="shrink-0 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                  <Mail size={14} className="text-accent" />
                </div>
                <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                  {t("footer.contact.email")}
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative mt-16 pt-8">
          {/* Separator with gradient */}
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              {t("footer.legal.copyright")}
            </p>
            <nav className="flex flex-wrap items-center gap-6 text-sm">
              <Link 
                href="/legal/privacy-policy" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("footer.legal.privacy")}
              </Link>
              <span className="text-border">•</span>
              <Link 
                href="/legal/terms" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("footer.legal.terms")}
              </Link>
              <span className="text-border">•</span>
              <Link 
                href="/legal/cookies" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("footer.legal.cookies")}
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
