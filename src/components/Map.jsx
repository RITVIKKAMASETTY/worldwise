import React, { useState,useEffect } from 'react'
import styles from "./Map.module.css";
import { useNavigate } from 'react-router-dom';import {useCities} from "./context/CitiesContext";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { useGeolocation } from '../hooks/geolocation.jsx';
import Button  from './Button';
import {useUrlPosition} from '../hooks/useUrlPosition.jsx';
export default function Map() {
const [mapposition,setmapposition]=useState([40,0]);
  const {isLoading:isLoadingposition,position:geolocationposition,getPosition}=useGeolocation();
  const [maplat,maplng]=useUrlPosition();
  const {cities}=useCities();
  useEffect(function(){if(!isNaN(maplat) && !isNaN(maplng))setmapposition([maplat,maplng])},[maplat,maplng]);
  useEffect(function(){if(geolocationposition)setmapposition([geolocationposition.lat,geolocationposition.lng])},[geolocationposition]);
  return (
    <div className={styles.mapContainer}>
    {!geolocationposition&&<Button type="position" onClick={getPosition}>{isLoadingposition?"Loading...":"Use my position"}  </Button>}
<MapContainer center={mapposition} zoom={13} scrollWheelZoom={true} className={styles.map}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
    />
    {cities.map((city)=>(<Marker position={[city.position.lat,city.position.lng]} key={city.id}>
      <Popup>
        <span>{city.emoji}</span>
        <span>{city.cityName}</span>
      </Popup>
    </Marker>))}
    {!isNaN(maplat) && !isNaN(maplng) && (
  <ChangeCenter position={mapposition} />
)}
<DetectClick/>
  </MapContainer>
    </div>
  )
}
// function ChangeCenter({position}){
//   const map=useMap();
//   map.setView(position);
//   return(null);
// }
function ChangeCenter({ position }) {
  const map = useMap();

  useEffect(() => {
    map.setView(position);
  }, [position, map]);

  return null;
}
function DetectClick(){
const navigate=useNavigate();
useMapEvents({
  click:(e)=>navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
});
}