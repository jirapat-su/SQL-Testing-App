import { createEnv } from '@t3-oss/env-nextjs'
import { vercel } from '@t3-oss/env-nextjs/presets-zod'

import { envClientSchema, envServerSchema } from './schema'

export const env = createEnv({
  client: envClientSchema,
  emptyStringAsUndefined: true,
  experimental__runtimeEnv: process.env,
  extends: [vercel()],
  isServer: typeof window === 'undefined',
  server: envServerSchema,
})
