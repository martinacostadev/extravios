import { ChakraProps, extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors: {
    bg: {
      light: '#FFFFFF',
      dark: '#13111C',
    },
    cyanBlue: '#06141d',
    white: '#f1f9fe',
    whiteLight: '#E7E7E7',
    grayVeryLight: '#212121',
    cyan: {
      50: '#f1f9fe',
      100: '#e3f0fb',
      200: '#c0e3f7',
      300: '#89cdf0',
      400: '#49b2e7',
      500: '#2299d5',
      600: '#147ab5',
      700: '#116293',
      800: '#12547a',
      900: '#06141d',
    },
  },
  fonts: {
    body: 'Inter-Regular, sans-serif',
    heading: 'Inter-SemiBold, sans-serif',
  },
  styles: {
    global: (props: ChakraProps) => ({
      'html, body': {
        height: '100%',
        maxHeight: '100vh',
        bgGradient: mode(
          'radial(circle at 2px 2px, whiteLight 2px, bg.light 0)',
          'radial(circle at 2px 2px, grayVeryLight 2px, bg.dark 0)'
        )(props),
        backgroundSize: '40px 40px',
        fontSize: '14px',
      },
    }),
  },
})

export default theme
