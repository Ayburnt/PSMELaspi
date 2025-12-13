import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'PCCILaspi',
  projectId: '2svpsi6g',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Content Management Section
            S.listItem()
              .title('Content Management')
              .child(
                S.list()
                  .title('Content Management')
                  .items([
                    S.listItem()
                      .title('Site Settings')
                      .child(S.document().schemaType('siteSettings').documentId('siteSettings-singleton')),
                    S.divider(),
                    S.listItem()
                      .title('Banner Section')
                      .child(S.document().schemaType('hero').documentId('hero')),
                    S.listItem()
                      .title('About Us')
                      .child(S.document().schemaType('aboutUs').documentId('aboutUs')),
                    S.listItem()
                      .title('Leadership Board')
                      .child(S.document().schemaType('leadershipBoard').documentId('leadershipBoard')),
                    S.listItem()
                      .title('How to Become a Member')
                      .child(S.document().schemaType('membershipInfo').documentId('membershipInfo')),
                    S.listItem()
                      .title('Why Join Us')
                      .child(S.document().schemaType('whyJoinUs').documentId('whyJoinUs')),
                  ])
              ),
            
            S.divider(),
            
            // Events & News Section
            S.documentTypeListItem('event').title('Events'),
            S.documentTypeListItem('news').title('News'),
            
            S.divider(),
            
            // Members Section
            S.documentTypeListItem('member').title('Members'),
          ]),
    }),
    visionTool()
  ],
  schema: {
    types: schemaTypes,
  },
})