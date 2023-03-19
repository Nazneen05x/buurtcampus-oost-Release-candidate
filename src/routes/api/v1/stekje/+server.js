import { GraphQLClient, gql } from 'graphql-request'
import { HYGRAPH_KEY, HYGRAPH_URL } from '$env/static/private'

import { responseInit } from '$lib/server/responseInit'

const hygraph = new GraphQLClient(HYGRAPH_URL, {
  headers: {
    Authorization: `Bearer ${HYGRAPH_KEY}`,
  },
})

export async function GET({ url }) {
  let slug = url.searchParams.get('slug') ?? false

  const query = gql`
    query getStekje($slug: String) {
      stekje(where: {slug: $slug}) {
        aanmelddatum
        createdAt
        giftig
        id
        landvanherkomst
        naam
        publishedAt
        slug
        updatedAt
        verpotten
        voeding
        fotos {
          height
          width
          original: url
          small: url(transformation: { image: { resize: { width: 500, fit: clip } } })
          originalAsWebP: url(transformation: { document: { output: { format: webp } } })
          smallAsWebP: url(transformation: { image: { resize: { width: 500, fit: clip } } document: { output: { format: webp } } })
        }
      }
    }
  `

  const data = await hygraph.request(query, { slug })
  return new Response(JSON.stringify(data), responseInit)
}
