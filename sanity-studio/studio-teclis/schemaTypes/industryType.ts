import { defineType, defineField } from 'sanity'

export const industryType = defineType({
  name: 'industry',
  title: 'Secteur d\'activité',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'key',
      title: 'Clé (pour le routage)',
      type: 'string',
      description: 'ex: foodBeverages, lifesciences, oilgas, dailychemicals',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroImage',
      title: 'Image hero',
      type: 'image',
    }),
    defineField({
      name: 'accentColor',
      title: 'Couleur d\'accentuation (Tailwind)',
      type: 'string',
      description: 'ex: from-emerald-600 to-teal-500',
    }),
    defineField({
      name: 'applications',
      title: 'Applications (cartes)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Titre', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 2 },
            { name: 'image', title: 'Image', type: 'image' },
          ],
        },
      ],
    }),
    defineField({
      name: 'benefits',
      title: 'Bénéfices (cartes)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Titre', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 2 },
          ],
        },
      ],
    }),
    defineField({
      name: 'products',
      title: 'Produits associés',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
    }),
    defineField({
      name: 'caseStudy',
      title: 'Étude de cas',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'isActive',
      title: 'Visible',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'heroImage',
      key: 'key',
    },
    prepare({ title, media, key }) {
      return { title, subtitle: key ? `key: ${key}` : '', media }
    },
  },
})
