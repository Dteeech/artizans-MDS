import { createContext, useContext, useReducer } from 'react'

const CartContext = createContext()

const actionTypes = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  RESET: 'RESET'
}

const initialState = {
  items: [], // [{item: {}, qty: X}]
  total: 0
}

const cartReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      return {
        ...state,
        // On vérifie si le panier contient déjà l'item
        items: state.items.some(cartItem => cartItem.item.id === action.data.item.id)
          // Il est déjà dans le panier : On boucle sur les items pour trouver celui déjà présent
          ? state.items.map(cartItem => {
            if (cartItem.item.id === action.data.item.id) {
              // On augmente sa quantité de 1
              return { ...cartItem, qty: cartItem.qty + 1 }
            }
            return cartItem
          })
          // Il n'est pas dans le panier : On ajoute l'item dans le tableau
          : state.items.concat([{ item: action.data.item, qty: 1 }]) // => item = plat
      }
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter(cartItem => action.data.id !== cartItem.item.id)
      }
    default:
      throw new Error(`Unhandled action type : ${action.type}`)
  }
}

const cartFactory = (dispatch) => ({
  addToCart: (item) => {
    dispatch({
      type: actionTypes.ADD_TO_CART,
      data: { item }
    })
  },
  removeFromCart: (id) => {
    dispatch({
      type: actionTypes.REMOVE_FROM_CART,
      data: { id }
    })
  }
})

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  return (
    <CartContext.Provider value={{ state, ...cartFactory(dispatch) }}>
      {children}
    </CartContext.Provider>
  )
}

const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart muse be used inside a CartProvider')
  return context
}

export {
  CartProvider,
  useCart
}
