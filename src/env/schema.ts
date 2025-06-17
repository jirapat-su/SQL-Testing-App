import z from 'zod'

const envClientSchema = {
  PUBLIC_ENV__BETTER_AUTH_URL: z.string().url().readonly(),
}

const envServerSchema = {
  PRISMA_POSTGRES_URL: z.string().url().readonly(),
  // Auth
  BETTER_AUTH_SECRET: z.string().readonly(),
  GITHUB_CLIENT_ID: z.string().readonly(),
  GITHUB_CLIENT_SECRET: z.string().readonly(),
  GOOGLE_CLIENT_ID: z.string().readonly(),
  GOOGLE_CLIENT_SECRET: z.string().readonly(),
}

export { envClientSchema, envServerSchema }
