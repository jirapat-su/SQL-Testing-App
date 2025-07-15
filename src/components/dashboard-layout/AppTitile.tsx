import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Image from 'next/image'

import pkg from '@/package.json'

export function AppTitle() {
  return (
    <Stack alignItems="center" direction="row" spacing={2}>
      <Image
        alt="CPE_LOGO"
        height={32}
        src="/images/CPE_LOGO.webp"
        width={32}
      />

      <Typography className="max-sm:hidden" variant="h6">
        SQL Testing
      </Typography>
      <Chip color="primary" label={`V${pkg.version}`} size="small" />
    </Stack>
  )
}
