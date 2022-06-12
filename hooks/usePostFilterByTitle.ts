import { server } from 'config'
import useSwr from 'swr'

export const usePostFilterByTitle = (value: string) => {
  const URL = `${server}/posts/?title=${value}`

  const { data, error } = useSwr(URL)

  return { data, error }
}
