import type { AuthProvider, AuthResponse } from '@toolpad/core/SignInPage'

import Button from '@mui/material/Button'
import { SignInPage } from '@toolpad/core/SignInPage'
import { useState } from 'react'
import { usePageContext } from 'vike-react/usePageContext'

import { authClient } from '@/src/libs/better-auth/client'

const providers = [
  { id: 'google', name: 'Google' },
  { id: 'github', name: 'GitHub' },
  { id: 'credentials', name: 'Email and Password' },
]

const CustomButton = (isLoading: boolean) => () => {
  return (
    <Button disabled={isLoading} fullWidth sx={{ my: 2 }} type='submit' variant='contained'>
      Sign In
    </Button>
  )
}

export default function Page() {
  const [loading, setLoading] = useState(false)
  const { urlParsed } = usePageContext()
  const {
    search: { redirect },
  } = urlParsed

  const redirectTo = redirect || '/home'

  const signIn = (provider: AuthProvider, formData?: FormData): Promise<AuthResponse> => {
    const promise = new Promise<AuthResponse>((resolve) => {
      if (provider.id === 'credentials') {
        // Email and Password Sign In
        ;(async () => {
          const data = {
            email: (formData?.get('email') as string) || '',
            password: (formData?.get('password') as string) || '',
          }

          try {
            const { error } = await authClient.signIn.email(
              {
                ...data,
                callbackURL: redirectTo,
              },
              {
                onRequest: () => setLoading(true),
              }
            )

            if (error) {
              resolve({ error: error.message })
              setLoading(false)
            }
          } catch {
            resolve({ error: 'An error occurred while signing in. Please try again.' })
            setLoading(false)
          }
        })()
      } else {
        // Social Sign In
        ;(async () => {
          try {
            const { error } = await authClient.signIn.social(
              {
                callbackURL: redirectTo,
                provider: provider.id,
              },
              {
                onRequest: () => setLoading(true),
              }
            )

            if (error) {
              resolve({ error: error.message })
              setLoading(false)
            }
          } catch {
            resolve({ error: 'An error occurred while signing in. Please try again.' })
            setLoading(false)
          }
        })()
      }
    })
    return promise
  }

  return (
    <SignInPage
      localeText={{
        signInTitle: 'Sign in',
      }}
      providers={providers}
      signIn={signIn}
      slotProps={{
        emailField: {
          defaultValue: 'dev01@example.com',
          disabled: loading,
          required: true,
        },
        form: { noValidate: true },
        passwordField: {
          defaultValue: 'p@ssw0rd',
          disabled: loading,
          required: true,
        },
      }}
      slots={{
        submitButton: CustomButton(loading),
      }}
      sx={{
        '& form > .MuiStack-root': {
          marginTop: '2rem',
          rowGap: '0.5rem',
        },
      }}
    />
  )
}
