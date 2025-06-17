import { createEnv } from '@t3-oss/env-core'

import { envClientSchema } from './schema'

export const envClient = createEnv({
  client: envClientSchema,
  clientPrefix: 'PUBLIC_ENV__',
  emptyStringAsUndefined: true,
  isServer: false,
  runtimeEnv: import.meta.env,
})
