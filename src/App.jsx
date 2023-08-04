import { BrowserRouter, Routes, Route } from 'react-router-dom'

//removed all imports for merge test NOW ON 2. test will be done on main locally
// test change for merge NOW ON 2
// test change for merge NOW ON 2
// test change for merge NOW ON 2
// test change for merge NOW ON 2
// test change for merge NOW ON 2

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
