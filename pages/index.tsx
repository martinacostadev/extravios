import React, { forwardRef } from 'react'
import Link from 'next/link'

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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  ModalFooter,
  IconButton,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import { Posts } from 'interfaces'

import { BsWhatsapp } from 'react-icons/bs'
import { FiShare2 } from 'react-icons/fi'
import { BiSearch } from 'react-icons/bi'

import { server } from 'config'

import debounce from 'just-debounce-it'
import { getTimeAgo } from 'utils/common'

import Error from 'next/error'

import {
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'next-share'

interface Props {
  postsData: Posts[]
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

export default function Home({ postsData, errorCode }: Props) {
  const [posts, setPosts] = React.useState(postsData)
  const [page, setPage] = React.useState(2)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [modalInfo, setModalInfo] = React.useState({
    title: '',
    description: '',
    whatsApp: '',
    url: '',
  })

  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="80%"
      backdropBlur="2px"
    />
  )

  const [overlay, setOverlay] = React.useState(<OverlayTwo />)
  const searchInput = React.useRef<HTMLInputElement>(null)

  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  const handleSearch = debounce(() => {
    setPage(2)
    const URL = `${server}/posts/?title=${searchInput?.current?.value}`
    fetch(URL)
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

  const handleWhatsApp = (
    event: React.MouseEvent<HTMLButtonElement>,
    title: string
  ) => {
    event.preventDefault()
    const MESSAGE = title.replace(' ', '%20')

    const url = `https://wa.me/5211234567890?text=Hola!%20Vi%20tu%20pubilacion%20${MESSAGE}`
    window.open(url, '_blank')
  }

  const handleShare = (
    event: React.MouseEvent<HTMLButtonElement>,
    post: Posts
  ) => {
    event.preventDefault()
    const postData = {
      title: post?.title,
      description: post?.description,
      whatsApp: post?.whatsApp,
      url: `${server}/post/${post?.id}`,
    }
    setModalInfo(postData)
    setOverlay(<OverlayTwo />)
    onOpen()
  }

  return (
    <Container py={4} centerContent>
      <Modal size="sm" isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Compartir</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex minWidth="max-content" justifyContent="center" gap={4} p={4}>
              <FacebookShareButton
                url={modalInfo?.url}
                quote={modalInfo?.description}
                hashtag={'#nextshare'}
              >
                <FacebookIcon size={48} round />
              </FacebookShareButton>

              <WhatsappShareButton
                url={modalInfo?.url}
                title={modalInfo?.title}
                separator=":: "
              >
                <WhatsappIcon size={48} round />
              </WhatsappShareButton>

              <TwitterShareButton url={modalInfo?.url} title={modalInfo?.title}>
                <TwitterIcon size={48} round />
              </TwitterShareButton>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Cerrar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box padding="4" bg="cyan-900" color="white" maxW="md" borderRadius={8}>
        <Flex minWidth="max-content" alignItems="center" marginTop={4}>
          <Heading
            fontWeight={600}
            fontSize={{ base: 'xl', sm: '2xl', md: '4xl' }}
            lineHeight={'150%'}
            marginBottom={4}
          >
            Extravíos
          </Heading>
        </Flex>
        <HomeSearch ref={searchInput} onChange={handleSearch} />

        {posts?.map((post) => {
          const PUBLISHED_TIME_AGO = getTimeAgo(
            Number(new Date(post?.createdAt))
          )

          return (
            <Link
              key={post.id}
              href={{
                pathname: `/post/${post?.id}`,
                query: {
                  title: post?.title,
                  description: post?.description,
                  whatsApp: post?.whatsApp,
                },
              }}
            >
              <Box
                marginBottom={8}
                bgGradient="linear(to-bl, cyan.600, cyan.800)"
                _hover={{
                  bgGradient: 'linear(to-l, cyan.800, cyan.800)',
                  color: 'cyan.400',
                }}
                borderRadius={8}
                padding={8}
                cursor="pointer"
              >
                <Box>
                  <Flex alignItems="center">
                    <Heading
                      fontWeight={600}
                      fontSize={{ base: 'l', sm: 'xl', md: '2xl' }}
                      lineHeight={'150%'}
                      noOfLines={1}
                    >
                      {/* <Link
                      href={{
                        pathname: `/post/${post?.id}`,
                        query: {
                          title: post?.title,
                          description: post?.description,
                          whatsApp: post?.whatsApp,
                        },
                      }}
                    > */}
                      {post.title}
                      {/* </Link> */}
                    </Heading>
                    {/* <Spacer />
                  <Button onClick={() => handleShare(post)}>
                    <FiShare2 size={24} />
                  </Button> */}
                  </Flex>
                  <Text color={'cyan.100'} marginTop={2}>
                    {post.description}
                  </Text>
                </Box>

                <Flex alignItems="center" marginTop={8}>
                  <IconButton
                    icon={<BsWhatsapp size={24} />}
                    aria-label="Escribir mensaje vía WhatsApp"
                    onClick={(e) => handleWhatsApp(e, post.title)}
                    variant="ghost"
                    size={'sm'}
                    mr={4}
                  />
                  <IconButton
                    icon={<FiShare2 size={24} />}
                    aria-label="Compartir en redes sociales"
                    onClick={(e) => handleShare(e, post)}
                    variant="ghost"
                    size={'sm'}
                  />
                  <Spacer />
                  {PUBLISHED_TIME_AGO}
                </Flex>
              </Box>
            </Link>
          )
        })}
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
  const errorCode = res.ok ? false : res?.status
  const postsData = await res.json()

  return { props: { postsData, errorCode } }
}
