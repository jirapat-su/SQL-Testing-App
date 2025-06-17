import { ColorSchemeScript } from '@mantine/core'

export default function HeadDefault() {
  return (
    <>
      <link href={'/CPE_LOGO.webp'} rel='icon' />
      <ColorSchemeScript defaultColorScheme='dark' />
    </>
  )
}
