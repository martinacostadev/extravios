import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

import theme from 'theme'

import 'styles/globals.css'
import React from 'react'
import Layout from 'components/Layout'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>
  )
}

export default App
