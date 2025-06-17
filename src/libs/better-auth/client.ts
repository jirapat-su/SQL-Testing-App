import { createAuthClient } from 'better-auth/react'

const authClient = createAuthClient({
  baseURL: import.meta.env.PUBLIC_ENV__BETTER_AUTH_URL,
})

export { authClient }
