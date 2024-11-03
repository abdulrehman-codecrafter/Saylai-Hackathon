import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'sonner';

export const CartContext = createContext();

const initialState = {
  cartItems: [],
  totalAmount: 0,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'ADD_ITEM':
      const itemExists = state.cartItems.find(item => item.id === payload.id);
      if (itemExists) {
        toast.warning('Item already added to cart');
        return state;
      } else {
        toast.success('Item  added to cart');
        return {
          ...state,
          cartItems: [...state.cartItems, { ...payload, quantity: 1 }],

        };
      }

    case 'REMOVE_ITEM':
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== payload.id),
      };

    case 'INCREASE_QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.id === payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case 'DECREASE_QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.id === payload.id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };

    case 'CALCULATE_TOTAL':
      const total = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      return {
        ...state,
        totalAmount: total,
      };
      case 'CLEAR_CART': 
      
      return {
        ...state,
        cartItems: [],
        totalAmount: 0, 
      };

    case 'LOAD_CART':
      return {
        ...state,
        cartItems: payload.cartItems,
      };

    default:
      return state;
  }
};

export default function CartContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (storedCartItems) {
      dispatch({ type: 'LOAD_CART', payload: { cartItems: storedCartItems } });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    dispatch({ type: 'CALCULATE_TOTAL' });
  }, [state.cartItems]);

  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCartContext = () => useContext(CartContext);
