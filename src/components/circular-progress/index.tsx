import { Box, CircularProgress as MUICircularProgress } from '@mui/material'

type CircularProgressProps = {
  isFullScreen?: boolean
}

function GradientDefs() {
  return (
    <svg height={0} width={0}>
      <defs>
        <linearGradient id="custom_gradient" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#e01cd5" />
          <stop offset="100%" stopColor="#1CB5E0" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function CircularProgress({ isFullScreen = false }: CircularProgressProps) {
  const content = (
    <>
      <GradientDefs />
      <MUICircularProgress size={60} sx={{ 'svg circle': { stroke: 'url(#custom_gradient)' } }} />
    </>
  )

  if (isFullScreen) {
    return (
      <Box className="fixed inset-0 flex items-center justify-center bg-black/90 z-[999999]">
        {content}
      </Box>
    )
  }

  return (
    <Box className="flex items-center justify-center">
      {content}
    </Box>
  )
}

export { CircularProgress }
