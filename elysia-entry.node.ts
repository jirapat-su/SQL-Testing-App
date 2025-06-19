/* eslint-disable no-console */

import { staticPlugin } from '@elysiajs/static'
import Elysia from 'elysia'
import path from 'node:path'

import app from './elysia-entry'

const staticFile = new Elysia().use(
  staticPlugin({
    assets: path.join(process.cwd(), 'dist', 'client'),
    prefix: '/',
  }),
)

const nodeApp = new Elysia().use(staticFile).use(app!).listen(3000)

console.log(`Elysia server is running on ${nodeApp.server?.url}`)
