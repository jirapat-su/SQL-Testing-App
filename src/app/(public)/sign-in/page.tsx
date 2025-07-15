'use client'

import type { AuthProvider, AuthResponse } from '@toolpad/core/SignInPage'

import Button from '@mui/material/Button'
import { SignInPage as SignInComponent } from '@toolpad/core/SignInPage'
import { useSearchParams } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'

import { authClient } from '@/src/libs/better-auth/client'

const authProviders: AuthProvider[] = [
  { id: 'google', name: 'Google' },
  { id: 'github', name: 'GitHub' },
  { id: 'credentials', name: 'Email and Password' },
]

function CustomButton(isLoading: boolean) {
  return () => {
    return (
      <Button
        disabled={isLoading}
        fullWidth
        sx={{ my: 2 }}
        type="submit"
        variant="contained"
      >
        Sign In
      </Button>
    )
  }
}

export default function SignInPage() {
  const searchParams = useSearchParams()
  const redirect = searchParams.get('__redirect_url')

  const [loading, setLoading] = useState(false)

  const redirectTo = useMemo(() => {
    if (!redirect) return '/'
    const decoded = decodeURIComponent(redirect)
    return decoded
  }, [redirect])

  const handleSignIn = useCallback(
    (provider: AuthProvider, formData?: FormData): Promise<AuthResponse> => {
      const promise = new Promise<AuthResponse>(resolve => {
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
              resolve({
                error: 'An error occurred while signing in. Please try again.',
              })
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
              resolve({
                error: 'An error occurred while signing in. Please try again.',
              })
              setLoading(false)
            }
          })()
        }
      })
      return promise
    },
    [redirectTo]
  )

  return (
    <SignInComponent
      localeText={{
        signInTitle: 'Sign in',
      }}
      providers={authProviders}
      signIn={handleSignIn}
      slotProps={{
        emailField: {
          autoFocus: true,
          disabled: loading,
          required: true,
          size: 'small',
        },
        form: { noValidate: true },
        passwordField: {
          disabled: loading,
          required: true,
          size: 'small',
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
