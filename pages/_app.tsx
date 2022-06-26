import { UserProvider } from '@auth0/nextjs-auth0'
import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'

import theme from 'theme'

import Layout from 'components/Layout'
import 'styles/globals.css'

const queryClient = new QueryClient()

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <UserProvider>
        <ChakraProvider theme={theme}>
          <Layout>
            <QueryClientProvider client={queryClient}>
              <Component {...pageProps} />
            </QueryClientProvider>
          </Layout>
        </ChakraProvider>
      </UserProvider>
    </>
  )
}

export default App
