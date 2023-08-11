import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Login from './Pages/Login'
import Product from './Pages/Product'
import Pricing from './Pages/Pricing'
import Homepage from './Pages/Homepage'
import PageNotFound from './Pages/PageNotFound'
import AppLayout from './Pages/AppLayout'
import CityList from './components/CityList'
import CountryList from './components/CountryList'
import City from './components/City'
import Form from './components/Form'
import { CitiesProvider } from './contexts/CitiesContext'
import { AuthProvider } from './contexts/FakeAuthContext'
import ProtectedRoute from './Pages/ProtectedRoute'

const App = () => {
  return (
    
      <AuthProvider>
        <CitiesProvider>
          <BrowserRouter>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="app" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="form" element={<Form />} />
                <Route path="countries" element={<CountryList />} />
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </CitiesProvider>
      </AuthProvider>
  )
}
/*
CHALLENGE

1) Add `AuthProvider` to `App.jsx`
2) In the `Login.jsx` page, call `login()` from context
3) Inside an effect, check whether `isAuthenticated === true`. If so, programatically navigate to `/app`
4) In `User.js`, read and display logged in user from context (`user` object). Then include this component in `AppLayout.js`
5) Handle logout button by calling `logout()` and navigating back to `/`
*/

export default App
