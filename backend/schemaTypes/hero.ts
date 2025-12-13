import { defineField, defineType } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export default defineType({
  name: 'hero',
  title: 'Banner Page',
  type: 'document',
  icon: HomeIcon,
  // Singleton document - only one exists
  // @ts-expect-error Sanity allows this property for action control on singletons
  __experimental_actions: ['update', 'publish'],
  preview: {
    prepare() {
      return { title: 'Banner Page', subtitle: 'Singleton document – only one exists' }
    },
  },
  fields: [
    // Badge
    defineField({
      name: 'badgeText',
      title: 'Badge Text',
      type: 'string',
      initialValue: 'Official Chapter Website',
      validation: (Rule) => Rule.required(),
    }),

    // Main Heading
    defineField({
      name: 'mainHeading',
      title: 'Main Heading',
      type: 'string',
      description: 'Primary headline text',
      initialValue: 'Building Champions.',
      validation: (Rule) => Rule.required(),
    }),

    // Highlighted Heading (second line with different color)
    defineField({
      name: 'highlightedHeading',
      title: 'Highlighted Heading',
      type: 'string',
      description: 'Second line heading (will be highlighted in yellow)',
      initialValue: 'Engineering the Future.',
      validation: (Rule) => Rule.required(),
    }),

    // Description/Intro Text
    defineField({
      name: 'introText',
      title: 'Introduction Text',
      type: 'text',
      rows: 4,
      description: 'Main description paragraph',
      initialValue:
        'We are pleased to extend an invitation for you to join the PSME Las Piñas Chapter. Uniting professionals to upgrade the practice of Mechanical Engineering in the southern metro.',
      validation: (Rule) => Rule.required(),
    }),

    // Background Image
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
    }),

    // Primary Button
    defineField({
      name: 'primaryButton',
      title: 'Primary Button',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Become a Member',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'link',
          title: 'Button Link/Anchor',
          type: 'string',
          description: 'e.g., #join, #about, /join',
          initialValue: '#join',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),

    // Secondary Button
    defineField({
      name: 'secondaryButton',
      title: 'Secondary Button',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Learn More',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'link',
          title: 'Button Link/Anchor',
          type: 'string',
          description: 'e.g., #join, #about, /about',
          initialValue: '#about',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),

    // Hero Height
    defineField({
      name: 'heroHeight',
      title: 'Hero Section Height',
      type: 'string',
      description: 'Choose how tall the hero section should be',
      options: {
        list: [
          { title: '60% of viewport height', value: 'h-[60vh]' },
          { title: '80% of viewport height (Default)', value: 'h-[80vh]' },
          { title: 'Full screen', value: 'min-h-screen' },
          { title: '100% of viewport height', value: 'h-screen' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'h-[80vh]',
    }),

    // Overlay Opacity
    defineField({
      name: 'overlayOpacity',
      title: 'Background Overlay Darkness',
      type: 'string',
      description: 'How dark the overlay should be',
      options: {
        list: [
          { title: '60% dark', value: 'bg-blue-900/60' },
          { title: '70% dark', value: 'bg-blue-900/70' },
          { title: '75% dark', value: 'bg-blue-900/75' },
          { title: '80% dark (Default)', value: 'bg-blue-900/80' },
          { title: '85% dark', value: 'bg-blue-900/85' },
          { title: '90% dark', value: 'bg-blue-900/90' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'bg-blue-900/80',
    }),
  ],
})
