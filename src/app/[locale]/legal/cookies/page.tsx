import { useTranslations } from "next-intl";
import { MapPin, Mail, Phone, Globe } from "lucide-react";

export default function CookiesPage() {
  const t = useTranslations();
  
  return (
    <div className="container mx-auto px-6 py-8 max-w-3xl">
      {/* Publisher Info */}
      <div className="mb-8 p-6 bg-card rounded-xl border border-border/50">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          {t("legal.publisher.title")}
        </h2>
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-start gap-3">
            <Globe className="w-4 h-4 mt-0.5 shrink-0 text-muted-foreground" />
            <span>
              <strong>{t("legal.publisher.company")}:</strong>{" "}
              Teclis Scientific
            </span>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-muted-foreground" />
            <span>
              <strong>{t("legal.publisher.address")}:</strong>{" "}
              22 ch. des présecs, 69380 Civrieux d'Azergues, France
            </span>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="w-4 h-4 mt-0.5 shrink-0 text-muted-foreground" />
            <span>
              <strong>{t("legal.publisher.email")}:</strong>{" "}
              contact@teclis-scientific.com
            </span>
          </div>
          <p>
            <strong>{t("legal.publisher.siret")}:</strong>{" "}
            SIRET 436 444 931 00029
          </p>
          <p>
            <strong>{t("legal.publisher.director")}:</strong>{" "}
            Publication Director
          </p>
          <div className="flex items-start gap-3">
            <Phone className="w-4 h-4 mt-0.5 shrink-0 text-muted-foreground" />
            <span>
              <strong>{t("legal.publisher.hosting")}:</strong>{" "}
              Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main>
        <h1 className="text-3xl font-semibold mb-6">
          {t("legal.cookies.title")}
        </h1>
        
        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <p>
            {t("legal.cookies.introduction")}
          </p>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              {t("legal.cookies.whatAreCookies")}
            </h2>
            <p>
              {t("legal.cookies.whatAreCookiesDescription")}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              {t("legal.cookies.essential")}
            </h2>
            <p>
              {t("legal.cookies.essentialDescription")}
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>{t("legal.cookies.language")}</li>
              <li>{t("legal.cookies.navigation")}</li>
              <li>{t("legal.cookies.security")}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              {t("legal.cookies.analytics")}
            </h2>
            <p>
              {t("legal.cookies.analyticsDescription")}
            </p>
            <p>
              {t("legal.cookies.vercelAnalytics")}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              {t("legal.cookies.management")}
            </h2>
            <p>
              {t("legal.cookies.managementDescription")}
            </p>
          </section>

          <section className="pt-4 border-t border-border/50">
            <h2 className="text-xl font-semibold text-foreground mb-3">
              {t("legal.cookies.contact")}
            </h2>
            <p>
              {t("legal.cookies.contactDescription")}
            </p>
            <a
              href={`mailto:${t("footer.contact.email")}`}
              className="inline-flex items-center gap-2 text-primary hover:underline mt-2"
            >
              <Mail className="w-4 h-4" />
              {t("footer.contact.email")}
            </a>
          </section>
        </div>
      </main>
    </div>
  );
}
