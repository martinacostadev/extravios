import React from 'react'

import {
  Container,
  Box,
  Heading,
  Text,
  Flex,
  Spacer,
  Input,
  Button,
  Center,
} from '@chakra-ui/react'
import { Posts } from 'interfaces'

import { BsWhatsapp } from 'react-icons/bs'
import { BsFilterCircleFill } from 'react-icons/bs'
import { server } from 'config'

import debounce from 'just-debounce-it'

interface Props {
  postsData: Posts[]
}

export default function SplitWithImage({ postsData }: Props) {
  const [posts, setPosts] = React.useState(postsData)
  const [page, setPage] = React.useState(2)
  const searchInput = React.useRef<HTMLInputElement>(null)

  const handleSearch = debounce(() => {
    setPage(2)
    fetch(`${server}/posts/?title=${searchInput?.current?.value}`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data)
      })
  }, 500)

  const loadMore = async () => {
    setPage(page + 1)
    const res = await fetch(`${server}/posts?page=${page}`)
    const postsData = await res.json()
    setPosts((prev) => [...prev, ...postsData])
  }

  return (
    <Container py={4} centerContent>
      <Box padding="4" bg="#06141d" color="white" maxW="md" borderRadius={8}>
        <Flex minWidth="max-content" alignItems="center" marginTop={4}>
          <Heading
            fontWeight={600}
            fontSize={{ base: 'xl', sm: '2xl', md: '4xl' }}
            lineHeight={'150%'}
            marginBottom={4}
          >
            Extravíos
          </Heading>
          <Spacer />
          <BsFilterCircleFill size={24} />
        </Flex>
        {/* TODO: Filter Posts by Title using /api/posts?title=tarjeta */}
        <Input
          placeholder="Buscar por titulo"
          marginY={4}
          onChange={handleSearch}
          ref={searchInput}
        />
        {/* TODO: Add infinite scroll */}
        {posts?.map((post) => (
          <Box
            key={post.id}
            marginBottom={8}
            backgroundColor={'#1b2730'}
            borderRadius={8}
            padding={8}
          >
            <Box onClick={() => console.log('PostID: ', post?.id)}>
              <Heading
                fontWeight={600}
                fontSize={{ base: 'l', sm: 'xl', md: '2xl' }}
                lineHeight={'150%'}
              >
                {post.title}
              </Heading>
              <Text color={'gray.300'} marginTop={2}>
                {post.description}
              </Text>
            </Box>

            <Flex minWidth="max-content" alignItems="center" marginTop={4}>
              <BsWhatsapp size={24} />
              <Spacer />
              hace 3 hs
            </Flex>
          </Box>
        ))}
        <Center>
          <Button onClick={loadMore}>Cargar más</Button>
        </Center>
      </Box>
    </Container>
  )
}

export async function getServerSideProps() {
  const page = 1
  const res = await fetch(`${server}/posts/?page=${page}`)
  const postsData = await res.json()

  return { props: { postsData } }
}
