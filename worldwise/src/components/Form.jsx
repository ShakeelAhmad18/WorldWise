import { useContext, useEffect, useState } from "react";
import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { CitieContext } from "../context/CitiesContext";
import { useNavigate } from "react-router-dom";


function convertToEmoji(countryCode) {
    console.log('Converting country code to emoji:', countryCode); // Log the country code
    try {
      const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt());
      const emoji = String.fromCodePoint(...codePoints);
      console.log('Converted emoji:', emoji); // Log the converted emoji
      return emoji;
    } catch (error) {
      console.error('Error converting country code to emoji:', error, countryCode);
      return '';
    }
  }
  

function Form() {
  const [cityName, setCityName] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useUrlPosition();
  const [country, setCountry] = useState("");
  const [isGeoLoading,setIsGeoLoading]=useState(false)
  const [emoji,setEmoji]=useState('')
  const [geoCodeError,setGeoCodeError]=useState("")
  const {createCity,isLoading}=useContext(CitieContext)
  const navigate=useNavigate()

country
  useEffect(
    function () {
        if(!lat && !lng) return ;
        async function fetchCityData() {
            setIsGeoLoading(true)
          try{
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
        
          if(!data.countryCode) throw new Error("there is city dees not seen so click somewhere else")



          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          const emoji = convertToEmoji(data.countryCode);
          console.log(emoji)
          setEmoji(emoji);
        }catch(err){
            setGeoCodeError(err.message)
        }finally{
             setIsGeoLoading(false)
        }
    }
    fetchCityData();
},
    [lat, lng]
  );

  if(isGeoLoading) return <Spinner/>

  if(geoCodeError) return <Message message={geoCodeError}/>
  
 if(!lat && !lng) return <Message message='Start clicking on the map'/>

async function handleSubmit(e){
    e.preventDefault();

    if(!cityName && !date) return;

    const newCity={
        cityName,
        country,
        emoji,
        date,
        notes,
        position:{lat,lng}
    }
   await createCity(newCity)
   navigate("/app/cities")
}



  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ''}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City Name</label>
        <input
          id="cityName"
          type="text"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
        { <span className={styles.flag}>{emoji}</span> }
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}</label>
        <DatePicker id="date" dateFormat='dd/MM/yyyy' selected={date} onChange={(date)=>setDate(date)}/>
        {/*<input
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />*/}
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
