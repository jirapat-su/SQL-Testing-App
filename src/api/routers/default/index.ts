import { geolocation, ipAddress } from '@vercel/functions'
import Elysia from 'elysia'

const defaultRouter = new Elysia({
  detail: {
    tags: ['Default'],
  },
  name: 'Default Router',
  prefix: '',
})
  .get('/health', () => {
    return {
      message: 'Server is running',
      status: 'OK',
      timestamp: process.uptime(),
    }
  })
  .get('/', ({ request, server }) => {
    const ip = ipAddress(request) || server?.requestIP(request)?.address || 'UNKNOWN'
    const geodata = geolocation(request)

    return {
      ipAddress: `Your IP is ${ip}`,
      location: geodata,
      message: `Hello from ElysiaJS`,
    }
  })

export { defaultRouter }
