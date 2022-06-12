import { Box, Container, Heading, Link, Text } from '@chakra-ui/react'

interface Props {
  statusCode: number
}

export default function Error({ statusCode }: Props) {
  return (
    <Container>
      <Box>
        <Heading>Error</Heading>
        <Text>
          Error: {statusCode}
          <Link href="/">
            <a>Volver a la página principal</a>
          </Link>
        </Text>
      </Box>
    </Container>
  )
}
