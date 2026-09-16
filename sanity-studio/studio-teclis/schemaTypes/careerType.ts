import { defineType, defineField } from 'sanity'

export const careerType = defineType({
  name: 'career',
  title: 'Offre d\'emploi',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre du poste',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    }),
    defineField({
      name: 'department',
      title: 'Département',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Lieu',
      type: 'string',
    }),
    defineField({
      name: 'type',
      title: 'Type de contrat',
      type: 'string',
      options: {
        list: [
          { title: 'Full-time', value: 'Full-time' },
          { title: 'Part-time', value: 'Part-time' },
          { title: 'Remote', value: 'Remote' },
          { title: 'Internship', value: 'Internship' },
        ],
      },
    }),
    defineField({
      name: 'level',
      title: 'Niveau',
      type: 'string',
      options: {
        list: [
          { title: 'Junior', value: 'Junior' },
          { title: 'Mid-level', value: 'Mid-level' },
          { title: 'Mid-Senior', value: 'Mid-Senior' },
          { title: 'Senior', value: 'Senior' },
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'requirements',
      title: 'Requirements (un par ligne)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'isActive',
      title: 'Poste actif',
      type: 'boolean',
      description: 'Décocher pour masquer le poste',
      initialValue: true,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      department: 'department',
      location: 'location',
      isActive: 'isActive',
    },
    prepare({ title, department, location, isActive }) {
      return {
        title,
        subtitle: location ? `${department} — ${location}` : department,
        indicated: isActive,
      }
    },
  },
})
