import { geolocation, ipAddress } from '@vercel/functions'
import Elysia from 'elysia'

export const defaultRoute = new Elysia({
  detail: {
    tags: ['Default'],
  },
  name: 'Default Router',
  prefix: '',
})
  .get(
    '/health',
    () => {
      return {
        message: 'Server is running',
        status: 'OK',
        timestamp: process.uptime(),
      }
    },
    {
      detail: {
        description: 'Health check endpoint',
        summary: 'Check server health',
      },
    }
  )
  .get(
    '/',
    ({ request, server }) => {
      const ip =
        ipAddress(request) || server?.requestIP(request)?.address || 'UNKNOWN'
      const geodata = geolocation(request)

      return {
        ipAddress: `Your IP is ${ip}`,
        location: geodata,
        message: `Hello from ElysiaJS`,
      }
    },
    {
      detail: {
        description: 'Default endpoint',
        summary: 'Default endpoint',
      },
    }
  )
