// import { Posts } from 'interfaces'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'

import {
  Box,
  Button,
  Center,
  Container,
  Link,
  useToast,
} from '@chakra-ui/react'
import PostItem from 'components/PostItem'
import { server } from 'config'
import { Post } from 'interfaces'
import { useMutation, useQueryClient } from 'react-query'

import axios from 'axios'
import { MdDelete } from 'react-icons/md'

interface Props {
  post: Post
}

export default function PostDetail({ post }: Props) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const toast = useToast()

  const { isLoading: isDeletingPost, mutate: deleteMutation } = useMutation(
    () => axios.delete(`${server}/posts/${post?.id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries()
        toast({
          title: '¡Publicación eliminada con éxito!',
          status: 'info',
          duration: 10000,
          isClosable: true,
        })
        router.push('/')
      },
    }
  )

  const handleDelete = () => {
    try {
      deleteMutation()
    } catch (err) {
      let errorMessage = 'Error inesperado'
      if (err instanceof Error) {
        errorMessage = err?.message
      }

      const message = errorMessage

      toast({
        title: `¡Ups! Ha ocurrido un error`,
        description: message,
        status: 'error',
        isClosable: true,
      })
    }
  }

  return (
    <Container py={16}>
      <Box display={'flex'} flexDirection="column" px={16} mb={8}>
        <PostItem key={post?.id} post={post} />

        <Button
          width={'100%'}
          leftIcon={<MdDelete />}
          colorScheme="red"
          variant="solid"
          onClick={handleDelete}
          disabled={isDeletingPost}
        >
          Eliminar
        </Button>
      </Box>
      <Center>
        <Link href="/">
          <a>Volver</a>
        </Link>
      </Center>
    </Container>
  )
}

export async function getServerSideProps(context: GetStaticPropsContext) {
  const ID = context?.params?.id

  const res = await fetch(`${server}/posts/${ID}`)
  const post = await res.json()

  return { props: { post } }
}
