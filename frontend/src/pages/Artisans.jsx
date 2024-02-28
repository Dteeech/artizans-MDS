import ArtisansList from '../components/artisans/ArtisansList'
import { useFetch } from '../hooks/api'

function Artisans () {
  const { response, error, isLoading } = useFetch(`${process.env.REACT_APP_API}/artisans?populate=*`)

  if (isLoading) return <h2> Chargement...</h2>
  if (error) return <pre> {JSON.stringify(error, null, 2)} </pre>

  return (
    <>
      <ArtisansList artisans={response} />
    </>
  )
}

export default Artisans
