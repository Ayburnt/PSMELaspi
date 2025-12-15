// frontend/src/sanityClient.js
import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

// Paste your details here
export const client = createClient({
  projectId:SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  useCdn: true, // fast response
  apiVersion: SANITY_API_VERSION,
})

const builder = createImageUrlBuilder(client);
export function urlFor(source) {
  return builder.image(source)
}