import { useState, useEffect } from 'react'

const useFetch = (url) => {
  const [response, setResponse] = useState(null) // null
  const [error, setError] = useState(null) // null
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)
      try {
        const _response = await fetch(url)
        const _responseJson = await _response.json()
        setResponse(_responseJson.data)
        console.log(_responseJson.data)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
        setError(error)
        setIsLoading(false)
      }
    }
    getData()
  }, [url])

  return { response, error, isLoading }
}

export { useFetch }
