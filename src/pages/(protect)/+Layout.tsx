import type { Navigation } from '@toolpad/core/AppProvider'
import type { SidebarFooterProps } from '@toolpad/core/DashboardLayout'

import HomeIcon from '@mui/icons-material/Home'
import Logout from '@mui/icons-material/Logout'
import Settings from '@mui/icons-material/Settings'
import StorageIcon from '@mui/icons-material/Storage'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { AppProvider } from '@toolpad/core/AppProvider'
import { DashboardLayout, ThemeSwitcher } from '@toolpad/core/DashboardLayout'
import { useCallback, useState } from 'react'
import { usePageContext } from 'vike-react/usePageContext'
import { navigate } from 'vike/client/router'

import { CircularProgress } from '@/src/components/circular-progress'
import { authClient } from '@/src/libs/better-auth/client'
import { getFirstConsonant } from '@/src/utils/get-first-consonant'

import { theme } from '../theme'

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Menus',
  },
  { icon: <HomeIcon />, segment: 'home', title: 'Home' },
  { icon: <StorageIcon />, segment: 'database', title: 'Database' },
]

export default function ProtectLayout({ children }: { children: React.ReactNode }) {
  const { urlParsed, urlPathname } = usePageContext()
  const appWindow = typeof window !== 'undefined' ? window : undefined

  return (
    <AppProvider
      key="protect-layout"
      navigation={NAVIGATION}
      router={{
        navigate: (url: string | URL) => navigate(typeof url === 'string' ? url : url.toString()),
        pathname: urlPathname,
        searchParams: new URLSearchParams(urlParsed?.searchOriginal ?? ''),
      }}
      theme={theme}
      window={appWindow}
    >
      <DashboardLayout
        slots={{
          appTitle: CustomAppTitle,
          sidebarFooter: SidebarFooter,
          toolbarActions: ToolbarActions,
        }}
      >
        {children}
      </DashboardLayout>
    </AppProvider>
  )
}

function CustomAppTitle() {
  return (
    <Stack alignItems="center" direction="row" spacing={2}>
      <img alt="CPE_LOGO" height={32} src="/CPE_LOGO.webp" width={32} />
      <Typography className="max-sm:hidden" variant="h6">
        SQL Testing
      </Typography>
      <Chip color="primary" label="BETA" size="small" />
    </Stack>
  )
}

function SidebarFooter({ mini }: SidebarFooterProps) {
  return (
    <Typography sx={{ m: 1, overflow: 'hidden', whiteSpace: 'nowrap' }} variant="caption">
      {mini ? `${new Date().getFullYear()}` : `${new Date().getFullYear()} - CPE RMUTI`}
    </Typography>
  )
}

function ToolbarActions() {
  const [loading, setLoading] = useState(false)
  const { data: session } = authClient.useSession()

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = useCallback((menu: 'settings' | 'sign-out' | undefined = undefined) =>
    async () => {
      setAnchorEl(null)
      if (!menu)
        return

      switch (menu) {
        case 'settings': {
          break
        }

        case 'sign-out': {
          setLoading(true)

          await authClient.signOut({
            fetchOptions: {
              onSuccess: async () => {
                await navigate('/sign-in')
                setLoading(false)
              },
            },
          })

          break
        }
      }
    }, [])

  return (
    <>
      {loading && <CircularProgress isFullScreen />}

      <Stack alignItems="center" direction="row">
        <Stack
          aria-controls={open ? 'account-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          className="items-center gap-2 hover:cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-800 p-2 rounded-md"
          direction="row"
          onClick={handleClick}
        >
          <Avatar sx={{ height: 32, width: 32 }}>{getFirstConsonant(session?.user.name)}</Avatar>
          <Typography className="max-sm:hidden">{session?.user.name}</Typography>
        </Stack>

        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          id="account-menu"
          onClick={handleClose()}
          onClose={handleClose()}
          open={open}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                '&::before': {
                  bgcolor: 'background.paper',
                  content: '""',
                  display: 'block',
                  height: 10,
                  position: 'absolute',
                  right: 14,
                  top: 0,
                  transform: 'translateY(-50%) rotate(45deg)',
                  width: 10,
                  zIndex: 0,
                },
                '& .MuiAvatar-root': {
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                  width: 32,
                },
                'filter': 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                'mt': 1.5,
                'overflow': 'visible',
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem disabled>{session?.user.name}</MenuItem>

          <Divider />

          <MenuItem onClick={handleClose('settings')}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={handleClose('sign-out')}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Sign out
          </MenuItem>
        </Menu>

        <ThemeSwitcher />
      </Stack>
    </>
  )
}
