import { PrismaClient } from '@custom-prisma/app';
import { withAccelerate } from '@prisma/extension-accelerate';

// eslint-disable-next-line no-restricted-globals
const globalForPrisma = global as unknown as {
  prismaApp: PrismaClient;
};

const prismaApp = globalForPrisma.prismaApp || new PrismaClient().$extends(withAccelerate());

if (process.env.NODE_ENV !== 'production')
  globalForPrisma.prismaApp = prismaApp;

export { prismaApp };
