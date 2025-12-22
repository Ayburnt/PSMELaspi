import { defineField, defineType } from 'sanity'
import { UserIcon } from '@sanity/icons'

export default defineType({
  name: 'joinPage',
  title: 'Join Page',
  type: 'document',
  icon: UserIcon,
  // Singleton document - only one exists
  // @ts-expect-error Sanity allows this property for action control on singletons
  __experimental_actions: ['update', 'publish'],
  preview: {
    prepare() {
      return {
        title: 'Join Page',
        subtitle: 'Singleton document – only one exists',
      }
    },
  },
  fields: [
    // === HERO SECTION ===
    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'badge',
          title: 'Badge Text',
          type: 'string',
          initialValue: 'Join the Premier Business Chamber',
        },
        {
          name: 'title',
          title: 'Main Title',
          type: 'string',
          initialValue: 'Be a PCCI-Las Pinas Member',
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'text',
          rows: 2,
          initialValue: 'Connect with industry leaders, influence policy, and accelerate your business growth.',
        },
        {
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: { hotspot: true },
          description: 'Hero section background image',
        },
      ],
    }),

    // === APPLICATION PROCESS SECTION ===
    defineField({
      name: 'applicationProcess',
      title: 'Application Process',
      type: 'object',
      fields: [
        {
          name: 'badge',
          title: 'Badge Text',
          type: 'string',
          initialValue: 'Application Process',
        },
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'How to Become a PCCI-Las Piñas Member',
        },
        {
          name: 'description',
          title: 'Section Description',
          type: 'text',
          rows: 2,
          initialValue: 'A clear, guided process designed for application.',
        },
        {
          name: 'steps',
          title: 'Process Steps',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'stepNumber',
                  title: 'Step Number',
                  type: 'string',
                  description: 'e.g., "01", "02", etc.',
                },
                {
                  name: 'title',
                  title: 'Step Title',
                  type: 'string',
                },
                {
                  name: 'description',
                  title: 'Step Description',
                  type: 'text',
                  rows: 2,
                },
              ],
              preview: {
                select: {
                  stepNumber: 'stepNumber',
                  title: 'title',
                },
                prepare(selection) {
                  const { stepNumber, title } = selection as Record<string, any>
                  return {
                    title: `${stepNumber}. ${title}`,
                  }
                },
              },
            },
          ],
          validation: (Rule) => Rule.required().min(1).max(6),
        },
      ],
    }),

    // === TESTIMONIALS SECTION ===
    defineField({
      name: 'testimonialsSection',
      title: 'Testimonials Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Member Stories',
        },
        {
          name: 'testimonials',
          title: 'Testimonials',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'quote',
                  title: 'Quote',
                  type: 'text',
                  rows: 3,
                },
                {
                  name: 'name',
                  title: 'Name',
                  type: 'string',
                },
                {
                  name: 'title',
                  title: 'Title/Position',
                  type: 'string',
                },
                {
                  name: 'initials',
                  title: 'Initials',
                  type: 'string',
                  description: 'e.g., "MS" for Maria Santos',
                },
              ],
              preview: {
                select: {
                  name: 'name',
                  title: 'title',
                },
                prepare(selection) {
                  const { name, title } = selection as Record<string, any>
                  return {
                    title: name,
                    subtitle: title,
                  }
                },
              },
            },
          ],
          validation: (Rule) => Rule.required().min(1).max(4),
        },
      ],
    }),

    // === CALL TO ACTION SECTION ===
    defineField({
      name: 'ctaSection',
      title: 'Call to Action Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Ready to Grow?',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2,
          initialValue: 'Take the first step toward expanding your network and securing your business future.',
        },
        {
          name: 'primaryButtonText',
          title: 'Primary Button Text',
          type: 'string',
          initialValue: 'Apply for Membership',
        },
        {
          name: 'secondaryButtonText',
          title: 'Secondary Button Text',
          type: 'string',
          initialValue: 'Download PDF Form',
        },
        {
          name: 'pdfFormUrl',
          title: 'PDF Form URL',
          type: 'string',
          description: 'URL or path to the downloadable PDF form',
          initialValue: '/membership-form.pdf',
        },
      ],
    }),
  ],
})
