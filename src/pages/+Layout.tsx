import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'
import { ThemeProvider } from '@mui/material/styles'

import './app.css'
import { theme } from './theme'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultMode='dark' theme={theme}>
      <GlobalStyles styles='@layer theme, base, mui, components, utilities;' />
      <CssBaseline />

      {children}
    </ThemeProvider>
  )
}
