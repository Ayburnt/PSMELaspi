import { defineField, defineType } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export default defineType({
  name: 'aboutUs',
  title: 'About Us',
  type: 'document',
  icon: HomeIcon,
  // Singleton document - only one exists
  // @ts-expect-error Sanity allows this property for action control on singletons
  __experimental_actions: ['update', 'publish'],
  preview: {
    prepare() {
      return {
        title: 'About Us',
        subtitle: 'Singleton document – only one exists',
      }
    },
  },
  fields: [
    // === WHO WE ARE SECTION ===
    defineField({
      name: 'whoWeAreTitle',
      title: 'Who We Are - Title',
      type: 'string',
      initialValue: 'Who We Are',
    }),
    defineField({
      name: 'whoWeAreMainText',
      title: 'Main Introduction',
      type: 'text',
      rows: 3,
      description: 'Opening paragraph about PCCI',
    }),
    defineField({
      name: 'whoWeAreDescriptionText',
      title: 'Organization Description',
      type: 'text',
      rows: 3,
      description: 'Second paragraph describing membership and mission',
    }),
    defineField({
      name: 'whoWeAreImage',
      title: 'Who We Are Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'affiliationTitle',
      title: 'Affiliation Section Title',
      type: 'string',
      initialValue: 'Trusted Affiliation',
    }),
    defineField({
      name: 'affiliationText',
      title: 'Affiliation Description',
      type: 'text',
      rows: 2,
      description: 'Text about PCCI national affiliation',
    }),

    // === VISION & MISSION SECTION ===
    defineField({
      name: 'visionTitle',
      title: 'Vision Title',
      type: 'string',
      initialValue: 'Our Vision',
    }),
    defineField({
      name: 'visionStatement',
      title: 'Vision Statement',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'missionTitle',
      title: 'Mission Title',
      type: 'string',
      initialValue: 'Our Mission',
    }),
    defineField({
      name: 'missionStatement',
      title: 'Mission Statement',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),

    // === ORGANIZATIONAL THRUSTS ===
    defineField({
      name: 'thrustsTitle',
      title: 'Organizational Thrusts - Title',
      type: 'string',
      initialValue: 'Organizational Thrusts',
    }),
    defineField({
      name: 'thrustsSubtitle',
      title: 'Organizational Thrusts - Subtitle',
      type: 'text',
      rows: 2,
      initialValue:
        'To operationalize our MISSION and VISION, PCCI adopts the following strategic thrusts:',
    }),
    defineField({
      name: 'thrusts',
      title: 'Organizational Thrusts',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'thrust',
          fields: [
            {
              name: 'title',
              title: 'Thrust Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Thrust Description',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'icon',
              title: 'Icon Name',
              type: 'string',
              description: 'Icon (e.g., Users, Scale, Globe, Building2)',
              validation: (Rule) => Rule.required(),
              options: {
                list: [
                  { title: '👥 Users', value: 'Users' },
                  { title: '⚖️ Scale', value: 'Scale' },
                  { title: '🌍 Globe', value: 'Globe' },
                  { title: '🏢 Building2', value: 'Building2' },
                  { title: '📈 TrendingUp', value: 'TrendingUp' },
                  { title: '🎯 Target', value: 'Target' },
                  { title: '🏆 Award', value: 'Award' },
                  { title: '📊 BarChart', value: 'BarChart' },
                  { title: '🔧 Settings', value: 'Settings' },
                  { title: '🌟 Star', value: 'Star' },
                ],
                layout: 'dropdown',
              },
            },
          ],
          preview: {
            select: {
              title: 'title',
              icon: 'icon',
            },
            prepare(selection) {
              const { title, icon } = selection as Record<string, any>
              return {
                title: title,
                subtitle: icon ? `Icon: ${icon}` : 'No icon',
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).warning('Add at least one thrust'),
    }),

    // === HERO SECTION ===
    defineField({
      name: 'heroBadgeText',
      title: 'Hero Badge Text',
      type: 'string',
      initialValue: 'Las Piñas City Chapter',
    }),
    defineField({
      name: 'heroBackgroundImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
