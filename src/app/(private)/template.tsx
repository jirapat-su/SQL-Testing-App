'use client'

import { DashboardLayout } from '@toolpad/core/DashboardLayout'
import { NextAppProvider } from '@toolpad/core/nextjs'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { AppTitle } from '@/src/components/dashboard-layout/AppTitile'
import { SidebarFooter } from '@/src/components/dashboard-layout/SidebarFooter'
import { ToolbarActions } from '@/src/components/dashboard-layout/ToolbarActions'

import { muiTheme } from '../mui-theme'
import { MENU_ITEMS } from './menu'

export default function PrivateTemplate({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  return (
    <NextAppProvider
      key="private-template"
      navigation={MENU_ITEMS}
      router={{
        navigate: (url: string | URL) => {
          return router.push(typeof url === 'string' ? url : url.toString())
        },
        pathname,
        searchParams,
      }}
      theme={muiTheme}
      window={typeof window !== 'undefined' ? window : undefined}
    >
      <DashboardLayout
        defaultSidebarCollapsed
        slots={{
          appTitle: AppTitle,
          sidebarFooter: SidebarFooter,
          toolbarActions: ToolbarActions,
        }}
      >
        {children}
      </DashboardLayout>
    </NextAppProvider>
  )
}
