import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { UserProvider } from '@auth0/nextjs-auth0'

import theme from 'theme'

import 'styles/globals.css'
import React from 'react'
import Layout from 'components/Layout'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <UserProvider>
        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </UserProvider>
    </>
  )
}

export default App
