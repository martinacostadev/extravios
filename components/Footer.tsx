import { Box } from '@chakra-ui/react'

export default function Footer() {
  return (
    <Box
      color={'gray.400'}
      as="footer"
      display={'flex'}
      justifyContent={'center'}
      py={4}
    >
      <small>© 2022 Extravíos</small>
    </Box>
  )
}
