'use client'

import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

type LinkTabProps = {
  href: string
  label?: string
  selected?: boolean
}

type MenuItems = {
  href: string
  label: string
}

function LinkTab({ href, selected, ...tabProps }: LinkTabProps) {
  return (
    <Tab
      aria-current={selected && 'page'}
      component={Link}
      href={href}
      {...tabProps}
      className="text-primary"
    />
  )
}

type TabContainerProps = Readonly<{
  children: React.ReactNode
  menuItems?: MenuItems[]
}>

const DEFAULT_MENU_ITEMS: MenuItems[] = []

export function TabContainer({
  children,
  menuItems = DEFAULT_MENU_ITEMS,
}: TabContainerProps) {
  const pathname = usePathname()

  const matchPathname = useMemo(() => {
    return menuItems.findIndex(item => item.href === pathname)
  }, [menuItems, pathname])

  return (
    <Box className="w-full h-full overflow-hidden p-4">
      <Box className="flex flex-col w-full h-full overflow-hidden border border-divider rounded-md">
        <Tabs
          className="border-b border-divider"
          role="navigation"
          value={matchPathname}
        >
          {menuItems.map(({ href, label }) => (
            <LinkTab href={href} key={`${href}:${label}`} label={label} />
          ))}
        </Tabs>

        <Box className="flex-1 p-4 overflow-auto" component={'div'}>
          {children}
        </Box>
      </Box>
    </Box>
  )
}
