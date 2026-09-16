"use client";

import { useState } from "react";
import { X, Download, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface BrochureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productName?: string;
  instrumentName?: string;
}

const BrochureModal = ({ open, onOpenChange, productName, instrumentName }: BrochureModalProps) => {
  const t = useTranslations();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    instrument: instrumentName || productName || "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          type: "brochure",
          subject: productName ? `${t("brochure.requestSubject")} - ${productName}` : t("brochure.requestSubject"),
        }),
      });

      if (response.ok) {
        setStatus("success");
        toast.success(t("brochure.success"));
        // Reset form and close after short delay
        setTimeout(() => {
          setFormData({ name: "", email: "", company: "", instrument: "", message: "" });
          setStatus("idle");
          onOpenChange(false);
        }, 1500);
      } else {
        setStatus("error");
        toast.error(t("brochure.error"));
      }
    } catch {
      setStatus("error");
      toast.error(t("brochure.error"));
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onOpenChange(false);
      }}
    >
      <div
        className="relative w-full max-w-lg bg-card rounded-3xl border border-border/50 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4 border-b border-border/50">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              {productName ? t("brochure.titleWithProduct", { product: productName }) : t("brochure.title")}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">{t("brochure.subtitle")}</p>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors"
            aria-label={t("common.close")}
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="brochure-name" className="block text-sm font-medium text-foreground mb-2">
                {t("brochure.name")} *
              </label>
              <Input
                id="brochure-name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder={t("brochure.namePlaceholder")}
                className="h-11 rounded-xl border-border/50 focus:border-primary/50"
                disabled={status === "loading"}
              />
            </div>
            <div>
              <label htmlFor="brochure-email" className="block text-sm font-medium text-foreground mb-2">
                {t("brochure.email")} *
              </label>
              <Input
                id="brochure-email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder={t("brochure.emailPlaceholder")}
                className="h-11 rounded-xl border-border/50 focus:border-primary/50"
                disabled={status === "loading"}
              />
            </div>
          </div>

          <div>
            <label htmlFor="brochure-company" className="block text-sm font-medium text-foreground mb-2">
              {t("brochure.company")}
            </label>
            <Input
              id="brochure-company"
              name="company"
              type="text"
              value={formData.company}
              onChange={handleChange}
              placeholder={t("brochure.companyPlaceholder")}
              className="h-11 rounded-xl border-border/50 focus:border-primary/50"
              disabled={status === "loading"}
            />
          </div>

          <div>
            <label htmlFor="brochure-instrument" className="block text-sm font-medium text-foreground mb-2">
              {t("brochure.instrument")}
            </label>
            <Input
              id="brochure-instrument"
              name="instrument"
              type="text"
              value={formData.instrument}
              onChange={handleChange}
              placeholder={t("brochure.instrumentPlaceholder")}
              className="h-11 rounded-xl border-border/50 focus:border-primary/50"
              disabled={status === "loading"}
            />
          </div>

          <div>
            <label htmlFor="brochure-message" className="block text-sm font-medium text-foreground mb-2">
              {t("brochure.message")}
            </label>
            <Textarea
              id="brochure-message"
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              placeholder={t("brochure.messagePlaceholder")}
              className="rounded-xl border-border/50 focus:border-primary/50 resize-none"
              disabled={status === "loading"}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              className="flex-1 h-11 rounded-xl bg-linear-to-r from-primary to-accent text-white font-medium hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  {t("brochure.sending")}
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send size={16} />
                  {t("brochure.sendRequest")}
                </span>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-11 rounded-xl border-2"
              onClick={() => onOpenChange(false)}
              disabled={status === "loading"}
            >
              {t("brochure.cancel")}
            </Button>
          </div>

          {status === "success" && (
            <p className="text-sm text-center text-emerald-600 font-medium">
              <span className="flex items-center justify-center gap-2">
                <Download size={14} />
                {t("brochure.confirmation")}
              </span>
            </p>
          )}
        </form>

        {/* Footer note */}
        <div className="px-6 py-3 bg-muted/50 border-t border-border/50 text-xs text-muted-foreground text-center">
          {t("brochure.privacyNote")}
        </div>
      </div>
    </div>
  );
};

export default BrochureModal;
