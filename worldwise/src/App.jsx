import { BrowserRouter ,Routes,Route} from "react-router-dom"
import Homepage from './pages/Homepage'
import Product from './pages/Product'
import Pricing from './pages/Pricing'
import PageNotFound from './pages/PageNotFound'
import AppLayout from './pages/AppLayout'
import Login from './pages/Login'
function App() {

  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="product" element={<Product/>}/>
        <Route path="pricing" element={<Pricing/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="app" element={<AppLayout/>}>
        <Route index element={<p>List of Countries</p>}/>
          <Route exact path="cities" element={<p>Cities of List</p>}/>
          <Route exact path="countries" element={<p>List of Countries</p>}/>
          <Route exact path="form" element={<p>Form</p>}/>
        </Route>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
   </BrowserRouter>
  )
}

export default App
