import { AppShell, Burger, Group, Image } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { Link } from '@/src/components/Link'

export default function ProtectLayout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure()

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
        width: 300,
      }}
    >
      <AppShell.Header>
        <Group h='100%' px='md'>
          <Burger hiddenFrom='sm' onClick={toggle} opened={opened} size='sm' />
          <a href='/'>
            <Image fit='contain' h={40} src={'/CPE_LOGO.webp'} />
          </a>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar>
        <Link href='/home' label='Home' />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  )
}
