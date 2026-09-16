import { Target, Microscope, FileCheck } from "lucide-react";
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
    path: "applications/lifesciences",
  });

  const applicationPageSchema = createApplicationPageSchema({
    name: baseMetadata.title as string,
    description: baseMetadata.description,
    url: `${SITE_URL}/${params.locale}/applications/lifesciences`,
    siteUrl: SITE_URL,
    siteName: SITE_NAME,
  });

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: `${SITE_URL}/${params.locale}` },
    { name: "Applications", url: `${SITE_URL}/${params.locale}/applications` },
    { name: "Life Sciences", url: `${SITE_URL}/${params.locale}/applications/lifesciences` },
  ]);

  return attachSchemaToMetadata(baseMetadata, [applicationPageSchema, breadcrumbSchema]);
};

export default async function LifeSciences({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  const applications = [
    {
      image: "/images/pharmaceuticals.png",
      titleKey: "applications.data.lifeSciences.applications.0.title",
      descriptionKey: "applications.data.lifeSciences.applications.0.description",
    },
    {
      image: "/images/emulsions.png",
      titleKey: "applications.data.lifeSciences.applications.1.title",
      descriptionKey: "applications.data.lifeSciences.applications.1.description",
    },
    {
      image: "/images/interactions.png",
      titleKey: "applications.data.lifeSciences.applications.2.title",
      descriptionKey: "applications.data.lifeSciences.applications.2.description",
    },
    {
      image: "/images/liquiddroplets.png",
      titleKey: "applications.data.lifeSciences.applications.3.title",
      descriptionKey: "applications.data.lifeSciences.applications.3.description",
    },
    {
      image: "/images/biology.png",
      titleKey: "applications.data.lifeSciences.applications.4.title",
      descriptionKey: "applications.data.lifeSciences.applications.4.description",
    },
  ];

  const benefits = [
    {
      icon: <Target className="w-5 h-5" />,
      titleKey: "applications.data.lifeSciences.benefits.cards.drugDelivery.title",
      textKey: "applications.data.lifeSciences.benefits.cards.drugDelivery.text",
    },
    {
      icon: <Microscope className="w-5 h-5" />,
      titleKey: "applications.data.lifeSciences.benefits.cards.stability.title",
      textKey: "applications.data.lifeSciences.benefits.cards.stability.text",
    },
    {
      icon: <FileCheck className="w-5 h-5" />,
      titleKey: "applications.data.lifeSciences.benefits.cards.regulatory.title",
      textKey: "applications.data.lifeSciences.benefits.cards.regulatory.text",
    },
  ];

  const products = [
    { slug: 'trackertensiometer', label: t("applications.data.lifeSciences.products.0") },
    { slug: 'foamscan', label: t("applications.data.lifeSciences.products.1") },
    { slug: 'jetscan', label: t("applications.data.lifeSciences.products.2") },
  ];

  return (
    <Layout>
      <SubApplicationPage
        locale={locale}
        breadcrumbKey="nav.applications_sub.lifesciences"
        heroImage="/images/generated/life_pharma.png"
        badge={t("applications.data.lifeSciences.header.subtitle")}
        title={t("applications.data.lifeSciences.header.title")}
        subtitle={t("applications.data.lifeSciences.header.subtitle")}
        description={t("applications.data.lifeSciences.header.description")}
        products={products}
        applications={applications}
        benefits={benefits}
        accentColor="from-blue-600 to-cyan-500"
      />
    </Layout>
  );
}
