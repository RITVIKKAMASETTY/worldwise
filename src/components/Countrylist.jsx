import React from 'react'
import styles from "./CountryList.module.css";
import Spinner from './Spinner';
import Message from "./Message.jsx";
import CountryItem from './CountryItem.jsx';
import { useCities } from "./context/CitiesContext.jsx";
export default function Countrylist() {const {cities,isloading}=useCities();
    const countries =cities.reduce((arr,city)=>{if(!arr.map(el=>el.country).includes(city.country))return[...arr,{country:city.country,emoji:city.emoji}]; else return arr;},[]);
  if(isloading){return <Spinner/>}
  if(!cities.length){return <Message message="Add your first city by clicking on a city on the map"/>}  
  return (<ul className={styles.countryList}>{countries.map(country=><CountryItem country={country} key={country.country}/>)}</ul>)}
