'use client'

import { DashboardLayout } from '@toolpad/core/DashboardLayout'
import { NextAppProvider } from '@toolpad/core/nextjs'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

import type { $Enums } from '@/src/libs/prisma/client'

import { AppTitle } from '@/src/components/dashboard-layout/AppTitile'
import { SidebarFooter } from '@/src/components/dashboard-layout/SidebarFooter'
import { ToolbarActions } from '@/src/components/dashboard-layout/ToolbarActions'
import { authClient } from '@/src/libs/better-auth/client'

import { muiTheme } from '../mui-theme'
import { MENU_ITEMS } from './menu'

export default function PrivateTemplate({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { data: sessionData } = authClient.useSession()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const filteredMenuItems = useMemo(() => {
    const { user } = sessionData || {}
    if (!user) return []

    return MENU_ITEMS.filter(item => {
      if ('acceptRoles' in item) {
        return item.acceptRoles?.includes(user.role as $Enums.UserRole)
      }
      return true
    })
  }, [sessionData])

  return (
    <NextAppProvider
      key="private-template"
      navigation={filteredMenuItems}
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
        sidebarExpandedWidth={240}
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
