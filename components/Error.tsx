import { Box, Container, Heading, Link, Text } from '@chakra-ui/react'

interface Props {
  message: string
}

export default function Error({ message }: Props) {
  return (
    <Container p={24}>
      <Box>
        <Heading>Error</Heading>
        <Text py={8}>Error: {message}</Text>

        <Link href="/">
          <a>Volver a la página principal</a>
        </Link>
      </Box>
    </Container>
  )
}
