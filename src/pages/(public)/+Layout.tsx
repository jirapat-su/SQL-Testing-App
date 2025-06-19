import { AppProvider } from '@toolpad/core/AppProvider'

import { theme } from '../theme'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider key={'public-layout'} theme={theme}>
      {children}
    </AppProvider>
  )
}
