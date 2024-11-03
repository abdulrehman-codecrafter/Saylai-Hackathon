import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContextProvider from './Contexts/AuthContext'
import ItemsContextProvider from './Contexts/ItemContext.jsx'
import CartContextProvider from './Contexts/CartContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthContextProvider>
      <ItemsContextProvider>
      <CartContextProvider>

      <App />
      </CartContextProvider>
      </ItemsContextProvider>
    </AuthContextProvider>
      
    </BrowserRouter>
  </React.StrictMode>,
)
