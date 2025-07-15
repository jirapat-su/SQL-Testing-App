'use client'

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'
import { ThemeProvider } from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Suspense } from 'react'

import { muiTheme } from './mui-theme'

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      throwOnError: false,
    },
    queries: {
      refetchOnWindowFocus: false,
      throwOnError: false,
    },
  },
})

export default function RootTemplate({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <ThemeProvider
          colorSchemeStorageKey="toolpad-color-scheme"
          defaultMode="dark"
          modeStorageKey="toolpad-mode"
          theme={muiTheme}
        >
          <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
          <CssBaseline />

          <Suspense
            fallback={
              <div>
                <p>Loading...</p>
              </div>
            }
          >
            {children}
          </Suspense>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </QueryClientProvider>
  )
}
