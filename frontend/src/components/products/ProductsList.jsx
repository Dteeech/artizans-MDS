import PropTypes from 'prop-types'
import ProductsListItem from './ProductsListItem'
import '../products/ProductsList.css'
/**
 *
 * @param {Array} products
 * @returns {React.component} ProductsList
 */
function ProductsList ({ products }) {
  if (!products || products.length < 1) {
    return 'No data'
  }

  return (
    <>
      <div className='list-container'>
        <h2>product list</h2>
        <div className='list'>
          {
                        products.map(product => {
                          return (
                            <ProductsListItem key={product.id} product={product} />
                          )
                        })
                    }
        </div>
      </div>
    </>

  )
}

ProductsList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object)
}
export default ProductsList
