import { createContext,useEffect,useReducer} from "react"
import React from 'react'
const citiescontext=createContext();
const baseurl="http://localhost:3001";
const initailState={
  cities:[],
  isLoading:false,
  currentCity:{},
  error:""
}
function reducer(state,action){
  switch(action.type){
    case 'cities/loading':
      return{...state,isLoading:true};
    case 'cities/loaded':
      return{...state,cities:action.payload,isLoading:false};
    case 'cities/created':
      return{...state,isLoading:false,cities:[...state.cities,action.payload],currentCity:action.payload};
    case 'cities/deleted':
      return{...state,isLoading:false,cities:state.cities.filter((city)=>city.id!=action.payload),currentCity:{}};
    case 'rejected':
      return{...state,isLoading:false,error:action.payload};
    default:
      return "error"
  }
}
function CitiesProvider({children}) {
  //   const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});
  const[{cities,isLoading,currentCity,error},dispatch]=useReducer(reducer,initailState);
  useEffect(function(){async function fetchCities(){dispatch({type:"cities/loading"});try{
    const res=await fetch(`${baseurl}/cities`);
    const data=await res.json();
    dispatch({type:"cities/loaded",payload:data});
  }catch(e){
    dispatch({type:"rejected",payload:"there is an error loading this state"});
  }}fetchCities();},[]);async function getCity(id){
    if(Number(id)==currentCity.id)return;
dispatch({type:"cities/loading"});
    try{
        const res=await fetch(`${baseurl}/cities/${id}`);
        const data=await res.json();
      dispatch({type:"city/loaded",payload:data});}
    catch(e){
      dispatch({type:"rejected",payload:"there is an error loading cities"});
    }
  }
  async function createcity(newCity){
    dispatch({type:"cities/loading"});
    try{
        const res=await fetch(`${baseurl}/cities`,{method:"POST",body:JSON.stringify(newCity),headers:{"Content-Type":"application/json"}});
        const data=await res.json();
       dispatch({type:"cities/created",payload:data});}
    catch(e){
      dispatch({type:"rejected",payload:"there is an error"});
    }
  }async function deletecity({id}){
    dispatch({type:"cities/loading"});
    try{
        await fetch(`${baseurl}/cities/${id}`,{method:"DELETE"});
       dispatch({type:"cities/deleted",payload:id});}
    catch(e){
      dispatch({type:"rejected",payload:"there is an error"});
    }
  }return <citiescontext.Provider value={{cities,isLoading,currentCity,getCity,createcity,deletecity,error}}>{children}</citiescontext.Provider>}
  function useCities(){
    const context=React.useContext(citiescontext);
    if(context===undefined){
      throw new Error("useCities must be used within a CitiesProvider");
    }
    return context;
  }

export {CitiesProvider,useCities};
