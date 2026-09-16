import { defineType, defineField } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Article / News',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
    }),
    defineField({
      name: 'excerpt',
      title: 'Extrait',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'body',
      title: 'Contenu',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'Newsletter', value: 'newsletter' },
          { title: 'Événement', value: 'events' },
          { title: 'Entreprise', value: 'company' },
          { title: 'Article scientifique', value: 'scientific_papers' },
          { title: 'Note d\'application', value: 'application_notes' },
        ],
      },
    }),
    defineField({
      name: 'readTime',
      title: 'Temps de lecture',
      type: 'string',
      description: 'ex: "5 min read"',
    }),
    defineField({
      name: 'media',
      title: 'Image / Vidéo',
      type: 'string',
      description: 'Chemin relatif vers l\'asset (ex: /images/articles-img/xxx.avif)',
    }),
    defineField({
      name: 'pdfurl',
      title: 'Lien PDF',
      type: 'string',
      description: 'URL ou chemin relatif vers le PDF de l\'article',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      excerpt: 'excerpt',
      media: 'media',
      category: 'category',
    },
    prepare({ title, excerpt, media, category }) {
      return {
        title,
        subtitle: excerpt?.slice(0, 80) ?? 'Sans extrait',
        media,
        info: category ? [{ title: category, name: 'category' }] : undefined,
      }
    },
  },
})
