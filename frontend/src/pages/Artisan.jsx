import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ProductsList from '../components/products/ProductsList'
import ArtisanHeader from '../components/artisan/artisanHeader'

function Artisan () {
  const { artisanSlug } = useParams()
  const [artisan, setArtisan] = useState(null)
  const [artisanLoading, setArtisanLoading] = useState(true)
  const [artisanError, setArtisanError] = useState(null)

  const [products, setProducts] = useState(null)
  const [productsLoading, setProductsLoading] = useState(true)
  const [productsError, setProductsError] = useState(null)

  const [artisanImg, setArtisanImg] = useState()

  useEffect(() => {
    const fetchArtisan = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/artisans?filters[slug][$eq]=${artisanSlug}&populate=profilePicture`)
        const data = await response.json()
        if (response.ok) {
          setArtisan(data.data[0])
          const thumbnailUrl = data.data[0].attributes.profilePicture?.data?.attributes?.formats?.thumbnail?.url
          setArtisanImg(thumbnailUrl ? `${process.env.REACT_APP_BASE_URL}${thumbnailUrl}` : undefined)
        } else {
          throw new Error('Failed to fetch artisan data')
        }
      } catch (error) {
        setArtisanError(error.message)
      } finally {
        setArtisanLoading(false)
      }
    }

    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products?filters[artisan][slug][$eq]=${artisanSlug}&populate=*`)
        const data = await response.json()
        if (response.ok) {
          setProducts(data.data)
        } else {
          throw new Error('Failed to fetch products')
        }
      } catch (error) {
        setProductsError(error.message)
      } finally {
        setProductsLoading(false)
      }
    }

    fetchArtisan()
    fetchProducts()
  }, [artisanSlug])

  if (artisanLoading || productsLoading) {
    return <h1>Chargement...</h1>
  }
  if (artisanError || productsError) {
    return <pre>{JSON.stringify(artisanError || productsError, null, 2)}</pre>
  }

  return (
    <>
      {artisan ? <ArtisanHeader attributes={artisan.attributes} /> : <p>Artisan not found.</p>}
      {products
        ? <ProductsList products={products} artisanImg={artisanImg} />
        : <p>No products found.</p>}
    </>
  )
}

export default Artisan
