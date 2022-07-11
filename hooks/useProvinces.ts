import { provinces } from 'services/provinces'

const useProvinces = () => {
  const data = provinces.sort((a, b) => a.nombre.localeCompare(b.nombre))

  return data
}

export default useProvinces
