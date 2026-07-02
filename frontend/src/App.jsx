import React from 'react'
import './App.css'
import Home from './pages/Home'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import ProductDetail from './pages/ProductDetail'
import ProductList from './pages/ProductList'
import CategoryPage from './pages/Category'
import Navbar from './components/Navbar'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import Signup from './pages/Signup'
import Login from './pages/Login'
import PrivateRouter from './components/PrivateRouter'
import CategoryView from './pages/CategoryView'
import About from './pages/About';
import Profile from './pages/Profile'

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/product/:id" element={<ProductDetail/>}/>
        <Route path="/categories" element={<CategoryPage/>}/>
        <Route path="/about" element={<About />} />
         <Route path="/category/:categoryName" element={<CategoryView />} />

        <Route path="/cart" element={<CartPage/>}/>
        <Route element={<PrivateRouter/>}>
          <Route path="/checkout" element={<CheckoutPage/>}/>
        </Route>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </Router>
  )
}

export default App