import PropTypes from 'prop-types'
import ProductsListItem from './ProductsListItem'
/**
 *
 * @param {Array} products
 * @returns {React.Component} ProductList
 */
function ProductsList ({ products, artisanImg }) {
  if (!products || products.length < 1) return 'No data'
  return (
    <div className='flex flex-col'>
      <h2 className='text-4xl py-6 text-primary-500 my-8'>Products List</h2>
      <div className='flex flex-row flex-wrap justify-start gap-4'>
        {
        products.map(product => (
          <ProductsListItem key={product.id} product={product} artisanImg={artisanImg} />
        ))
      }
      </div>
    </div>
  )
}

ProductsList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  artisanImg: PropTypes.string
}

export default ProductsList
