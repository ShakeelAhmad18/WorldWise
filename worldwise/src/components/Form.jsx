import { useState } from 'react';
import styles from './Form.module.css'
import Button from './Button';
import { useNavigate } from 'react-router-dom';


export function convertToEmoji(countryCode){
    const codePoints= countryCode.toUpperCase().split("").map((char)=>127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints)

}


function Form() {
    const nevigate=useNavigate()
    const [cityName,setCityName]=useState('')
    const [date,setDate]=useState(new Date())
    const [notes,setNotes]=useState('')

    return (
        <form className={styles.form}>
            <div className={styles.row}>
                <label htmlFor="cityName">City Name</label>
                <input id='cityName' type="text" value={cityName}  onChange={(e)=>setCityName(e.target.value)}/> {/* <span className={styles.flag}>{emoji}</span> */}
            </div>


            <div className={styles.row}>
                   <label htmlFor="date">When did you go to {cityName}</label>
                   <input
                    id="date" 
                    value={date} onChange={(e)=>setDate(e.target.value)} />
            </div>

            <div className={styles.row}>
                 <label htmlFor="notes">Notes about your trip to {cityName}</label>
                 <textarea  id="notes" value={notes} onChange={(e)=>setNotes(e.target.value)}></textarea>
            </div>

            <div className={styles.buttons}>
                <Button type='primary'>Add</Button>
                <Button type='back' onClick={(e)=>{
                      e.preventDefault();
                    nevigate(-1)}}>&larr; Back</Button>
            </div>
        </form>
    )
}

export default Form
