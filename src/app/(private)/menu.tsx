import type { Navigation } from '@toolpad/core/AppProvider'

import AssignmentIcon from '@mui/icons-material/Assignment'
import HomeIcon from '@mui/icons-material/Home'
import StorageIcon from '@mui/icons-material/Storage'

import { $Enums } from '@/src/libs/prisma/client'

export const MENU_ITEMS: Navigation = [
  {
    kind: 'header',
    title: 'Menus',
  },
  {
    acceptRoles: [$Enums.UserRole.TEACHER, $Enums.UserRole.STUDENT],
    icon: <HomeIcon />,
    segment: '',
    title: 'หน้าหลัก',
  },
  {
    acceptRoles: [$Enums.UserRole.TEACHER, $Enums.UserRole.STUDENT],
    icon: <StorageIcon />,
    segment: 'database',
    title: 'ฐานข้อมูล',
  },
  {
    acceptRoles: [$Enums.UserRole.TEACHER],
    icon: <AssignmentIcon />,
    segment: 'exam-management',
    title: 'ข้อสอบ',
  },
]
