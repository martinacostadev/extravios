import { cities } from 'services/cities'

const useCities = () => {
  const data = cities.sort((a, b) => a.nombre.localeCompare(b.nombre))

  return data
}

export default useCities
