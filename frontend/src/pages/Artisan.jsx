import { useParams } from 'react-router-dom'
import { useFetch } from '../hooks/api'
import ArtisanHeader from '../components/artisan/artisanHeader'
import ProductsList from '../components/products/ProductsList'

function Artisan () {
  const { artisanSlug } = useParams()

  const { response, error, isLoading } = useFetch(` ${process.env.REACT_APP_API}/artisans?filters[slug][$eq]=${artisanSlug}&populate=*`)

  const { response: products, error: productsError, isLoading: productsLoading } = useFetch(` ${process.env.REACT_APP_API}/products?filters[artisan][slug][$eq]=${artisanSlug}&populate=*`)

  if (isLoading || productsLoading) return <h1> chargement...</h1>

  if (error || productsError) return <pre>{JSON.stringify(error || productsError, null, 2)}</pre>

  console.log(products)
  return response && (
    <>
      <ArtisanHeader attributes={response[0]?.attributes} />
      {
                products
                  ? (
                    <ProductsList products={products} />
                    )
                  : <p> Aucun produit trouvé</p>
            }
    </>
  )
}

export default Artisan
