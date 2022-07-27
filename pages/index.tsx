import { useUser } from '@auth0/nextjs-auth0'
import { Box, Container } from '@chakra-ui/react'
import debounce from 'just-debounce-it'
import React, { useEffect } from 'react'

import { server } from 'config'

import Error from 'components/Error'
import HomeFooter from 'components/HomeFooter'
import HomeHeader from 'components/HomeHeader'
import { InputSearch } from 'components/InputSearch'
import Loading from 'components/Loading'
import PostItem from 'components/PostItem'
import { Post } from 'interfaces'
import { useQuery } from 'react-query'

interface ApiResponse {
  count: number
  rows: Post[]
}

export default function Home() {
  const [posts, setPosts] = React.useState<ApiResponse['rows']>([])
  const [page, setPage] = React.useState(2)
  const topRef = React.useRef<HTMLInputElement>(null)
  const searchInput = React.useRef<HTMLInputElement>(null)

  const { user, error: errorUser, isLoading: isLoadingUser } = useUser()

  const userId = user ? user.sub?.split('|')[1] : null

  const { isLoading, error, data } = useQuery<ApiResponse, Error>(
    'posts',
    () =>
      fetch(`${server}/posts/?page=${page}&userId=${userId}`).then((res) =>
        res.json()
      ),
    {
      enabled: userId != null,
    }
  )

  useEffect(() => {
    if (data) {
      setPosts(data?.rows)
    }
  }, [data])

  if (isLoadingUser || isLoading) return <Loading />

  if (errorUser) return <div>{errorUser.message}</div>

  if (error) {
    return <Error message={'An error has occurred: ' + error.message} />
  }

  const SHOW_MORE_BUTTON = data ? data?.count > data?.rows?.length : false
  const IS_SEARCHING = Boolean(searchInput.current?.value?.length)

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
        <HomeHeader />

        <InputSearch ref={searchInput} onChange={handleSearch} />

        {posts &&
          posts.map((post: Post) => <PostItem key={post?.id} post={post} />)}

        <HomeFooter
          loadMore={loadMore}
          showMoreButton={SHOW_MORE_BUTTON}
          isSearching={IS_SEARCHING}
          handleGoTop={handleGoTop}
        />
      </Box>
    </Container>
  )
}
