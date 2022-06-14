import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { server } from 'config'
import { Posts } from 'interfaces'
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'next-share'
import Link from 'next/link'
import React from 'react'
import { BsWhatsapp } from 'react-icons/bs'
import { FiShare2 } from 'react-icons/fi'
import { getTimeAgo } from 'utils/common'

interface Props {
  post: Posts
}

export default function PostItem({ post }: Props) {
  const PUBLISHED_TIME_AGO = getTimeAgo(Number(new Date(post?.createdAt)))

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
    <Center>
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
          w={'100%'}
          maxW={400}
        >
          <Box>
            <Flex alignItems="center">
              <Heading
                fontWeight={600}
                fontSize={{ base: 'xl', sm: 'xl', md: '2xl' }}
                lineHeight={'150%'}
                noOfLines={1}
              >
                {post.title}
              </Heading>
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
    </Center>
  )
}
