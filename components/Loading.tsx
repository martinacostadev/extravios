import { Container, Text } from '@chakra-ui/react'
import { LeapFrog } from '@uiball/loaders'

export default function Loading() {
  return (
    <Container p={24} centerContent>
      <LeapFrog size={48} speed={2.5} color="white" />
      <Text fontSize={24} fontWeight={600}>
        Cargando...
      </Text>
    </Container>
  )
}
