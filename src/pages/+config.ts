import type { Config } from 'vike/types'

import vikeReact from 'vike-react/config'

export default {
  extends: [vikeReact],
  prerender: false,
  title: 'SQL Testing App',
} satisfies Config
