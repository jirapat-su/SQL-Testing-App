import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  breakpoints: {
    values: {
      lg: 1200,
      md: 900,
      sm: 600,
      xl: 1536,
      xs: 0,
    },
  },
  colorSchemes: { dark: true, light: true },
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  typography: {
    fontFamily: 'Sarabun,  sans-serif',
  },
})

export { theme }
