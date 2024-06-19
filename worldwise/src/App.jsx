import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/Citylist";
import CountryList from "./components/CountryList";


const BASE_URL='http://localhost:3000'
function App() {

const [cities,setCities]=useState([])
const [isLoading,setIsLoading]=useState(false)


useEffect(function(){
  async function fetchData(){
    setIsLoading(true)
    try{
    const res=await fetch(`${BASE_URL}/cities`)
    const data=await res.json()
    setCities(data)
  }catch{
     alert('there was an error while Loading the Data')
  }finally{
      setIsLoading(false)
  }
  }
  fetchData()
},[])
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route  index element={<CityList cities={cities} isLoading={isLoading}/>} />
          <Route  path="cities" element={<CityList cities={cities} isLoading={isLoading}/>} />
          <Route  path="countries" element={<CountryList cities={cities} isLoading={isLoading}/>} />
          <Route  path="form" element={<p>Form</p>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
