import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Login from './Pages/Login'
import Product from './Pages/Product'
import Pricing from './Pages/Pricing'
import Homepage from './Pages/Homepage'
import PageNotFound from './Pages/PageNotFound'
import AppLayout from './Pages/AppLayout'
import CityList from './components/CityList'
import CountryList from './components/CountryList'
import City from './components/City'

const BASE_URL = 'http://localhost:9000'

const App = () => {
  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)

useEffect(() => {
  console.log(" cities data =>",cities)
}, [cities])

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`${BASE_URL}/cities`)
        const data = await response.json()
        setCities(data)
      } catch (error) {
        setIsLoading(false)
        alert("there was an error loading the cities")
      }
      finally {
        setIsLoading(false)
      }
    }
    fetchCities()
  }, [])



  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<CityList cities={cities} isLoading={isLoading}/>} />
          <Route path="cities" element={<CityList cities={cities} isLoading={isLoading}/>} />
          <Route path="cities/:id" element={<City />} />
          <Route path="form" element={<p>Form</p>} />
          <Route path="countries" element={<CountryList cities={cities} />}/>
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App


// useEffect(() => {
//   try{
//   setIsLoading(true)
//   fetch(`${BASE_URL}/cities`)
//   .then((response) => response.json())
//   .then((data) => {
//     setCities(data)
//     setIsLoading(false)
//   })
// } catch (error) {
//   setIsLoading(false)
//   alert("there was an error loading the cities")
// }
//   finally {
//     setIsLoading(false)
//   }
// }, [])