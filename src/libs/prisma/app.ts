import { PrismaClient } from '@custom-prisma/app'
import { withAccelerate } from '@prisma/extension-accelerate'

// eslint-disable-next-line no-restricted-globals
const globalForPrisma = global as unknown as {
  appDB: PrismaClient
}

const appDB = globalForPrisma.appDB || new PrismaClient().$extends(withAccelerate()).$extends({
  query: {
    $allModels: {
      async $allOperations({ args, model, operation, query }) {
        const start = performance.now()
        const result = await query(args)
        const end = performance.now()
        const time = end - start
        // eslint-disable-next-line no-console
        console.log(
          `[APP_DB] Operation: ${operation} - Model: ${model} - Time: ${time.toFixed(2)}ms - Args: ${JSON.stringify(args)}`,
        )
        return result
      },
    },
  },
})

if (process.env.NODE_ENV !== 'production')
  globalForPrisma.appDB = appDB

export { appDB }
