import { Button, Flex, Input, Stack } from '@chakra-ui/react'
import axios from 'axios'
import { server } from 'config'
import { useFormik } from 'formik'

export default function New() {
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      city: '',
      whatsApp: '',
    },
    onSubmit: (values, { resetForm }) => {
      console.log('VALUES: ', values)
      const URL = `${server}/posts`
      axios
        .post(URL, values)
        .then(function (response) {
          console.log(response)
          resetForm()
        })
        .catch(function (error) {
          console.log(error)
        })
    },
  })

  return (
    <Flex
      minWidth="max-content"
      alignItems="center"
      gap="2"
      borderWidth="1px"
      borderRadius="lg"
      margin={8}
      padding={8}
      justifyContent="center"
      flexDirection="column"
    >
      <h2>Nuevo Extravío</h2>

      <form onSubmit={formik.handleSubmit}>
        <Stack w={'md'} mt={4} gap={4}>
          <Input
            placeholder="Título"
            size="md"
            id="title"
            name="title"
            onChange={formik.handleChange}
            value={formik.values.title}
          />
          <Input
            placeholder="Descripción"
            size="md"
            id="description"
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
          <Input
            placeholder="Ciudad"
            size="md"
            id="city"
            name="city"
            onChange={formik.handleChange}
            value={formik.values.city}
          />
          <Input
            placeholder="WhatsApp"
            size="md"
            id="whatsApp"
            name="whatsApp"
            onChange={formik.handleChange}
            value={formik.values.whatsApp}
          />
          <Button colorScheme="blue" type="submit">
            Publicar
          </Button>
        </Stack>
      </form>
    </Flex>
  )
}
