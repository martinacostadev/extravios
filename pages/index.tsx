import React, { forwardRef } from 'react'
import Link from 'next/link'

import {
  Container,
  Box,
  Heading,
  Text,
  Flex,
  Input,
  Button,
  Center,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import { Posts } from 'interfaces'

import { BiSearch } from 'react-icons/bi'

import { server } from 'config'

import debounce from 'just-debounce-it'

import Error from 'next/error'

import PostItem from 'components/PostItem'

interface Props {
  response: {
    rows: Posts[]
    count: number
  }
  errorCode: number
}

const HomeSearch = forwardRef<HTMLInputElement, { onChange: VoidFunction }>(
  ({ onChange }, ref) => {
    return (
      <InputGroup>
        <InputLeftElement pointerEvents="none" mt={4} ml={1} pr={1}>
          <BiSearch size={22} opacity={0.8} />
        </InputLeftElement>
        <Input
          placeholder="Buscar por título..."
          _placeholder={{ opacity: 0.8, color: 'cyan.100' }}
          color="white"
          fontSize="1.1em"
          marginY={4}
          onChange={onChange}
          ref={ref}
        />
      </InputGroup>
    )
  }
)

export default function Home({ response, errorCode }: Props) {
  const { count, rows } = response

  const [posts, setPosts] = React.useState(rows)
  const [page, setPage] = React.useState(2)
  const topRef = React.useRef<HTMLInputElement>(null)
  const searchInput = React.useRef<HTMLInputElement>(null)

  const SHOW_MORE_BUTTON = count > posts?.length
  const IS_SEARCHING = Boolean(searchInput.current?.value?.length)

  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  const handleSearch = debounce(() => {
    setPage(2)
    const URL = `${server}/posts/?title=${searchInput?.current?.value}`
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.rows)
      })
  }, 500)

  const handleGoTop = () => {
    topRef?.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const loadMore = async () => {
    setPage(page + 1)
    const res = await fetch(`${server}/posts?page=${page}`)
    const response = await res.json()
    const postsData = response.rows
    setPosts((prev) => [...prev, ...postsData])
  }

  return (
    <Container py={4} centerContent>
      <Box
        padding="4"
        bg="cyan-900"
        color="white"
        maxW="md"
        borderRadius={8}
        ref={topRef}
      >
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
        <HomeSearch ref={searchInput} onChange={handleSearch} />

        {posts?.map((post) => (
          <PostItem key={post?.id} post={post} />
        ))}

        <Center display="flex" flexDirection={'column'} gap={10}>
          {SHOW_MORE_BUTTON && !IS_SEARCHING && (
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
      </Box>
    </Container>
  )
}

export async function getServerSideProps() {
  const page = 1
  const res = await fetch(`${server}/posts/?page=${page}`)
  const errorCode = res.ok ? false : res?.status
  const response = await res.json()

  return { props: { response, errorCode } }
}
