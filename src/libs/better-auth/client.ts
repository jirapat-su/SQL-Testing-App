import { createAuthClient } from 'better-auth/react'

const authClient = createAuthClient({
  baseURL: `${import.meta.env.PUBLIC_ENV__API_URL}/api/auth`,
})

export { authClient }
