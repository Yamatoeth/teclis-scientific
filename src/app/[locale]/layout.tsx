import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import "@/../index.css";
import Providers from "../providers";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';

const SITE_URL = "https://www.teclis-scientific.com";
const SITE_NAME = "Teclis Scientific";

// Enable static metadata generation
export const metadataBase = new URL('https://www.teclis-scientific.com');

// Pre-generate all locales for SSG
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; 
}

export default async function LocaleLayout({ children, params }: Props) {
  const awaitedParams = await params;
  const locale = awaitedParams.locale;
  setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": SITE_NAME,
                "url": SITE_URL,
                "logo": `${SITE_URL}/images/logoara.avif`,
                "description": "Leading manufacturer of precision scientific instruments for surface tension analysis, foam characterization, and interfacial rheology.",
                "foundingDate": "1998",
                "address": {
                  "@type": "PostalAddress",
                  "addressCountry": "FR",
                  "addressLocality": "Civrieux-d'Azergues"
                },
                "sameAs": [
                  "https://www.linkedin.com/company/teclis-scientific",
                  "https://www.youtube.com/@TeclisScientific"
                ],
                "contactPoint": {
                  "@type": "ContactPoint",
                  "contactType": "sales",
                  "email": "contact@teclis-scientific.com",
                  "availableLanguage": ["English", "French"]
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": SITE_NAME,
                "url": SITE_URL,
                "inLanguage": locale,
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": `${SITE_URL}/${locale}/search?q={search_term_string}`,
                  "query-input": "required name=search_term_string"
                }
              }
            ])
          }}
        />
      </head>
      <body>
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </Providers>
        <Analytics/>
        <SpeedInsights/>
      </body>
    </html>
  );
}