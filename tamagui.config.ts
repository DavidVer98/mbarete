import { createTamagui } from '@tamagui/core'
import { createInterFont } from '@tamagui/font-inter'
import { shorthands } from '@tamagui/shorthands'
import { themes, tokens } from '@tamagui/themes'
import { createMedia } from '@tamagui/react-native-media-driver'
import { createAnimations } from '@tamagui/animations-react-native'

const headingFont = createInterFont()
const bodyFont = createInterFont()

// Define animations
const animations = createAnimations({
  bouncy: {
    type: 'spring',
    damping: 10,
    mass: 0.9,
    stiffness: 100,
  },
  lazy: {
    type: 'spring',
    damping: 20,
    stiffness: 60,
  },
  quick: {
    type: 'spring',
    damping: 20,
    mass: 1.2,
    stiffness: 250,
  },
  tooltip: {
    type: 'spring',
    damping: 15,
    mass: 0.5,
    stiffness: 200,
  },
})

const config = createTamagui({
  defaultTheme: 'light',
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,
  
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },

  tokens,
  themes,
  shorthands,
  animations,

  media: createMedia({
    xs: { maxWidth: 660 },
    sm: { maxWidth: 860 },
    md: { maxWidth: 980 },
    lg: { maxWidth: 1120 },
    xl: { maxWidth: 1280 },
    xxl: { maxWidth: 1420 },
    gtXs: { minWidth: 660 + 1 },
    gtSm: { minWidth: 860 + 1 },
    gtMd: { minWidth: 980 + 1 },
    gtLg: { minWidth: 1120 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  }),

  settings: {
    allowedStyleValues: 'somewhat-strict-web',
    disableRootThemeClass: false,
    disableThemeVariables: false,
    enableTokensInCss: true,
    disableSSR: true,
  }
})

export type AppConfig = typeof config

declare module '@tamagui/core' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config