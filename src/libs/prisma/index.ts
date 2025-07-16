import { withAccelerate } from '@prisma/extension-accelerate'

import { PrismaClient } from './client/edge'

// eslint-disable-next-line no-restricted-globals
const globalForPrisma = global as unknown as {
  prisma: PrismaClient
}

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient().$extends(withAccelerate()).$extends({
    query: {
      $allModels: {
        async $allOperations({ args, model, operation, query }) {
          const start = performance.now()
          const result = await query(args)
          const end = performance.now()
          const time = end - start
          // eslint-disable-next-line no-console
          console.log(
            `[DB] Operation: ${operation} - Model: ${model} - Time: ${time.toFixed(2)}ms - Args: ${JSON.stringify(args)}`
          )
          return result
        },
      },
    },
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export { prisma }
