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



  return (
    <CitieContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
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
