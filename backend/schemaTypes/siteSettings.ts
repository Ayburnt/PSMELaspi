import { defineField, defineType } from 'sanity'
import { CogIcon } from '@sanity/icons'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  // Singleton document - only one exists
  // @ts-expect-error Sanity allows this property for action control on singletons
  __experimental_actions: ['update', 'publish'],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
        subtitle: 'Singleton document – only one exists',
      }
    },
  },
  fields: [
    // === BRANDING ===
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      description: 'Organization logo',
    }),
    defineField({
      name: 'organizationName',
      title: 'Organization Name',
      type: 'string',
      initialValue: 'PCCI',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'organizationSubtitle',
      title: 'Organization Subtitle',
      type: 'string',
      initialValue: 'Las Piñas City',
      validation: (Rule) => Rule.required(),
    }),

    // === CONTACT INFORMATION ===
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
      initialValue: '(02) 8-123-4567',
    }),
    defineField({
      name: 'contactPhone2',
      title: 'Contact Phone 2',
      type: 'string',
      description: 'Alternative phone number',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      initialValue: 'secretariat@psmelaspinas.org',
    }),
    defineField({
      name: 'contactEmail2',
      title: 'Contact Email 2',
      type: 'string',
      description: 'Alternative email address',
      initialValue: 'info@pccilaspinas.org',
    }),

    // === ADDRESS ===
    defineField({
      name: 'addressLine1',
      title: 'Address Line 1',
      type: 'string',
      initialValue: 'Herkings Corporation',
    }),
    defineField({
      name: 'addressLine2',
      title: 'Address Line 2',
      type: 'string',
      initialValue: 'Las Piñas City, Philippines',
    }),
    defineField({
      name: 'fullAddress',
      title: 'Full Address (for Footer)',
      type: 'text',
      rows: 2,
      initialValue: 'Unit 101, Pilar Village,\nLas Piñas City, 1740',
    }),

    // === BUSINESS HOURS ===
    defineField({
      name: 'businessHours',
      title: 'Business Hours',
      type: 'text',
      rows: 2,
      initialValue: 'Mon - Fri: 9:00 AM - 5:00 PM\nSat - Sun: Closed',
    }),

    // === SOCIAL MEDIA ===
    defineField({
      name: 'facebookUrl',
      title: 'Facebook URL',
      type: 'url',
      description: 'Full Facebook page URL',
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
      description: 'Full LinkedIn page URL',
    }),

    // === GOOGLE MAPS ===
    defineField({
      name: 'googleMapsEmbedUrl',
      title: 'Google Maps Embed URL',
      type: 'url',
      description: 'Full embed URL from Google Maps (src attribute)',
    }),

    // === ABOUT TEXT ===
    defineField({
      name: 'footerAboutText',
      title: 'Footer About Text',
      type: 'text',
      rows: 3,
      initialValue:
        'A non-stock, non-profit organization dedicated to the advancement of the business community in Las Piñas City.',
    }),

     // === THEME COLORS ===
    defineField({
      name: 'topBarBgColor',
      title: 'Top Bar Background Color',
      type: 'color',
      description: 'Background color for the top navigation bar',
      options: {
        disableAlpha: true,
      },
      initialValue: {
        hex: '#1e3a8a',
      },
    }),
    defineField({
      name: 'footerBgColor',
      title: 'Footer Background Color',
      type: 'color',
      description: 'Background color for the footer section',
      options: {
        disableAlpha: true,
      },
      initialValue: {
        hex: '#020617',
      },
    }),
  ],
})
