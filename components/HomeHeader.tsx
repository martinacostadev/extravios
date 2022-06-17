import {
  Box,
  Flex,
  Heading,
  Spacer,
  Text,
  Avatar,
  AvatarGroup,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0'

export default function HomeHeader() {
  const { user, error, isLoading } = useUser()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  const USER_PHOTO = user?.picture || 'https://placekitten.com/200/200'
  const USER_NAME = user?.name?.split(' ')[0] || ''

  return (
    <Flex minWidth="max-content" alignItems="center" marginTop={4}>
      <Heading
        display={'flex'}
        w={'100%'}
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
        <Spacer />
        <Box cursor="pointer">
          {!user ? (
            <>
              <Link href={'/api/auth/login'}>
                <Text fontSize="xl">Ingresar</Text>
              </Link>
            </>
          ) : (
            <Menu>
              <MenuButton>
                <AvatarGroup spacing="1rem">
                  <Avatar bg="red.500" src={USER_PHOTO} />
                  <Text fontSize="xl">{USER_NAME}</Text>
                </AvatarGroup>
              </MenuButton>
              <MenuList>
                <MenuItem fontSize="xl" lineHeight={'100%'}>
                  <Link href={'/api/auth/logout'}>Cerrar sesión</Link>
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Box>
      </Heading>
    </Flex>
  )
}
