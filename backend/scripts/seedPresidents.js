import 'dotenv/config'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_TOKEN,
  apiVersion: process.env.SANITY_API_VERSION,
})

const presidentsData = [
  { _key: 'pres-1993', date: '1993', name: 'Pp Antonio L. Tamayo', description: 'Pioneer president establishing the foundation of the organization.' },
  { _key: 'pres-1994', date: '1994', name: 'President: Rosalino C. Riguer', description: 'Led the organization through its early growth phase.' },
  { _key: 'pres-1995', date: '1995', name: 'President: Edwin Afzelius', description: 'Contributed to organizational development and member engagement.' },
  { _key: 'pres-1996', date: '1996', name: 'President: Rodolfo Lajera', description: 'Strengthened organizational ties with the community.' },
  { _key: 'pres-1997', date: '1997', name: 'President: Fernado Francisco', description: 'Advanced organizational programs and initiatives.' },
  { _key: 'pres-1998', date: '1998', name: 'President: Jeffry Mangali', description: 'Fostered growth and expansion during their tenure.' },
  { _key: 'pres-1999', date: '1999', name: 'President: Ka Iking Lim', description: 'Continued organizational development and member services.' },
  { _key: 'pres-salter', date: '-', name: 'Pp Salter Han', description: 'Led during a crucial period of organizational evolution.' },
  { _key: 'pres-felix', date: '-', name: 'Late Pp Felix Lazo', description: 'Honored for significant contributions to the organization.' },
  { _key: 'pres-vic', date: '-', name: 'Late Pp Vic Apale', description: 'Remembered for dedicated service and leadership.' },
  { _key: 'pres-2005', date: '2005', name: 'Pp Ruben Tolentino', description: 'Restored and strengthened organizational programs.' },
  { _key: 'pres-2006', date: '2006', name: 'Rolando Peña', description: 'Enhanced member programs and community engagement.' },
  { _key: 'pres-2007', date: '2007', name: 'Late Pp Grace De Leon', description: 'First female president, championed gender diversity and inclusion.' },
  { _key: 'pres-2008', date: '2008', name: 'Pp Mohammad Yasin Badr', description: 'Promoted multicultural understanding within the organization.' },
  { _key: 'pres-2012', date: '2012', name: 'Pp Edwin Moran', description: 'Steered the organization through modernization efforts.' },
  { _key: 'pres-2014', date: '2014', name: 'Pp Tess Ngan-Tian', description: 'Expanded international partnerships and networking.' },
  { _key: 'pres-2018', date: '2018', name: 'Pp Diogenes "Jon" Garay', description: 'Advanced organizational excellence and professional development.' },
  { _key: 'pres-2022', date: '2022', name: 'Pp Myraflor Miranda', description: 'Led the organization through digital transformation and growth.' },
  { _key: 'pres-2024', date: 'Jan 2024 - March 2025', name: 'President: Ann Rene Manrique', description: 'Established cooperation with Barangay officials. Organized the 2nd PCCI Las Piñas Golf Tournament held at Hallow Ridge Filipinas Golf Course in San Pedro, Laguna.' },
  { _key: 'pres-2025-myra', date: 'April 2025 to Dec 2025', name: 'Pres Myraflor Miranda', description: 'Continued organizational growth and strategic initiatives during this period.' },
  { _key: 'pres-2026', date: '2026', name: 'President: Engr. Roger Reyes', description: 'Current president leading the organization into new initiatives and partnerships.' },
]

async function seedPresidents() {
  try {
    // Fetch the current historyPage document
    const historyPage = await client.fetch(`*[_type == "historyPage"][0]`)

    if (!historyPage) {
      console.log('❌ History page not found. Creating new document...')
      // Create new history page if it doesn't exist
      const newPage = await client.create({
        _type: 'historyPage',
        heroSection: {
          heroTitle: 'A Proud History of Service and Growth',
          heroSubtitle: 'Tracing the journey that shaped our organization and community.',
          heroBadgeText: 'Our Legacy',
        },
        briefHistorySection: {
          briefHistoryTitle: 'The Genesis of Our Organization',
          briefHistoryText: [
            {
              _type: 'block',
              children: [
                {
                  text: 'Our organization began with a vision to serve the community and foster professional excellence.',
                },
              ],
            },
          ],
        },
        milestoneSection: {
          milestoneTitle: 'History of Presidents',
          milestoneSubtitle: 'Honoring the leadership that paved the way.',
          milestones: presidentsData.map((president) => ({
            ...president,
            _type: 'milestoneEvent',
          })),
        },
        keyAchievementsSection: {
          keyAchievementsTitle: 'Notable Accomplishments',
          keyAchievementsSubtitle: 'A look at the major successes achieved through collective effort.',
          keyAchievements: [],
        },
      })
      console.log('✅ Created new history page with president data:', newPage._id)
    } else {
      // Update existing history page with milestone section
      const updatedPage = await client
        .patch(historyPage._id)
        .set({
          'milestoneSection.milestones': presidentsData.map((president) => ({
            ...president,
            _type: 'milestoneEvent',
          })),
        })
        .commit()

      console.log('✅ Updated history page with president data:', updatedPage._id)
      console.log(`✅ Added ${presidentsData.length} presidents to the timeline`)
    }
  } catch (error) {
    console.error('❌ Error seeding presidents:', error.message)
    process.exit(1)
  }
}

seedPresidents()