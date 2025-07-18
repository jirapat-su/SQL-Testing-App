import Box from '@mui/material/Box'
import { headers } from 'next/headers'
import { Fragment } from 'react'

import { auth } from '@/src/libs/better-auth'

type PrivateLayoutProps = Readonly<{
  children: React.ReactNode
}>

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return (
      <Box className="p-4" component={'main'}>
        <h1 className="text-2xl font-bold">Unauthorized</h1>
        <p>You do not have permission to access this page.</p>
      </Box>
    )
  }

  return <Fragment>{children}</Fragment>
}
