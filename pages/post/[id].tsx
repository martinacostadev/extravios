// import { Posts } from 'interfaces'
import { GetStaticPropsContext } from 'next'

import { server } from 'config'
import { Posts } from 'interfaces'
import PostItem from 'components/PostItem'
import { Container, Center, Link } from '@chakra-ui/react'

interface Props {
  post: Posts
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
