import { Client as EsClient } from '@elastic/elasticsearch'
import { appendFileSync, readFileSync, writeFileSync } from 'fs'
import moment from 'moment'
import { Client } from 'pg'
import { exit } from 'process'
import R from 'ramda'
import { DB, getClient } from './db'
import { ES, getEsClient } from './es'
import { sleep } from './lib/sleep'

async function getRent(client: Client, rentId: number, limit: number) {
  const results = await client.query(
    'SELECT * FROM rent WHERE id >= ($1) and rent_dt is not null and return_dt is not null and "vehicleModelId" = 1 order by id limit ($2)',
    [rentId, limit]
  )

  return results.rows
}

async function processRents(esClient: EsClient, pgClient: Client) {
  let hasNext = true
  let rentIdCursor = Number(readFileSync('lastRentId', { encoding: 'utf8', flag: 'r' })) + 1
  const rentBatchSize = 20

  while (hasNext) {
    hasNext = false
    const rents = await getRent(pgClient, rentIdCursor, rentBatchSize)
    let lastRentId: string | null = null

    for (let i = 0; i < rents.length; i++) {
      const rent = rents[i]
      lastRentId = rent.id

      // Check if both rentUTCAt and returnUTCAt exist
      if (rent.rentUTCAt && rent.returnUTCAt) {
        const rentAt = moment.utc(rent.rentUTCAt)
        const returnAt = moment.utc(rent.returnUTCAt)
        const duration = moment.duration(returnAt.diff(rentAt))

        // Check if the duration in minutes is greater than 0
        if (Math.floor(duration.asMinutes()) > 0) {
          // Fetch box messages between rentAt and returnAt
          const messages = await getBoxMessages(esClient, rent.box_id, rentAt, returnAt)
          // Calculate ride distance from the fetched messages

          let calRideDistance = 0
          for (const message of messages) {
            const odo = message.fields?.odo[0]
            if (odo > calRideDistance) {
              calRideDistance = odo
            }
          }

          // for (let i = 0; i < messages.length; i++) {
          //   const odo = messages[i].fields?.odo[0]
          //   if (odo > calRideDistance) {
          //     calRideDistance = odo
          //   }
          // }

          // const calRideDistance = messages.reduce((acc: number, m: { fields: { odo: any[] } }) => {
          //   const odo = m.fields?.odo[0]
          //   // If the current message's odo is greater than the accumulated value, update the accumulated value
          //   if (odo > acc) {
          //     return (acc = odo)
          //   } else {
          //     // If not, keep the accumulated value
          //     return acc
          //   }
          // }, 0)

          // Calculate the absolute difference between the calculated ride distance and the rent's ride distance
          const diff = Math.abs(calRideDistance - rent.ride_distance)

          // If the difference divided by the calculated ride distance is greater than 0.1
          if (diff / calRideDistance > 0.1) {
            // Log the rent id, rent ride distance, and calculated ride distance
            console.log({ id: rent.id, rentRideDistance: rent.ride_distance, calRideDistance })
            // Append the rent id and calculated ride distance to 'target.out' file
            appendFileSync('target.out', `${rent.id},${calRideDistance}\n`)
          } else {
            // If the difference divided by the calculated ride distance is not greater than 0.1, log the rent id and return date
            console.log({ id: rent.id, rentAt: rent.return_dt })
            // Append the rent id to 'ok.out' file
            appendFileSync('ok.out', `${rent.id}\n`)
          }
        }
      }
    }

    if (R.isNil(lastRentId)) {
      hasNext = false
    } else {
      writeFileSync('lastRentId', lastRentId)
      rentIdCursor = Number(lastRentId) + 1
      hasNext = true
    }

    await sleep(2000)
  }
}

async function getBoxMessages(esClient: EsClient, box_id: string, startAt: moment.Moment, endAt: moment.Moment) {
  // Execute a search query on the Elasticsearch client
  const docs = await esClient.search({
    // Specify the index pattern to search in
    index: 'data.pubsub.cbb-event-2024.03.*',
    // Define the sorting order of the results
    sort: [
      {
        // Sort by the 'updatedUTCAt' field in ascending order
        updatedUTCAt: {
          order: 'asc',
          // Specify the data type for fields that are not mapped in the index
          unmapped_type: 'boolean'
        }
      }
    ],
    // Specify the fields to return in the search results
    fields: ['id', 'odo', 'updatedAt'],
    // Exclude the source document from the returned results
    _source: false,
    // Define the search query
    query: {
      // Use a boolean query to combine multiple filter clauses
      bool: {
        filter: [
          {
            // Match documents where the 'id' field equals the 'box_id' variable
            match: {
              id: box_id
            }
          },
          {
            // Match documents where the 'updatedUTCAt' field is within a certain range
            range: {
              updatedUTCAt: {
                // Specify the date format to use for the range
                format: 'strict_date_optional_time',
                // Specify the start of the range
                gte: startAt.toISOString(),
                // Specify the end of the range
                lte: endAt.toISOString()
              }
            }
          }
        ]
      }
    },
    // Limit the number of search results to return
    size: 5000
  })

  if (docs.hits.hits.length > 0) {
    return docs.hits.hits
  }

  return []
}

async function main(cb: () => never) {
  const esClient = getEsClient(ES.PROD)
  const pgClient = await getClient(DB.PROD_BACKUP)

  await processRents(esClient, pgClient)

  await esClient.close()
  await pgClient.end()

  cb()
}

main(() => exit(0))
