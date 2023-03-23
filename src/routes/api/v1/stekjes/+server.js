import { GraphQLClient, gql } from 'graphql-request'
import { HYGRAPH_KEY, HYGRAPH_URL_HIGH_PERFORMANCE, HYGRAPH_URL } from '$env/static/private'
import { responseInit } from '$lib/server/responseInit'

export async function GET({ url }) {

  const hygraph = new GraphQLClient(HYGRAPH_URL_HIGH_PERFORMANCE, {
    headers: {
      Authorization: `Bearer ${HYGRAPH_KEY}`,
    },
  })
  let data;
  if (url.searchParams.get('id')) {
    let id = url.searchParams.get('id')
    const query = gql`
      query getStekje($id: ID!) {
        stekje(where: {id: $id}) {
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
    data = await hygraph.request(query, { id })
  } else {

    let first = Number(url.searchParams.get('first') ?? 10)
    let skip = Number(url.searchParams.get('skip') ?? 0)
    let direction = url.searchParams.get('direction') === 'ASC' ? 'ASC' : 'DESC'
    let orderBy = (url.searchParams.get('orderBy') ?? 'publishedAt') + '_' + direction

    const query = gql`
      query getStekjes($first: Int, $skip: Int, $orderBy: StekjeOrderByInput) {
        stekjes(first: $first, skip: $skip, orderBy: $orderBy) {
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
        stekjesConnection {
          pageInfo {
            hasNextPage
            hasPreviousPage
            pageSize
          }
        }
      }
    `
    data = await hygraph.request(query, { first, skip, orderBy })
  }

  return new Response(JSON.stringify(data), responseInit)

}

export async function POST({ request }) {
  const requestData = await request.json()
  let errors = []

  if (!requestData.naam || typeof requestData.naam !== 'string') {
    errors.push({ field: 'naam', message: 'naam should exist and have a string value' })
  }

  if (errors.length > 0) {
    return new Response(
      JSON.stringify({
        errors: errors,
      }),
      {status: 400}
    )
  }

  // Bereid de mutatie voor
  const mutation = gql`
    mutation createStekje($naam: String!, $beschrijving: String, $aanmelddatum: Date, $landvanherkomst: String, $giftig: String, $verpotten: String, $voeding: String) {
      createStekje(data: { naam: $naam, beschrijving: $beschrijving, aanmelddatum: $aanmelddatum, landvanherkomst: $landvanherkomst, giftig: $giftig, verpotten: $verpotten, voeding: $voeding }) {
        id
      }
    }
  `

  // Bereid publiceren voor
  const publication = gql`
    mutation publishStekje($id: ID!) {
      publishStekje(where: { id: $id }, to: PUBLISHED) {
        id
      }
    }
  `

  const hygraph = new GraphQLClient(HYGRAPH_URL, {
    headers: {
      Authorization: `Bearer ${HYGRAPH_KEY}`,
    },
  })

  // Voer de mutatie uit
  const data = await hygraph
    .request(mutation, { ...requestData })
    // Stuur de response met created id door
    .then((data) => {
      return (
        hygraph
          // Voer de publicatie uit met created id
          .request(publication, { id: data.createStekje.id ?? null })
          // Vang fouten af bij het publiceren
          .catch((error) => {
            errors.push({ field: 'HyGraph', message: error })
          })
      )
    })
    // Vang fouten af bij de mutatie
    .catch((error) => {
      errors.push({ field: 'HyGraph', message: error })
    })

  if (errors.length > 0) {
    return new Response(
      JSON.stringify({
        errors: errors,
      }),
      {status: 400}
    )
  }

  return new Response(
    JSON.stringify({
      data: data && data.publishUrl,
      success: data && data.publishUrl ? true : false,
    }),
    responseInit
  )
}