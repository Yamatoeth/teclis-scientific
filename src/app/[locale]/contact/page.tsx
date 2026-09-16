"use client";
import { useState, useRef } from "react";
import { ArrowRight, Phone, Mail, MapPin, Clock, Send, ChevronRight, Globe, ExternalLink } from 'lucide-react';
import { useSyncExternalStore } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Layout from '@/components/Layout/Layout';
import Section from '@/components/ui/section';
import { useTranslations } from "next-intl";
import { useParams } from 'next/navigation';
import Link from 'next/link';

const Contact = () => {
  const t = useTranslations();
  const params = useParams();
  const locale = params.locale as string;
  const isLoaded = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    type: "general",
    subject: "",
    message: "",
  });
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("loading");
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setFormStatus("success");
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          type: "general",
          subject: "",
          message: "",
        });
        // Reset success message after 5 seconds
        setTimeout(() => setFormStatus("idle"), 5000);
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  const contactMethods = [
    {
      icon: Phone,
      title: t("contact.methods.phone.title"),
      description: t("contact.methods.phone.description"),
      details: '+33 4 74 70 18 51',
      availability: t("contact.methods.phone.availability"),
      action: 'tel:+33474701851',
      color: 'from-blue-600 to-cyan-500',
      bgColor: 'from-blue-600/10 to-cyan-500/10'
    },
    {
      icon: Mail,
      title: t("contact.methods.email.title"),
      description: t("contact.methods.email.description"),
      details: "contact@teclis-scientific.com",
      availability: t("contact.methods.email.availability"),
      action: 'mailto:contact@teclis-scientific.com',
      color: 'from-violet-600 to-purple-500',
      bgColor: 'from-violet-600/10 to-purple-500/10'
    },
    {
      icon: MapPin,
      title: t("contact.methods.location.title") || "Visit Us",
      description: t("contact.methods.location.description") || "Come see our laboratory",
      details: "Civrieux d'Azergues, France",
      availability: "Mon - Fri: 9:00 - 18:00",
      action: 'https://maps.google.com/?q=Teclis+Scientific',
      color: 'from-emerald-600 to-teal-500',
      bgColor: 'from-emerald-600/10 to-teal-500/10'
    },
  ];

  const partners = [
    { name: t("contact.partners.teclis_usa"), url: "https://www.teclisamerica.com/", flag: "🇺🇸" },
    { name: t("contact.partners.brazil"), url: "https://dafratec.com/", flag: "🇧🇷" },
    { name: t("contact.partners.china"), url: "http://www.edcc.com.cn/", flag: "🇨🇳" },
    { name: t("contact.partners.japan"), url: "https://www.sanyo-trading.co.jp/", flag: "🇯🇵" },
    { name: t("contact.partners.south_korea"), url: "http://www.leanontech.co.kr/html/surf_tracker.html", flag: "🇰🇷" },
    { name: t("contact.partners.malaysia"), url: "http://www.genscience.com.my/index.php/suppliers", flag: "🇲🇾" },
    { name: t("contact.partners.italia"), url: "https://www.qitech.it/strumentazione/", flag: "🇮🇹" },
    { name: t("contact.partners.uk"), url: "https://adaptive-instruments.com/products/teclis-instruments/", flag: "🇬🇧" },
  ];


  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.05),transparent_50%)]" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href={`/${locale}`} className="hover:text-foreground transition-colors">
              {t("nav.home")}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium">{t("nav.contact")}</span>
          </nav>

          <div className={`max-w-3xl transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Badge */}
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-linear-to-r from-primary/10 to-accent/10 text-primary border border-primary/20 mb-6">
              <Send className="w-4 h-4 mr-2" />
              {t("contact.hero.badge") || "Get in Touch"}
            </span>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              {t("contact.hero.title") || "Let's Start a Conversation"}
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              {t("contact.hero.description") || "Have a question about our instruments? Need technical support? We're here to help."}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <Section background="muted">
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {contactMethods.map((method, index) => (
            <a
              key={index}
              href={method.action}
              target={method.action.startsWith('http') ? '_blank' : undefined}
              rel={method.action.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group relative bg-card rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-linear-to-br ${method.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-linear-to-br ${method.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <method.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {method.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {method.description}
                </p>
                
                {/* Details */}
                <div className="space-y-1">
                  <p className="font-medium text-foreground">{method.details}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {method.availability}
                  </p>
                </div>

                {/* Arrow indicator */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <ArrowRight className="w-5 h-5 text-primary" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </Section>

      {/* Global Partners */}
      <Section decorated>
        <div className="text-center mb-10">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-linear-to-r from-primary/10 to-accent/10 text-primary border border-primary/20 mb-6">
            <Globe className="w-4 h-4 mr-2" />
            {t("contact.partners.badge") || "Worldwide Network"}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("contact.partners.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("contact.partners.description")}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {partners.map((partner, index) => (
            <a
              key={index}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-card rounded-xl p-4 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{partner.flag}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                    {partner.name}
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </div>
            </a>
          ))}
        </div>
      </Section>

      {/* Contact Form & Map */}
      <Section background="muted">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className={`transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="mb-8">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 mb-4">
                {t("contact.form.badge") || "Send a Message"}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                {t("contact.form.subtitle")}
              </h2>
              <p className="text-muted-foreground">
                {t("contact.form.description")}
              </p>
            </div>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <input type="hidden" name="type" value={formData.type} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    {t("contact.form.name")} *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="h-11 rounded-xl border-border/50 focus:border-primary/50"
                    disabled={formStatus === "loading"}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    {t("contact.form.email")} *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    className="h-11 rounded-xl border-border/50 focus:border-primary/50"
                    disabled={formStatus === "loading"}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                    {t("contact.form.company")}
                  </label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="University of Science"
                    className="h-11 rounded-xl border-border/50 focus:border-primary/50"
                    disabled={formStatus === "loading"}
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    {t("contact.form.phone")}
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    className="h-11 rounded-xl border-border/50 focus:border-primary/50"
                    disabled={formStatus === "loading"}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="inquiry_type" className="block text-sm font-medium text-foreground mb-2">
                    {t("contact.form.inquiryType")} *
                  </label>
                  <select
                    id="inquiry_type"
                    name="type"
                    required
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full h-11 rounded-xl border border-border/50 bg-background px-3 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
                    disabled={formStatus === "loading"}
                  >
                    <option value="general" disabled>{t("contact.form.selectInquiryType")}</option>
                    <option value="product">{t("contact.form.inquiryOptions.product")}</option>
                    <option value="quote">{t("contact.form.inquiryOptions.quote")}</option>
                    <option value="demo">{t("contact.form.inquiryOptions.demo")}</option>
                    <option value="support">{t("contact.form.inquiryOptions.support")}</option>
                    <option value="partnership">{t("contact.form.inquiryOptions.partnership")}</option>
                    <option value="other">{t("contact.form.inquiryOptions.other")}</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    {t("contact.form.subject")} *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={t("contact.form.placeholderSubject")}
                    className="h-11 rounded-xl border-border/50 focus:border-primary/50"
                    disabled={formStatus === "loading"}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  {t("contact.form.message")} *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t("contact.form.placeholderMessage")}
                  className="rounded-xl border-border/50 focus:border-primary/50 resize-none"
                  disabled={formStatus === "loading"}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-12 rounded-xl bg-linear-to-r from-primary to-accent text-white font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
                disabled={formStatus === "loading"}
              >
                {formStatus === "loading" ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    {t("contact.form.sending")}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    {t("contact.form.submitButton")}
                  </span>
                )}
              </Button>
              
              {formStatus === "success" && (
                <p className="text-sm text-center text-emerald-600 font-medium">
                  <span className="flex items-center justify-center gap-2">
                    <Send size={14} />
                    {t("contact.form.successMessage")}
                  </span>
                </p>
              )}
              {formStatus === "error" && (
                <p className="text-sm text-center text-red-600 font-medium">
                  {t("contact.form.errorMessage")}
                </p>
              )}
              
              <p className="text-xs text-muted-foreground text-center">
                {t("contact.form.disclaimer")}
              </p>
            </form>
          </div>

          {/* Map & Office Info */}
          <div className={`space-y-6 transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            {/* Office Card */}
            <div className="bg-card rounded-2xl border border-border/50 p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-primary to-accent flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Teclis Scientific</h3>
                  <p className="text-sm text-muted-foreground">Head Office & Laboratory</p>
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                  <span className="text-foreground">22 ch. des prés secs<br />69380 Civrieux d'Azergues, France</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                  <a href="tel:+33474701851" className="text-foreground hover:text-primary transition-colors">+33 4 74 70 18 51</a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                  <a href="mailto:contact@teclis-scientific.com" className="text-foreground hover:text-primary transition-colors">contact@teclis-scientific.com</a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">Monday - Friday: 9:00 - 18:00</span>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="aspect-4/3 rounded-2xl overflow-hidden border border-border/50 shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2778.8407998533094!2d4.697092476277505!3d45.85448540731376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f48dcdc1ed8227%3A0x590a497e97ed2aaf!2sTeclis%20Scientific!5e0!3m2!1sfr!2s!4v1763183820311!5m2!1sfr!2s"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section background="gradient">
        <div className="text-center mb-12">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 text-foreground border border-white/20 mb-6">
            {t("contact.faq.subtitle")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("contact.faq.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("contact.faq.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="group bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
            <h3 className="font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">{t("contact.faq.q1")}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{t("contact.faq.a1")}</p>
          </div>
          
          <div className="group bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
            <h3 className="font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">{t("contact.faq.q2")}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{t("contact.faq.a2")}</p>
          </div>
          
          <div className="group bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
            <h3 className="font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">{t("contact.faq.q3")}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{t("contact.faq.a3")}</p>
          </div>
          
          <div className="group bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
            <h3 className="font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">{t("contact.faq.q4")}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{t("contact.faq.a4")}</p>
          </div>
          
          <div className="group bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
            <h3 className="font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">{t("contact.faq.q5")}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{t("contact.faq.a5")}</p>
          </div>
          
          <div className="group bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
            <h3 className="font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">{t("contact.faq.q6")}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{t("contact.faq.a6")}</p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            {t("contact.faq.cta") || "Still have questions?"}
          </p>
          <a href="mailto:contact@teclis-scientific.com">
            <Button className="rounded-xl bg-linear-to-r from-primary to-accent text-white font-semibold hover:opacity-90 shadow-lg shadow-primary/25">
              {t("contact.faq.ctaButton") || "Contact Support"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </div>
      </Section>
    </Layout>
  );
};

export default Contact;
