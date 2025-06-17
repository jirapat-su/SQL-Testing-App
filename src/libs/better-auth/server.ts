import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { bearer, openAPI } from 'better-auth/plugins'

import { env } from '@/src/env/server'
import { prismaApp } from '@/src/libs/prisma'

const auth = betterAuth({
  basePath: '/api/auth',
  database: prismaAdapter(prismaApp, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [bearer(), openAPI()],
  secret: env.BETTER_AUTH_SECRET,
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
        defaultValue: 'STUDENT',
        type: 'string',
      },
    },
  },
})

export { auth }
