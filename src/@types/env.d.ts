/* eslint-disable ts/consistent-type-definitions */

import type { z } from 'zod'

import type { envClientSchema, envServerSchema } from '@/src/env/schema'

const _env = z.object(envServerSchema).merge(z.object(envClientSchema))

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof _env> {}
  }
}

export {}
