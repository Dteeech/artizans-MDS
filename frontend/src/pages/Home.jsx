// import ProductsList from '../components/products/ProductsList'
import { useFetch } from '../hooks/api'
import { toast } from 'react-toastify'
import ProductsList from '../components/products/ProductsList'
function Home () {
  const { response, error, isLoading } = useFetch(` ${process.env.REACT_APP_API}/products?populate[0]=images&populate[1]=artisan.profilePicture&sort=price:asc`)

  if (isLoading) return <h2>Chargement...</h2>

  if (error) {
    toast.error('pas de produits qui remontent')
  }

  return response && (
    <>
      <div className='container '>

        <ProductsList products={response} />
      </div>

    </>
  )
}

export default Home
