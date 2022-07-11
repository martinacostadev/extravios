import { Select } from '@chakra-ui/react'
import useProvinces from 'hooks/useProvinces'
import { Province } from 'interfaces/index'
import { ChangeEventHandler } from 'react'

export default function Provinces({
  onChange,
}: {
  onChange: ChangeEventHandler<HTMLSelectElement>
}) {
  const provinces = useProvinces()

  return (
    <Select placeholder="Seleccione Provincia" onChange={onChange}>
      {provinces?.map((province: Province) => (
        <option key={province.id} value={province.id}>
          {province.nombre}
        </option>
      ))}
    </Select>
  )
}
