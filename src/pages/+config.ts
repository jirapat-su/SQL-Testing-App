import type { Config } from 'vike/types'

import vikeReactZustand from 'vike-react-zustand/config'
import vikeReact from 'vike-react/config'

export default {
  extends: [vikeReact, vikeReactZustand],
  prerender: false,
  title: 'SQL Testing',
} satisfies Config
