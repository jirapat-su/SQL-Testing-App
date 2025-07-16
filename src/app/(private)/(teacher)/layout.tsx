import Box from '@mui/material/Box'
import { headers } from 'next/headers'
import { Fragment } from 'react'

import { auth } from '@/src/libs/better-auth'
import { $Enums } from '@/src/libs/prisma/client'

type TeacherLayoutProps = Readonly<{
  children: React.ReactNode
}>

export default async function TeacherLayout({ children }: TeacherLayoutProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session || session.user.role !== $Enums.UserRole.TEACHER) {
    return (
      <Box className="p-4" component={'main'}>
        <h1 className="text-2xl font-bold">Unauthorized</h1>
        <p>You do not have permission to access this page.</p>
      </Box>
    )
  }

  return <Fragment>{children}</Fragment>
}
