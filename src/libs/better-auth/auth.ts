import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { bearer, openAPI } from 'better-auth/plugins'
import Keyv from 'keyv'

import { env } from '@/src/env'
import { prisma } from '@/src/libs/prisma'

const keyv = new Keyv({
  namespace: 'auth',
  store: new Map(),
  useKeyPrefix: false,
})

const auth = betterAuth({
  account: {
    updateAccountOnSignIn: false,
  },
  advanced: {
    cookiePrefix: 'auth',
    crossSubDomainCookies: {
      enabled: false,
    },
    defaultCookieAttributes: {
      sameSite: 'lax',
      secure: env.VERCEL_ENV === 'production',
    },
  },
  basePath: '/api/auth',
  database: prismaAdapter(prisma, { provider: 'postgresql' }),
  disabledPaths: ['/reset-password'],
  emailAndPassword: {
    autoSignIn: false,
    disableSignUp: env.VERCEL === '1',
    enabled: !(env.VERCEL === '1'),
    requireEmailVerification: false,
  },
  plugins: [bearer(), openAPI()],
  rateLimit: {
    enabled: true,
    max: 100, // max requests in the window
    storage: 'secondary-storage',
    window: 60, // time window in seconds
  },
  secondaryStorage: {
    delete: async key => {
      await keyv.delete(key)
    },
    get: async key => {
      const value = await keyv.get(key)
      return value || null
    },
    set: async (key, value, ttl) => {
      if (ttl) await keyv.set(key, value, ttl)
      else await keyv.set(key, value)
    },
  },
  secret: env.BETTER_AUTH_SECRET,
  session: {
    cookieCache: {
      enabled: true,
    },
    expiresIn: 60 * 60 * 24 * 7, // 7 Days
    freshAge: 60 * 60 * 2, // 2 Hours
    storeSessionInDatabase: true,
    updateAge: 60 * 60 * 24, // 1 Day
  },
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      prompt: 'select_account',
    },
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      prompt: 'select_account',
    },
  },
  trustedOrigins: ['*'],
  user: {
    additionalFields: {
      role: {
        defaultValue: 'USER',
        required: false,
        type: 'string',
        validation: {
          enum: ['USER', 'ADMIN'],
        },
      },
    },
    changeEmail: {
      enabled: false,
    },
    deleteUser: {
      enabled: false,
    },
  },
})

export { auth }
