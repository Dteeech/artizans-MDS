// import ProductsList from '../components/products/ProductsList'
import { useFetch } from '../hooks/api'
import { toast } from 'react-toastify'
import { Spinner } from '@nextui-org/react'
import ProductsList from '../components/products/ProductsList'
function Home () {
  const { response, error, isLoading } = useFetch(` ${process.env.REACT_APP_API}/products?populate[0]=images&populate[1]=artisan.profilePicture&sort=price:asc`)
  if (isLoading) {
    return (
      <div className='flex flex-col justify-center items-center'>
        <Spinner size='lg' />
      </div>
    )
  }
  if (error) {
    return toast.error("Une erreur s'est produite")
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
