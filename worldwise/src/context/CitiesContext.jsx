import { createContext,useEffect, useReducer } from "react";
import PropTypes from "prop-types";

const inialState={
  cities:[],
  isLoading:false,
  currentCity:{},
  error:"",
}

  function reducer(state,action){
    switch(action.type){
      case 'isLoading':
        return {
          ...state,
          isLoading:true,
        }
      case 'cities/loaded':
        return {
            ...state,
            isLoading:false,
            cities:action.payload,
        }
      case 'city/loaded':
        return {
            ...state,
            isLoading:false,
            currentCity:action.payload
        }
      case 'city/created':
        return {
            ...state,
            isLoading:false,
            cities:[...state.cities,action.payload],
            currentCity:action.payload,
        }
      case 'city/deleted':
        return {
            ...state,
            isLoading:false,
            cities:state.cities.filter((city)=>city.id !== action.payload),
            currentCity:{},
        }
      case 'rejected':
        return {
          ...state,
          isLoading:false,
          error:action.payload,
        }
      default: throw new Error('Unknown  action accur')
    }
}

const CitieContext = createContext();
const BASE_URL = "http://localhost:3000";




function CitiesProvider({children}) {

  const [{cities,isLoading,currentCity},dispatch]=useReducer(reducer,inialState)
   
  //const [cities, setCities] = useState([]);
  //const [isLoading, setIsLoading] = useState(false);
  //const [currentCity,setCurrentCity]=useState({})




  useEffect(function () {
     
    dispatch({type:'isLoading'})

    async function fetchData() {
      dispatch({type:'isLoading'})
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({type:'cities/loaded',payload:data})
      } catch {
        dispatch({type:'rejected',payload:"there was an error while Loading the Data"});
      }
    }
    fetchData();
  }, []);

//fetch the Current City

 async function getCity(id){

   if(Number(id) === currentCity.id) return;

      dispatch({type:'isLoading'})
      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({type:'city/loaded',payload:data})
      } catch {
        dispatch({type:'rejected',payload:"there was an error while Loading the Data"});
      }

  }



  async function createCity(newCity){
    dispatch({type:"isLoading"})
    try{
    const res = await fetch(`${BASE_URL}/cities`,{
      method:"POST",
      body:JSON.stringify(newCity),
      headers:{
        "Content-Type":"application/json",
      },
    });
    const data=await res.json();
   
    dispatch({type:'city/created',payload:data})

    } catch{
      dispatch({type:'rejected',payload:"there was an error while Creating the City"})
    }
  }



  async function deleteCity(id){
    dispatch({type:"isLoading"})
     try{
        await fetch(`${BASE_URL}/cities/${id}`,{
          method:"DELETE",
        })
        dispatch({type:'city/deleted',payload:id})
        //setCities((cities)=>cities.filter((city)=>city.id !== id));
     }catch{
      dispatch({type:"rejected",payload:'there was eror while deleting the city'})
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
