import { ChakraProps, extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors: {
    bg: {
      dark: '#12101C',
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
        background: mode(
          'radial-gradient(circle at 2px 2px, #E7E7E7 2px, #FFFFFF 0)',
          'radial-gradient(circle at 2px 2px, #212121 2px, #13111C 0)'
        )(props),
        backgroundSize: '40px 40px',
        fontSize: '14px',
      },
    }),
  },
})

export default theme
