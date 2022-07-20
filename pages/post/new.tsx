import { useUser } from '@auth0/nextjs-auth0'
import { Box, Button, Flex, Input, Stack, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { AutoResizeTextarea } from 'components/AutoResizeTextarea'
import Cities from 'components/Cities'
import Provinces from 'components/Provinces'
import { server } from 'config'
import { useFormik } from 'formik'
import { Province } from 'interfaces'
import { useState } from 'react'
import * as Yup from 'yup'

export default function New() {
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [provinceId, setProvinceId] = useState<Province['id']>('')
  const { user, error: userError, isLoading: userLoading } = useUser()
  const toast = useToast()

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      province: '',
      city: '',
      whatsApp: '',
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(10, 'Al menos 10 caracteres')
        .max(50, 'Máximo 50 caracteres')
        .required('Requerido'),
      description: Yup.string()
        .min(20, 'Al menos 20 caracteres')
        .max(250, 'Máximo 250 caracteres')
        .required('Requerido'),
      province: Yup.string().required('Requerido'),
      city: Yup.string().required('Requerido'),
      whatsApp: Yup.string()
        .min(6, 'Al menos 6 caracteres')
        .max(20, 'Máximo 20 caracteres')
        .required('Requerido'),
    }),
    onSubmit: (values, { resetForm }) => {
      setLoading(true)
      setError('')

      const userId = user ? user.sub?.split('|')[1] : undefined

      const formValues = {
        ...values,
        userId,
      }

      const URL = `${server}/posts`
      axios
        .post(URL, formValues)
        .then(function () {
          resetForm()
          toast({
            position: 'top',
            title: '¡Extravío creado!',
            description: 'Tu publicación fue creada con éxito.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
        })
        .catch(function (error) {
          setError(error?.message)
        })
        .finally(() => {
          setLoading(false)
        })
    },
  })

  const handleProvince = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const provinceId = e.target.value
    const provinceName = e.target.options[e.target.selectedIndex].text
    setProvinceId(provinceId)
    formik.setFieldValue('province', provinceName)
    formik.setFieldValue('city', '')
  }

  const handleCity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cityName = e.target.options[e.target.selectedIndex].text
    formik.setFieldValue('city', cityName)
  }

  if (userLoading) return <div>Loading...</div>
  if (userError) return <div>{userError.message}</div>

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
      backgroundColor={'bg.dark'}
    >
      <h2>Nuevo Extravío</h2>

      <form onSubmit={formik.handleSubmit}>
        <Stack w={'md'} mt={4}>
          <Input
            placeholder="Título"
            size="md"
            id="title"
            name="title"
            onChange={formik.handleChange}
            value={formik.values.title}
          />
          {formik.touched.title && formik.errors.title ? (
            <Box color={'red.600'}>{formik.errors.title}</Box>
          ) : null}
          <AutoResizeTextarea
            placeholder="Descripción"
            size="md"
            id="description"
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
          {formik.touched.description && formik.errors.description ? (
            <Box color={'red.600'}>{formik.errors.description}</Box>
          ) : null}

          <Provinces onChange={handleProvince} />

          {formik.touched.province && formik.errors.province ? (
            <Box color={'red.600'}>{formik.errors.province}</Box>
          ) : null}

          <Cities provinceId={provinceId} onChange={handleCity} />

          {/* <Input
            placeholder="Ciudad"
            size="md"
            id="city"
            name="city"
            onChange={formik.handleChange}
            value={formik.values.city}
          /> */}
          {formik.touched.city && formik.errors.city ? (
            <Box color={'red.600'}>{formik.errors.city}</Box>
          ) : null}
          <Input
            placeholder="WhatsApp"
            size="md"
            id="whatsApp"
            name="whatsApp"
            onChange={formik.handleChange}
            value={formik.values.whatsApp}
          />
          {formik.touched.whatsApp && formik.errors.whatsApp ? (
            <Box color={'red.600'}>{formik.errors.whatsApp}</Box>
          ) : null}
          <Button isLoading={loading} colorScheme="blue" type="submit">
            Publicar
          </Button>
          {error ? <Box color="red.600">{error}</Box> : null}
        </Stack>
      </form>
    </Flex>
  )
}
