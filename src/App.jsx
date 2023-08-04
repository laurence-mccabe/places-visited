import { BrowserRouter, Routes, Route } from 'react-router-dom'

import PageNav from './components/PageNav' // commiting this in 2 after resetting main
import PageNav from './components/PageNav'
import PageNav from './components/PageNav'
import PageNav from './components/PageNav'
import PageNav from './components/PageNav'
import PageNav from './components/PageNav'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="app" element={<AppLayout />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
