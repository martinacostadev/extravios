// import { Posts } from 'interfaces'
import { GetStaticPropsContext } from 'next'

import { Container } from '@chakra-ui/react'
import { server } from 'config'
import { Posts } from 'interfaces'

interface Props {
  postsData: Posts
}

export default function PostDetail({ postsData }: Props) {
  const { title, description, whatsApp } = postsData

  return (
    <Container py={4} centerContent color="white" fontSize={'3xl'}>
      <h1>{title}</h1>
      <p>{description}</p>
      <p>{whatsApp}</p>
    </Container>
  )
}

export async function getServerSideProps(context: GetStaticPropsContext) {
  const ID = context?.params?.id

  const res = await fetch(`${server}/posts/${ID}`)
  const postsData = await res.json()

  return { props: { postsData } }
}
