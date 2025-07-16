import type { Navigation } from '@toolpad/core/AppProvider'

import AssignmentIcon from '@mui/icons-material/Assignment'
import EditCalendarIcon from '@mui/icons-material/EditCalendar'
import GroupsIcon from '@mui/icons-material/Groups'
import HomeIcon from '@mui/icons-material/Home'
import PersonSearchIcon from '@mui/icons-material/PersonSearch'
import StorageIcon from '@mui/icons-material/Storage'

import { $Enums } from '@/src/libs/prisma/client'

export const MENU_ITEMS: Navigation = [
  {
    kind: 'header',
    title: 'Menus',
  },
  // Common for all roles
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
  // Teacher only
  {
    acceptRoles: [$Enums.UserRole.TEACHER],
    icon: <EditCalendarIcon />,
    pattern: 'exam-system{/:subMenu}*',
    segment: 'exam-system',
    title: 'ระบบสอบ',
  },
  {
    acceptRoles: [$Enums.UserRole.TEACHER],
    icon: <AssignmentIcon />,
    pattern: 'exam-management{/:subMenu}*',
    segment: 'exam-management',
    title: 'คลังข้อสอบ',
  },
  {
    acceptRoles: [$Enums.UserRole.TEACHER],
    icon: <GroupsIcon />,
    pattern: 'student-group{/:subMenu}*',
    segment: 'student-group',
    title: 'กลุ่มเรียน',
  },
  {
    acceptRoles: [$Enums.UserRole.TEACHER],
    icon: <PersonSearchIcon />,
    pattern: 'user-management{/:subMenu}*',
    segment: 'user-management',
    title: 'ผู้ใช้งาน',
  },
]
