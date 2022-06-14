// import { Posts } from 'interfaces'
import { GetStaticPropsContext } from 'next'

import { server } from 'config'
import { Posts } from 'interfaces'
import PostItem from 'components/PostItem'
import { Container } from '@chakra-ui/react'

interface Props {
  post: Posts
}

export default function PostDetail({ post }: Props) {
  return (
    <Container paddingTop={16}>
      <PostItem key={post?.id} post={post} />
    </Container>
  )
}

export async function getServerSideProps(context: GetStaticPropsContext) {
  const ID = context?.params?.id

  const res = await fetch(`${server}/posts/${ID}`)
  const post = await res.json()

  return { props: { post } }
}
