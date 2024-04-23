import Header from './components/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SingInPage from './pages/SignInPage'
import ProductDetail from './pages/ProductDetail'
import Footer from './components/Footer'
import AdminPage from './pages/AdminPage'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/sign-in' element={<SingInPage />}/>
        <Route path='/sign-up' element={<HomePage />}/>
        <Route path='/product-detail/:productId' element={<ProductDetail />}/>
        <Route path='/admin' element={<AdminPage />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
