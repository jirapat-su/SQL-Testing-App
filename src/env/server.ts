import { createEnv } from '@t3-oss/env-core'
import { vercel } from '@t3-oss/env-core/presets-zod'

import { envServerSchema } from './schema'

export const env = createEnv({
  emptyStringAsUndefined: true,
  extends: [vercel()],
  isServer: true,
  runtimeEnv: typeof process !== 'undefined' ? process.env : import.meta.env,
  server: envServerSchema,
})
