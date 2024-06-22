import { createContext,useEffect, useState } from "react";
import PropTypes from "prop-types";



const CitieContext = createContext();
const BASE_URL = "http://localhost:3000";




function CitiesProvider({children}) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity,setCurrentCity]=useState({})




  useEffect(function () {
    async function fetchData() {
      setIsLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("there was an error while Loading the Data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

//fetch the Current City

 async function getCity(id){
      setIsLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        setCurrentCity(data);
      } catch {
        alert("there was an error while Loading the Data");
      } finally {
        setIsLoading(false);
      }

  }



  async function createCity(newCity){
    try{
      setIsLoading(true)
    const res = await fetch(`${BASE_URL}/cities`,{
      method:"POST",
      body:JSON.stringify(newCity),
      headers:{
        "Content-Type":"application/json",
      },
    });
    const data=await res.json();
    setCities((cities)=>[...cities,data])
    } catch{
      alert("there was an error while Creating the City")
    }finally{
      setIsLoading(false)
    }
  }



  async function deleteCity(id){
     try{
        setIsLoading(true)
        await fetch(`${BASE_URL}/cities/${id}`,{
          method:"DELETE",
        })
        setCities((cities)=>cities.filter((city)=>city.id !== id));
     }catch{
      alert('there was eror while deleting the city')
     }finally{
      setIsLoading(false)
     }
  }


  return (
    <CitieContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
    {children}
    </CitieContext.Provider>
  );
}

CitiesProvider.propTypes = {
  children: PropTypes.node
};


export { CitiesProvider,CitieContext };
