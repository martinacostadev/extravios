import { Select } from '@chakra-ui/react'
import useCities from 'hooks/useCities'
import { City, CityProvince, Province } from 'interfaces/index'
import { ChangeEventHandler, useEffect, useState } from 'react'

export default function Cities({
  provinceId,
  onChange,
}: {
  provinceId: Province['id']
  onChange: ChangeEventHandler<HTMLSelectElement>
}) {
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
    <Select placeholder="Seleccione Ciudad" onChange={onChange}>
      {data?.map((city: City) => (
        <option key={city.id} value={city.id}>
          {city.nombre}
        </option>
      ))}
    </Select>
  )
}
