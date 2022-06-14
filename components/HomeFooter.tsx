import { Center, Button, Text } from '@chakra-ui/react'

interface Props {
  loadMore: () => void
  showMoreButton: boolean
  isSearching: boolean
  handleGoTop: () => void
}

export default function HomeFooter({
  loadMore,
  showMoreButton,
  isSearching,
  handleGoTop,
}: Props) {
  return (
    <Center display="flex" flexDirection={'column'} gap={10}>
      {showMoreButton && !isSearching && (
        <Button
          onClick={loadMore}
          fontWeight="light"
          backgroundColor={'cyan.800'}
          _hover={{
            backgroundColor: 'cyan.600',
          }}
        >
          Cargar más...
        </Button>
      )}
      <Text
        onClick={handleGoTop}
        fontSize={14}
        fontWeight="light"
        variant="ghost"
        cursor={'pointer'}
      >
        Volver al inicio
      </Text>
    </Center>
  )
}
