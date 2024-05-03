// Dashboard.jsx
import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/authContext'
import ProductsList from '../../components/products/ProductsList'
import ArtisanHeader from '../../components/artisan/artisanHeader'

function Dashboard () {
  const { state: { user } } = useAuth()
  const userId = user.id

  const [artisan, setArtisan] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resArtisan = await fetch(`${process.env.REACT_APP_API}/users/${userId}?populate=artisan,artisan.profilePicture`)
        const artisanJson = await resArtisan.json()
        setArtisan(artisanJson.artisan)
      } catch (error) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [userId])

  useEffect(() => {
    if (!artisan) return // Guard clause to simplify logic
    const fetchProducts = async () => {
      try {
        const resProducts = await fetch(`${process.env.REACT_APP_API}/products?filters[artisan][id][$eq]=${artisan.id}&populate=*`)
        const productsJson = await resProducts.json()
        if (productsJson.data) {
          setProducts(productsJson.data)
        } else {
          throw new Error('Produits non trouvés.')
        }
      } catch (err) {
        setError(err.message)
      }
    }

    fetchProducts()
  }, [artisan])

  return (
    <>
      <h1 className='text-4xl mb-4 text-primary-500'>Dashboard</h1>
      <h2 className='text-xl'>Bonjour {user.username}, votre compte artisan :</h2>

      {artisan ? <ArtisanHeader attributes={artisan} /> : <p>Aucun artisan trouvé.</p>}

      {products ? <ProductsList products={products} /> : <p>Aucun produit trouvé.</p>}
      {error && <p className='text-red-500'>Erreur : {error}</p>}
      {isLoading && <p>Chargement en cours...</p>}
    </>
  )
}

export default Dashboard
