import Box from '@mui/material/Box'
import { headers } from 'next/headers'
import { Fragment } from 'react'

import { auth } from '@/src/libs/better-auth'
import { $Enums } from '@/src/libs/prisma/client'

type StudentLayoutProps = Readonly<{
  children: React.ReactNode
}>

export default async function StudentLayout({ children }: StudentLayoutProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session || session.user.role !== $Enums.UserRole.STUDENT) {
    return (
      <Box className="p-4" component={'main'}>
        <h1 className="text-2xl font-bold">Unauthorized</h1>
        <p>You do not have permission to access this page.</p>
      </Box>
    )
  }

  return <Fragment>{children}</Fragment>
}
