import { Flex, Heading } from '@chakra-ui/react'
import Link from 'next/link'

export default function HomeHeader() {
  return (
    <Flex minWidth="max-content" alignItems="center" marginTop={4}>
      <Heading
        fontWeight={600}
        fontSize={{ base: 'xl', sm: '2xl', md: '4xl' }}
        lineHeight={'150%'}
        marginBottom={4}
      >
        <Link
          href={{
            pathname: `/`,
          }}
        >
          Extravíos
        </Link>
      </Heading>
    </Flex>
  )
}
