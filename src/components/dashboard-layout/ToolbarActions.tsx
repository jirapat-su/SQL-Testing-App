'use client'

import Logout from '@mui/icons-material/Logout'
import Settings from '@mui/icons-material/Settings'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { ThemeSwitcher } from '@toolpad/core/DashboardLayout'
import { useRouter } from 'next/navigation'
import { Fragment, useCallback, useState } from 'react'

import { authClient } from '@/src/libs/better-auth/client'

import { CircularProgress } from '../circular-progress'

function getFirstConsonant(name?: string) {
  if (!name) return ''

  const thaiConsonants = /[\u0E01-\u0E2E]/
  const englishLetters = /[a-z]/i

  for (const char of name) {
    if (thaiConsonants.test(char) || englishLetters.test(char)) {
      return char.toUpperCase()
    }
  }

  return name.charAt(0).toUpperCase()
}

export function ToolbarActions() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { data: session } = authClient.useSession()

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)

  const handleMenuClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget)
    },
    []
  )

  const handleClose = useCallback(
    (menu: 'settings' | 'sign-out' | undefined = undefined) =>
      async () => {
        setAnchorEl(null)
        if (!menu) return

        switch (menu) {
          case 'settings': {
            break
          }

          case 'sign-out': {
            setLoading(true)

            await authClient.signOut({
              fetchOptions: {
                onSuccess: async () => {
                  router.push('/sign-in')
                  setLoading(false)
                },
              },
            })

            break
          }
        }
      },
    [router]
  )

  return (
    <Fragment>
      {loading && <CircularProgress isFullScreen />}

      <Stack alignItems="center" direction="row">
        <ThemeSwitcher />

        <Stack
          aria-controls={open ? 'account-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          className="items-center gap-2 hover:cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-800 p-2 rounded-md"
          direction="row"
          onClick={handleMenuClick}
        >
          <Avatar sx={{ height: 32, width: 32 }}>
            {getFirstConsonant(session?.user.name)}
          </Avatar>
          <Typography className="max-sm:hidden">
            {session?.user.name}
          </Typography>
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
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                overflow: 'visible',
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem disabled sx={{ minWidth: 200 }}>
            {session?.user.name}
          </MenuItem>

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
      </Stack>
    </Fragment>
  )
}
