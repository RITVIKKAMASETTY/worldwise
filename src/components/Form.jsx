// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import {useUrlPosition} from "../hooks/useUrlPosition";
import Spinner from "./Spinner";
import Message from "./Message";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useCities} from "./context/CitiesContext";
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
const [lat,lng]=useUrlPosition();
const [isgeoloading,setisgeoloading]=useState(false);
const baseurl="https://api.bigdatacloud.net/data/reverse-geocode-client"
const [emoji, setEmoji] = useState(null);
const [geoencodingerror,setgeoencodingerror]=useState(null);
const navigate=useNavigate();
const {createcity,isLoading}=useCities();
useEffect(function(){
  if(!lat && !lng) return;
async function fetchData(){
  try{
    setisgeoloading(true);
    setgeoencodingerror(null);
    const res=await fetch(`${baseurl}?latitude=${lat}&longitude=${lng}`);
    const data=await res.json();
    console.log(data);
    setCityName(data.city || data.locality || "");
    if(!data.countryCode)
      throw new Error("Country code not found click somewhere on the map");
    setCountry(data.countryCode);
    setEmoji(convertToEmoji(data.countryCode));
  }
  catch(e){
    setgeoencodingerror(e.message);
  }
  finally{
    setisgeoloading(false);
  }
}fetchData();
},[lat,lng]);
async function handlesubmit(e){
  e.preventDefault();
  if(!cityName || !date) return;
  const newCity={
    cityName,
    country,
    emoji,
    date,
    notes,
    position:{lat,lng}
  };
  await createcity(newCity);
  navigate("/app/cities");
}
if(isgeoloading) return(<Spinner/>);
if(geoencodingerror!=null) return(<Message message={geoencodingerror} />)
  return (
    <form className={`${styles.form} ${isLoading?styles.loading:""}`} onSubmit={handlesubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
     <Button type="primary" onClick={()=>navigate(-1)}>Add</Button>
   <BackButton/>
      </div>
    </form>
  );
}

export default Form;
