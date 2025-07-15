'use client'

import { Box } from '@mui/material'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

type ExamManageMentTemplateProps = Readonly<{
  children: React.ReactNode
}>

type LinkTabProps = {
  href: string
  label?: string
  selected?: boolean
}

function LinkTab(props: LinkTabProps) {
  const { href, ...tabProps } = props

  return (
    <Tab
      aria-current={props.selected && 'page'}
      component={Link}
      href={href}
      {...tabProps}
    />
  )
}

export default function ExamManagementTemplate({
  children,
}: ExamManageMentTemplateProps) {
  const pathname = usePathname()

  const matchPathname = useMemo(() => {
    switch (pathname) {
      case '/exam-management':
        return 0
      case '/exam-management/group':
        return 1
      default:
        return -1
    }
  }, [pathname])

  return (
    <Box className="p-4" component={'main'}>
      <Box className="border border-divider rounded-md" component={'div'}>
        <Tabs
          aria-label="nav tabs example"
          role="navigation"
          value={matchPathname}
        >
          <LinkTab href="/exam-management" label="จัดการข้อสอบ" />
          <LinkTab href="/exam-management/group" label="จัดการกลุ่มข้อสอบ" />
        </Tabs>

        <Box className="p-4" component={'div'}>
          {children}
        </Box>
      </Box>
    </Box>
  )
}
