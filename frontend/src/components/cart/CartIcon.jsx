import { RiShoppingCart2Line } from 'react-icons/ri'
import { useCart } from '../../context/cartContext'

function CartIcon () {
  const { state: { items } } = useCart()
  return (
    <div className='cart-icon relative'>
      <RiShoppingCart2Line size={30} className='bg-white' />
      <span className='badge absolute right-0 bottom-0 left-0 top-8 min-h-10 bg-primary-300 p-2 rounded-2xl font-bold'>{items.length}</span>
    </div>
  )
}

// .cart-icon {
//     position: relative;
//     .badge {
//       position: absolute;
//       bottom: 0;
//       right: 0;
//       background-color: $primary-color;
//       padding: 2px 5px;
//       font-size: 10px;
//       border-radius: 50%;
//       font-weight: bold;
//     }
//   }
export default CartIcon
