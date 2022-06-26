// import { Posts } from 'interfaces'
import { GetStaticPropsContext } from 'next'

import { Center, Container, Link } from '@chakra-ui/react'
import PostItem from 'components/PostItem'
import { server } from 'config'
import { Post } from 'interfaces'

interface Props {
  post: Post
}

export default function PostDetail({ post }: Props) {
  return (
    <Container py={16}>
      <PostItem key={post?.id} post={post} />
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
