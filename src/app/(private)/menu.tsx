import type { Navigation } from '@toolpad/core/AppProvider'

import HomeIcon from '@mui/icons-material/Home'
import StorageIcon from '@mui/icons-material/Storage'

export const MENU_ITEMS: Navigation = [
  {
    kind: 'header',
    title: 'Menus',
  },
  { icon: <HomeIcon />, segment: '', title: 'Home' },
  { icon: <StorageIcon />, segment: 'database', title: 'Database' },
]
