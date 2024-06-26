// Pages
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import About from '../pages/About'
import Contact from '../pages/Contact'
import Services from '../pages/Services'
import Artisans from '../pages/Artisans'
import Home from '../pages/Home'
import Artisan from '../pages/Artisan'
import Auth from '../pages/Auth'
import Dashboard from '../pages/protected/Dashboard'
import PrivateRoutes from './privateRouteMiddleware'
import Profile from '../pages/protected/Profile'
import CreateNewProduct from '../components/products/CreateNewProduct'
import UpdateProduct from '../components/products/UpdateProduct'
import Cart from '../pages/Cart'
function Router () {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='artisans'>
          <Route index element={<Artisans />} /> {/* Route domaine artisans */}
          <Route path=':artisanSlug' element={<Artisan />} /> {/* Route domaine/artisans/id */}
        </Route>

        <Route path='about' element={<About />} />
        <Route path='contact' element={<Contact />} />
        <Route path='services' element={<Services />} />
        <Route path='authentication' element={<Auth />} />
        <Route path='create-product' element={<CreateNewProduct />} />
        <Route path='update-product/:productId' element={<UpdateProduct />} />
        <Route path='dashboard' element={<PrivateRoutes />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path='profile' element={<Profile />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </BrowserRouter>

  )
}

export default Router
