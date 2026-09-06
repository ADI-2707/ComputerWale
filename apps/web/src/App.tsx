import { BrowserRouter, Routes, Route, useLocation } from 'react-router'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { ScrollToTop } from './components/common/ScrollToTop'

import { Home } from './pages/Home'
import { Laptops } from './pages/Laptops'
import { ProductDetail } from './pages/ProductDetail'
import { Bulk } from './pages/Bulk'
import { Government } from './pages/Government'
import { Cart } from './pages/Cart'
import { Checkout } from './pages/Checkout'
import { TrackOrder } from './pages/TrackOrder'
import { Stores } from './pages/Stores'
import { Account } from './pages/Account'
import { NotFound } from './pages/NotFound'

function AppRoutes() {
  const location = useLocation()

  return (
    <div key={location.pathname} className="page-transition">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/laptops" element={<Laptops />} />
        <Route path="/laptops/:slug" element={<ProductDetail />} />
        <Route path="/bulk" element={<Bulk />} />
        <Route path="/government" element={<Government />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/track" element={<TrackOrder />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account/:tab" element={<Account />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
