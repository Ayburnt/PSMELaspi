import dotenv from 'dotenv';
dotenv.config();

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_TOKEN,
  apiVersion: process.env.SANITY_API_VERSION,
})

const joinPageData = {
  _id: 'joinPage',
  _type: 'joinPage',
  heroSection: {
    badge: 'Join the Premier Business Chamber',
    title: 'Be a PCCI-Las Pinas Member',
    subtitle: 'Connect with industry leaders, influence policy, and accelerate your business growth.',
  },
  applicationProcess: {
    badge: 'Application Process',
    title: 'How to Become a PCCI-Las Piñas Member',
    description: 'A clear, guided process designed for application.',
    steps: [
      {
        _key: 'step1',
        stepNumber: '01',
        title: 'Submit Application',
        description: 'Complete the online membership form with your business details.',
      },
      {
        _key: 'step2',
        stepNumber: '02',
        title: 'Application Review',
        description: 'Our membership committee evaluates your submission.',
      },
      {
        _key: 'step3',
        stepNumber: '03',
        title: 'Payment Process',
        description: 'Receive your invoice and payment instructions.',
      },
      {
        _key: 'step4',
        stepNumber: '04',
        title: 'Welcome Onboard',
        description: 'Get your certificate and unlock member benefits.',
      },
    ],
  },
  testimonialsSection: {
    title: 'Member Stories',
    testimonials: [
      {
        _key: 'testimonial1',
        quote: "Joining PCCI-Las Piñas was one of the best business decisions we've made. The connections have been invaluable.",
        name: 'Maria Santos',
        title: 'CEO, TechVision Solutions',
        initials: 'MS',
      },
      {
        _key: 'testimonial2',
        quote: "As a small business, we weren't sure if it would be worth it—but PCCI-Las Piñas proved its value many times over.",
        name: 'Antonio Reyes',
        title: 'Founder, Green Earth',
        initials: 'AR',
      },
    ],
  },
  ctaSection: {
    title: 'Ready to Grow?',
    description: 'Take the first step toward expanding your network and securing your business future.',
    primaryButtonText: 'Apply for Membership',
    secondaryButtonText: 'Download PDF Form',
    pdfFormUrl: '/membership-form.pdf',
  },
};

async function seedJoinPage() {
  try {
    console.log('🌱 Starting to seed Join Page data...');

    // Check if document already exists
    const existing = await client.fetch(`*[_id == "joinPage"][0]`);

    if (existing) {
      console.log('📝 Join Page document already exists. Updating...');
      await client
        .patch('joinPage')
        .set(joinPageData)
        .commit();
      console.log('✅ Join Page updated successfully!');
    } else {
      console.log('📝 Creating new Join Page document...');
      await client.create(joinPageData);
      console.log('✅ Join Page created successfully!');
    }

    console.log('\n🎉 Seeding completed!');
  } catch (error) {
    console.error('❌ Error seeding Join Page:', error.message);
    process.exit(1);
  }
}

// Run the seed function
seedJoinPage();
