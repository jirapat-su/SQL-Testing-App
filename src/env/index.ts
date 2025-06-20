import { createEnv } from '@t3-oss/env-core'
import { vercel } from '@t3-oss/env-core/presets-zod'

import { envClientSchema, envServerSchema } from './schema'

export const env = createEnv({
  client: envClientSchema,
  clientPrefix: 'PUBLIC_ENV__',
  emptyStringAsUndefined: true,
  extends: [vercel()],
  isServer: typeof window === 'undefined',
  runtimeEnv: typeof process !== 'undefined' ? process.env : import.meta.env,
  server: envServerSchema,
})
