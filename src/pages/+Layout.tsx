import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'
import { ThemeProvider } from '@mui/material/styles'

import './app.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { theme } from './theme'

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        colorSchemeStorageKey="toolpad-color-scheme"
        defaultMode="dark"
        modeStorageKey="toolpad-mode"
        theme={theme}
      >
        <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
        <CssBaseline />

        {children}
      </ThemeProvider>
    </QueryClientProvider>
  )
}
