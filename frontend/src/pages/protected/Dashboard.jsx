import { Button, Spinner } from '@nextui-org/react'
import { useFetch } from '../../hooks/api'
import { useAuth } from '../../context/authContext'
import { toast } from 'react-toastify'
import ProductsList from '../../components/products/ProductsList'

function Dashboard() {
  const { state: { user } } = useAuth()
  
  // Récupérer l'URL pour obtenir les informations de l'utilisateur (avec les relations peuplées)
  const userUrl = `${process.env.REACT_APP_API}/users/${user.id}?populate=*`
  const { response: userData, error: userError, isLoading: userLoading } = useFetch(userUrl)

  // Vérifier si les données de l'utilisateur sont en cours de chargement ou si une erreur s'est produite
  if (userLoading) {
    return (
      <div className='flex flex-col justify-center items-center'>
        <Spinner size='lg' />
      </div>
    )
  }
  if (userError) {
    return toast.error("Une erreur s'est produite lors de la récupération des données de l'utilisateur")
  }
  
  // Une fois les données de l'utilisateur récupérées, extraire l'identifiant de l'artisan ou son slug
  const artisanId = userData?.artisan?.id
  const artisanSlug = userData?.artisan?.slug
  
  // Vérifier si l'identifiant de l'artisan ou son slug est présent
  if (!artisanId && !artisanSlug) {
    return <div>Aucun artisan associé à cet utilisateur.</div>
  }

  // Construire l'URL de requête pour récupérer les produits associés à l'artisan
  let productsUrl = `${process.env.REACT_APP_API}/products?`
  if (artisanId) {
    productsUrl += `filters[artisan.id][$eq]=${artisanId}`
  } else {
    productsUrl += `filters[artisan.slug][$eq]=${artisanSlug}`
  }
  productsUrl += '&populate=*'

  // Faire la deuxième requête pour récupérer les produits associés à l'artisan
  const { response: products, error: productsError, isLoading: productsLoading } = useFetch(productsUrl)

  // Vérifier si les produits sont en cours de chargement ou s'il y a une erreur
  if (productsLoading) {
    return (
      <div className='flex flex-col justify-center items-center'>
        <Spinner size='lg' />
      </div>
    )
  }
  if (productsError) {
    return toast.error("Une erreur s'est produite lors de la récupération des produits")
  }

  // Afficher la liste des produits associés à l'artisan
  return (
    <>
      <h2>DASHBOARD</h2>
      <ProductsList products={products} />
      <Button>Ajouter Produits</Button>
      <Button>Modifier Produits</Button>
      <Button>Supprimer Produits</Button>
    </>
  )
}

export default Dashboard
