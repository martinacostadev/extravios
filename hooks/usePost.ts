import { server } from 'config'
import { useState, useEffect } from 'react'

const usePost = (page: number) => {
  const API_URL = `${server}/posts/${page}`
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setData(data))
  }, [page, API_URL])

  return [data]
}

export default usePost
