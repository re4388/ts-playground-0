// eslint-disable-next-line no-console
import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'
import { isNil } from 'ramda'
import 'reflect-metadata'
import health from './route/health'

export async function runSimpleExpress() {
  return new Promise((resolve, reject) => {

    const app: Express = express()
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

    app.use('/', health)

    app.listen(3111, async () => {
      debugger
      console.log('Server is running at http://localhost:3111')
    })

  })
}