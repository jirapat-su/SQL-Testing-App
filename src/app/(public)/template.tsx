'use client'

import { NextAppProvider } from '@toolpad/core/nextjs'

import { muiTheme } from '../mui-theme'

export default function PublicTemplate({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <NextAppProvider key="public-template" theme={muiTheme}>
      {children}
    </NextAppProvider>
  )
}
