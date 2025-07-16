/* eslint-disable ts/consistent-type-definitions */

import type { $Enums } from '@/src/libs/prisma/client'

type Role = {
  acceptRoles: Array<$Enums.UserRole>
}

declare module '@toolpad/core/AppProvider' {
  interface NavigationPageItem extends Role {}
}

export {}
