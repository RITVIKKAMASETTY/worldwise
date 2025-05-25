import React from 'react'
import styles from "./CityList.module.css";
import Spinner from './Spinner';
import Cityitem from './Cityitem';
import Message from "./Message.jsx";
import { useCities } from './context/CitiesContext.jsx';
export default function Citylist() {const {cities,isloading}=useCities();
  if(isloading){return <Spinner/>}
  if(!cities.length){return <Message message="Add your first city by clicking on a city on the map"/>}  
  return (<ul className={styles.cityList}>{cities.map(city=><Cityitem city={city} key={city.id}/>)}</ul>)}
