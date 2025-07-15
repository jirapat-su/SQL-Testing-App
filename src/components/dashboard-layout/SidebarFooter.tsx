import type { SidebarFooterProps } from '@toolpad/core/DashboardLayout'

import Typography from '@mui/material/Typography'

export function SidebarFooter({ mini }: SidebarFooterProps) {
  return (
    <Typography
      sx={{ m: 1, overflow: 'hidden', whiteSpace: 'nowrap' }}
      variant="caption"
    >
      {mini
        ? `${new Date().getFullYear()}`
        : `${new Date().getFullYear()} - CPE RMUTI`}
    </Typography>
  )
}
