import { Flame, Zap, Shield } from "lucide-react";
import Layout from "@/components/Layout/Layout";
import SubApplicationPage from "@/components/ui/sub-application-page";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { generateMetadata as generatePageMetadata } from "@/lib/metadata";
import {
  createApplicationPageSchema,
  createBreadcrumbSchema,
  attachSchemaToMetadata,
} from "@/lib/metadata-schemas";
import { SITE_URL, SITE_NAME } from "@/lib/constants";

export const generateMetadata = async (props: {
  params: Promise<{ locale: string }>;
}) => {
  const params = await props.params;

  const baseMetadata = await generatePageMetadata({
    params,
    namespace: "Metadata",
    path: "applications/oilgas",
  });

  const applicationPageSchema = createApplicationPageSchema({
    name: baseMetadata.title as string,
    description: baseMetadata.description,
    url: `${SITE_URL}/${params.locale}/applications/oilgas`,
    siteUrl: SITE_URL,
    siteName: SITE_NAME,
  });

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: `${SITE_URL}/${params.locale}` },
    { name: "Applications", url: `${SITE_URL}/${params.locale}/applications` },
    { name: "Oil & Gas", url: `${SITE_URL}/${params.locale}/applications/oilgas` },
  ]);

  return attachSchemaToMetadata(baseMetadata, [applicationPageSchema, breadcrumbSchema]);
};

export default async function OilGas({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  const applications = [
    {
      image: "/images/oilgas/upstream.png",
      titleKey: "applications.data.oilGas.applications.0.title",
      descriptionKey: "applications.data.oilGas.applications.0.description",
    },
    {
      image: "/images/oilgas/midstream.png",
      titleKey: "applications.data.oilGas.applications.1.title",
      descriptionKey: "applications.data.oilGas.applications.1.description",
    },
    {
      image: "/images/oilgas/downstream.png",
      titleKey: "applications.data.oilGas.applications.2.title",
      descriptionKey: "applications.data.oilGas.applications.2.description",
    },
  ];

  const benefits = [
    {
      icon: <Flame className="w-5 h-5" />,
      titleKey: "applications.data.oilGas.benefits.cards.extreme.title",
      textKey: "applications.data.oilGas.benefits.cards.extreme.text",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      titleKey: "applications.data.oilGas.benefits.cards.recovery.title",
      textKey: "applications.data.oilGas.benefits.cards.recovery.text",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      titleKey: "applications.data.oilGas.benefits.cards.safety.title",
      textKey: "applications.data.oilGas.benefits.cards.safety.text",
    },
  ];

  const products = [
    { slug: 'trackertensiometer', label: t("applications.data.oilGas.products.tracker") },
    { slug: 'foamscan', label: t("applications.data.oilGas.products.foamscan") },
    { slug: 'trackerhtp', label: t("applications.data.oilGas.products.highPressureModules") },
  ];

  return (
    <Layout>
      <SubApplicationPage
        locale={locale}
        breadcrumbKey="nav.applications_sub.oilgas"
        heroImage="/images/oilgas/oilhero.png"
        badge={t("applications.data.oilGas.header.subtitle")}
        title={t("applications.data.oilGas.header.title")}
        subtitle={t("applications.data.oilGas.header.subtitle")}
        description={t("applications.data.oilGas.header.description")}
        products={products}
        applications={applications}
        benefits={benefits}
        accentColor="from-amber-600 to-orange-500"
      />
    </Layout>
  );
}
