import { createContext,useEffect, useState } from "react";
import PropTypes from "prop-types";



const CitieContext = createContext();
const BASE_URL = "http://localhost:3000";




function CitiesProvider({children}) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <CitieContext.Provider
      value={{
        cities,
        isLoading,
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
