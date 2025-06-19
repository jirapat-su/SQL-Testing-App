import { PrismaClient } from '@custom-prisma/app'
import { withAccelerate } from '@prisma/extension-accelerate'

// eslint-disable-next-line no-restricted-globals
const globalForPrisma = global as unknown as {
  appDB: PrismaClient
}

const appDB = globalForPrisma.appDB || new PrismaClient().$extends(withAccelerate())

if (process.env.NODE_ENV !== 'production') globalForPrisma.appDB = appDB

export { appDB }
