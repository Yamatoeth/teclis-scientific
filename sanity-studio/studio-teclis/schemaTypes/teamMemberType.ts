import { defineType, defineField } from 'sanity'

export const teamMemberType = defineType({
  name: 'teamMember',
  title: 'Membre de l\'équipe',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Poste',
      type: 'string',
    }),
    defineField({
      name: 'bio',
      title: 'Biographie',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'expertise',
      title: 'Domaines d\'expertise',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
    }),
    defineField({
      name: 'linkedin',
      title: 'Profil LinkedIn',
      type: 'url',
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
      position: 'position',
      media: 'photo',
    },
    prepare({ title, position, media }) {
      return { title, subtitle: position, media }
    },
  },
})
