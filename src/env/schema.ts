import z from 'zod'

const envClientSchema = {
  // API URL FrontEnd ENV
  PUBLIC_ENV__API_URL: z.string().url().readonly(),
}

const envServerSchema = {
  // API URL
  API_URL: z.string().url().readonly(),

  // DB
  EXAM_MYSQL_HOST: z
    .union([z.string().url(), z.string().ip(), z.literal('localhost')])
    .readonly(),
  EXAM_MYSQL_PASSWORD: z.string().readonly(),
  EXAM_MYSQL_PORT: z
    .string()
    .transform(val => Number.parseInt(val))
    .readonly(),
  EXAM_MYSQL_USER: z.string().readonly(),
  PRISMA_POSTGRES_URL: z.string().url().readonly(),

  // Auth
  BETTER_AUTH_SECRET: z.string().readonly(),
  GITHUB_CLIENT_ID: z.string().readonly(),
  GITHUB_CLIENT_SECRET: z.string().readonly(),
  GOOGLE_CLIENT_ID: z.string().readonly(),
  GOOGLE_CLIENT_SECRET: z.string().readonly(),
}

export { envClientSchema, envServerSchema }
