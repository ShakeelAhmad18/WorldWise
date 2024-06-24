import { useParams} from 'react-router-dom';
import styles from './City.module.css'
import { useContext, useEffect } from 'react';
import { CitieContext } from '../context/CitiesContext';
import BackButton from './BackButton';
//import Spinner from './Spinner'

const formatDate=(date)=>new Intl.DateTimeFormat("en",{
 day:'numeric',
 month:'long',
 year:'numeric',
 weekday:'long'
}).format(new Date(date))

function City() {
  const {id}= useParams()
  const {getCity,currentCity}=useContext(CitieContext)


  useEffect(
    function(){

    getCity(id)

  },[id,getCity])

    const {cityName,emoji,date,notes}=currentCity;

    //if(id === currentCity.id){ return <Spinner/>}
    return (
        <div className={styles.city}>
            <div className={styles.row}>
               <h6>City Name </h6>
               <span>{emoji}</span><h3>{cityName}</h3>
            </div>

            <div className={styles.row}>
                <h6>You want to {cityName} on</h6>
                <p>{formatDate(date || null)}</p>
            </div>

         {
            notes && (
                <div className={styles.row}>
                     <h6>Your Notes</h6>
                     <p>{notes}</p>
                </div>
            )
         }

         <div className={styles.row}>
            <h6>learn more</h6>
            <a href={`https://en.wikipedia.org/wiki/${cityName}`} 
            target="_blank" rel="noreferrer">
              Check out {cityName} on Wikipedia &rarr;
            </a>
         </div>

         <div>
           <BackButton/>
         </div>
        </div>
    )
}

export default City
