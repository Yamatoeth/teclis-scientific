import { defineType, defineField } from 'sanity'

export const partnerType = defineType({
  name: 'partner',
  title: 'Partenaire / Client',
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
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
    defineField({
      name: 'website',
      title: 'Site web',
      type: 'url',
    }),
    defineField({
      name: 'industry',
      title: 'Industrie',
      type: 'string',
      options: {
        list: [
          { title: 'Chemicals', value: 'chemicals' },
          { title: 'Food & Beverages', value: 'food' },
          { title: 'Life Sciences', value: 'life' },
          { title: 'Oil & Gas', value: 'oilgas' },
          { title: 'Research Institution', value: 'research' },
        ],
      },
    }),
    defineField({
      name: 'logoVariant',
      title: 'Variante logo (pour les numéros de logo)',
      type: 'number',
      description: 'ex: 1 pour LOGO1.avif',
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
      media: 'logo',
      industry: 'industry',
    },
    prepare({ title, media, industry }) {
      return { title, subtitle: industry, media }
    },
  },
})
