import {defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export default defineType({
  name: 'news',
  title: 'News Management',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Headline',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'date',
      title: 'Published Date',
      type: 'date',
      options: {dateFormat: 'YYYY-MM-DD'},
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Press Release', value: 'press-release'},
          {title: 'News Update', value: 'news-update'},
          {title: 'Advisory', value: 'advisory'},
        ],
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: {hotspot: true},
    }),

    defineField({
      name: 'description',
      title: 'Short Description',
      description: 'This appears on the News Grid. Keep it concise (2–3 sentences).',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(300).warning('Long text may be cut off in the grid layout.'),
    }),

    defineField({
      name: 'body',
      title: 'Full Article Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
<<<<<<< HEAD
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
=======
            {title: 'Heading 1', value: 'h1'},
            {title: 'Heading 2', value: 'h2'},
            {title: 'Heading 3', value: 'h3'},
>>>>>>> 8e3883e4c4f5f257328b335f0adf99d02897015f
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Italic', value: 'em'},
              {title: 'Underline', value: 'underline'},
              {title: 'Code', value: 'code'},
            ],
            annotations: [
              {
<<<<<<< HEAD
                name: 'link',
                title: 'Link',
                type: 'object',
                fields: [
                  {
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        },

        // Optional: allow images inside article
        {
          type: 'image',
          options: {hotspot: true},
        },
      ],
=======
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  }
                ]
              }
            ]
          }
        },
        {
          type: 'image',
          options: { hotspot: true }
        }
      ]
>>>>>>> 8e3883e4c4f5f257328b335f0adf99d02897015f
    }),
  ],
})
