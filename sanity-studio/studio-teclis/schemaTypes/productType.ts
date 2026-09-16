import { defineType, defineField } from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Produit',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom du produit',
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
      name: 'productKey',
      title: 'Clé produit (productKey)',
      type: 'string',
      description: 'Identifiant utilisé dans le code (ex: trackerTensiometer)',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Description courte (pour listings)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'Surface Tension', value: 'tension' },
          { title: 'Foam Analysis', value: 'foam' },
          { title: 'Rheology', value: 'rheology' },
          { title: 'Accessories', value: 'accessories' },
        ],
      },
    }),
    defineField({
      name: 'price',
      title: 'Prix / Disponibilité',
      type: 'string',
      description: 'ex: "Contact for Quote"',
    }),
    defineField({
      name: 'image',
      title: 'Image principale',
      type: 'image',
      description: 'Image hero du produit',
    }),
    defineField({
      name: 'video',
      title: 'Vidéo',
      type: 'file',
      description: 'Vidéo de démonstration (mp4)',
    }),
    defineField({
      name: 'pdfUrl',
      title: 'Brochure PDF',
      type: 'string',
      description: 'Chemin vers le PDF (ex: /pdf/product-catalog.pdf)',
    }),
    defineField({
      name: 'features',
      title: 'Fonctionnalités principales',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'specifications',
      title: 'Spécifications techniques',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'parameter', title: 'Paramètre', type: 'string' },
            { name: 'value', title: 'Valeur', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'applications',
      title: 'Applications',
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
      name: 'modules',
      title: 'Modules optionnels',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Titre', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 3 },
            { name: 'image', title: 'Image', type: 'image' },
          ],
        },
      ],
    }),
    defineField({
      name: 'measurementCapabilities',
      title: 'Capacités de mesure',
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
      name: 'heroSubtitle',
      title: 'Sous-titre hero (pour la page produit)',
      type: 'string',
    }),
    defineField({
      name: 'heroHighlights',
      title: 'Points forts hero (liste)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      category: 'category',
    },
    prepare({ title, media, category }) {
      return {
        title,
        subtitle: category ? `Catégorie: ${category}` : '',
        media,
      }
    },
  },
})
