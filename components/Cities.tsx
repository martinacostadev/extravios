import { Select } from '@chakra-ui/react'
import useCities from 'hooks/useCities'
import { City, CityProvince, Province } from 'interfaces/index'
import { useEffect, useState } from 'react'

export default function Cities({ provinceId }: { provinceId: Province['id'] }) {
  const cities = useCities()
  const [data, setData] = useState<CityProvince['ciudades']>([])

  useEffect(() => {
    const filter = cities.filter(
      (city: CityProvince) => Number(city.id) === Number(provinceId)
    )
    const result = filter[0]?.ciudades

    setData(result)
  }, [cities, provinceId])

  return (
    <Select placeholder="Seleccione Ciudad">
      {data?.map((city: City) => (
        <option key={city.id} value={city.id}>
          {city.nombre}
        </option>
      ))}
    </Select>
  )
}
