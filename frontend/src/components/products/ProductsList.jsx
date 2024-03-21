import PropTypes from 'prop-types'
import ProductsListItem from './ProductsListItem'
/**
 *
 * @param {Array} products
 * @returns {React.Component} ProductList
 */
function ProductsList ({ products }) {
  if (!products || products.length < 1) return 'No data'
  return (
    <div className='flex flex-col'>
      <h2 className='text-4xl py-6'>Products List</h2>
      <div className='flex flex-row flex-wrap justify-center gap-4'>
        {
        products.map(product => (
          <ProductsListItem key={product.id} product={product} />
        ))
      }
      </div>
    </div>
  )
}

ProductsList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object)
}

export default ProductsList
