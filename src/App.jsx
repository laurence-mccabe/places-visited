import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './Pages/Login'
import Product from './Pages/Product'
import Pricing from './Pages/Pricing'
import Homepage from './Pages/Homepage'
import PageNotFound from './Pages/PageNotFound'
import AppLayout from './Pages/AppLayout'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CHANGEMADEONBRANCH3 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
