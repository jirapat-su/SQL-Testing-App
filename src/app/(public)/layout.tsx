import { Fragment } from 'react'

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <Fragment>{children}</Fragment>
}
