"use client";
import { ArrowRight, Users, Mail, GraduationCap, DollarSign, Heart, Briefcase, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout/Layout';
import Section from '@/components/ui/section';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const Careers = () => {
  const t = useTranslations();

  return (
    <Layout>
      {/* Hero Section */}
      <Section
        subtitle={t("careers.hero.subtitle")}
        title={t("careers.hero.title")}
        description={t("careers.hero.description")}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-8">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-linear-to-r from-primary to-accent flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{t("careers.hero. badge")}</h3>
                <p className="text-sm text-muted-foreground">{t("careers.hero.since")}</p>
              </div>
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("careers.hero.descriptionFull")}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button size="lg" asChild className="bg-linear-to-r from-primary to-accent text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl px-6 group">
                <a href={`mailto:contact@teclis-scientific.com?subject=${encodeURIComponent(t("careers.joinUsSubject"))}`}>
                  {t("careers.joinUs")}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button variant="outline" size="lg" className="rounded-xl px-6 border-2" asChild>
                <a href="#open-positions">
                  {t("careers.viewPositions")}
                </a>
              </Button>
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/images/career.png"
              alt={t("careers.hero.imageAlt")}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-tr from-primary/10 to-accent/10" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-linear-to-br from-primary to-accent rounded-2xl opacity-20 blur-xl" />
          </div>
        </div>
      </Section>

      {/* Open Positions */}
      <Section id="open-positions" background="muted">
        <div className="text-center mb-12">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-linear-to-r from-primary/10 to-accent/10 text-primary border border-primary/20 mb-6">
            <Briefcase className="w-4 h-4 mr-2" />
            {t("careers.openPositions.badge")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("careers.openPositions.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("careers.openPositions.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* R&D Engineer Position */}
          <div className="group bg-card rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <Badge variant="outline" className="text-primary border-primary px-3 py-1">
                  {t("careers.positions.rd.department")}
                </Badge>
                <Badge className="bg-primary/10 text-primary border-0 mt-2">
                  {t("careers.positions.rd.type")}
                </Badge>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {t("careers.positions.rd.title")}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t("careers.positions.rd.location")}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {t("careers.positions.rd.description")}
            </p>
            <div className="space-y-2">
              <p className="text-xs font-medium text-foreground uppercase tracking-wider">{t("careers.positions.requirements")}:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                {t("careers.positions.rd.requirements").split("\n").map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    {req.trim()}
                  </li>
                ))}
              </ul>
            </div>
            <Button className="mt-4 w-full group" asChild>
              <a href={`mailto:contact@teclis-scientific.com?subject=${encodeURIComponent(t("careers.applySubject", { position: t("careers.positions.rd.title") }))}&body=${encodeURIComponent(t("careers.applyBody"))}`}>
                {t("careers.applyButton")}
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>

          {/* Technical Sales Engineer Position */}
          <div className="group bg-card rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <Badge variant="outline" className="text-primary border-primary px-3 py-1">
                  {t("careers.positions.sales.department")}
                </Badge>
                <Badge className="bg-accent/10 text-accent border-0 mt-2">
                  {t("careers.positions.sales.type")}
                </Badge>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {t("careers.positions.sales.title")}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t("careers.positions.sales.location")}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {t("careers.positions.sales.description")}
            </p>
            <div className="space-y-2">
              <p className="text-xs font-medium text-foreground uppercase tracking-wider">{t("careers.positions.requirements")}:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                {t("careers.positions.sales.requirements").split("\n").map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                    {req.trim()}
                  </li>
                ))}
              </ul>
            </div>
            <Button className="mt-4 w-full group" asChild>
              <a href={`mailto:contact@teclis-scientific.com?subject=${encodeURIComponent(t("careers.applySubject", { position: t("careers.positions.sales.title") }))}&body=${encodeURIComponent(t("careers.applyBody"))}`}>
                {t("careers.applyButton")}
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>

          {/* Support Specialist Position */}
          <div className="group bg-card rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <Badge variant="outline" className="text-primary border-primary px-3 py-1">
                  {t("careers.positions.support.department")}
                </Badge>
                <Badge className="bg-emerald-500/10 text-emerald-600 border-0 mt-2">
                  {t("careers.positions.support.type")}
                </Badge>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {t("careers.positions.support.title")}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t("careers.positions.support.location")}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {t("careers.positions.support.description")}
            </p>
            <div className="space-y-2">
              <p className="text-xs font-medium text-foreground uppercase tracking-wider">{t("careers.positions.requirements")}:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                {t("careers.positions.support.requirements").split("\n").map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    {req.trim()}
                  </li>
                ))}
              </ul>
            </div>
            <Button className="mt-4 w-full group" asChild>
              <a href={`mailto:contact@teclis-scientific.com?subject=${encodeURIComponent(t("careers.applySubject", { position: t("careers.positions.support.title") }))}&body=${encodeURIComponent(t("careers.applyBody"))}`}>
                {t("careers.applyButton")}
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </div>

        {/* Unsolicited Applications */}
        <div className="text-center mt-12 p-8 rounded-2xl bg-linear-to-r from-primary/5 via-accent/5 to-primary/5 border border-border/50">
          <Mail className="w-8 h-8 mx-auto mb-4 text-primary" />
          <h3 className="text-lg font-semibold text-foreground mb-2">{t("careers.unsolicited.title")}</h3>
          <p className="text-sm text-muted-foreground mb-4 max-w-lg mx-auto">
            {t("careers.unsolicited.description")}
          </p>
          <Button variant="outline" size="lg" asChild className="rounded-xl border-2">
            <a href={`mailto:contact@teclis-scientific.com?subject=${encodeURIComponent(t("careers.unsolicited.subject"))}`}>
              <span className="flex items-center gap-2">
                <Mail size={16} />
                {t("careers.unsolicited.button")}
              </span>
            </a>
          </Button>
        </div>
      </Section>

      {/* Company Culture */}
      <Section background="gray">
        <div className="text-center mb-12">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-linear-to-r from-primary/10 to-accent/10 text-primary border border-primary/20 mb-6">
            <Heart className="w-4 h-4 mr-2" />
            {t("careers.culture.badge")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("careers.culture.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("careers.culture.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
          <div className="space-y-6">
            <div className="card-premium">
              <h3 className="text-lg font-semibold text-foreground mb-3">{t("careers.culture.title")}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("careers.culture.description")}
              </p>
            </div>
            
            <div className="card-premium">
              <h3 className="text-lg font-semibold text-foreground mb-3">{t("careers.culture.values.title")}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("careers.culture.values.description")}
              </p>
            </div>
            
            <div className="card-premium">
              <h3 className="text-lg font-semibold text-foreground mb-3">{t("careers.culture.mission.title")}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("careers.culture.mission.description")}
              </p>
            </div>
          </div>
          
          <div className="relative aspect-square rounded-xl overflow-hidden">
            <Image
              src="/images/career.png"
              alt={t("careers.culture.imageAlt")}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-accent/10" />
            <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-white font-semibold">{t("careers.culture.teamSize")}</p>
              <p className="text-white/80 text-sm">{t("careers.culture.teams")}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Perks & Benefits */}
      <Section background="gradient">
        <div className="text-center mb-12">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 text-foreground border border-white/20 mb-6">
            <DollarSign className="w-4 h-4 mr-2" />
            {t("careers.perks.badge")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("careers.perks.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("careers.perks.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="group bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-linear-to-r from-primary to-accent flex items-center justify-center mb-4">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{t("careers.perks.compensation.title")}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("careers.perks.compensation.description")}
            </p>
          </div>
          
          <div className="group bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-linear-to-r from-emerald-500 to-teal-500 flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{t("careers.perks.health.title")}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("careers.perks.health.description")}
            </p>
          </div>
          
          <div className="group bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-linear-to-r from-violet-500 to-purple-500 flex items-center justify-center mb-4">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{t("careers.perks.development.title")}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("careers.perks.development.description")}
            </p>
          </div>
          
          <div className="group bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-linear-to-r from-amber-500 to-orange-500 flex items-center justify-center mb-4">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{t("careers.perks.flexibility.title")}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("careers.perks.flexibility.description")}
            </p>
          </div>
          
          <div className="group bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-linear-to-r from-rose-500 to-pink-500 flex items-center justify-center mb-4">
              <Plane className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{t("careers.perks.travel.title")}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("careers.perks.travel.description")}
            </p>
          </div>
          
          <div className="group bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-linear-to-r from-sky-500 to-blue-500 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{t("careers.perks.environment.title")}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("careers.perks.environment.description")}
            </p>
          </div>
        </div>
      </Section>

      {/* Application Process CTA */}
      <Section>
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-primary to-accent p-8 md:p-12 text-center">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                backgroundSize: "24px 24px",
              }}
            />
          </div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t("careers.applyNow.title")}
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-lg mx-auto">
              {t("careers.applyNow.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg rounded-xl px-8 group" asChild>
                <a href={`mailto:contact@teclis-scientific.com?subject=${encodeURIComponent(t("careers.joinUsSubject"))}`}>
                  {t("careers.applyNow.button")}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 rounded-xl px-8" asChild>
                <a href="/contact">
                  {t("careers.applyNow.secondary")}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
};

export default Careers;
