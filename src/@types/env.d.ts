/* eslint-disable ts/consistent-type-definitions */
import type { z } from 'zod';

import type { envClientSchema, envServerSchema } from '@/src/env/schema';

const _envClient = z.object(envClientSchema);
const _envServer = z.object(envServerSchema);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof _envServer> {
      NODE_ENV: 'development' | 'preview' | 'production' | 'test';
    }
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }

  interface ImportMetaEnv extends z.infer<typeof _envClient> {}
}

export { };
