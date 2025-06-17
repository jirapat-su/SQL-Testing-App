import { NavLink } from '@mantine/core';
import { usePageContext } from 'vike-react/usePageContext';

export function Link({ href, label }: { href: string; label: string }) {
  const { urlPathname } = usePageContext()
  const isActive = href === '/' ? urlPathname === href : urlPathname.startsWith(href)

  return <NavLink active={isActive} href={href} label={label} />
}
