import { localStorageColorSchemeManager, MantineProvider } from '@mantine/core'

import theme from './theme'
import './app.css'

const colorSchemeManager = localStorageColorSchemeManager({
  key: 'app-color-scheme',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider colorSchemeManager={colorSchemeManager} defaultColorScheme='dark' theme={theme}>
      {children}
    </MantineProvider>
  )
}
