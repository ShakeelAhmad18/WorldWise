import styles from './CountryList.module.css'
import PropTypes from 'prop-types'
import Spinner from './Spinner'
import Message from './Message'
import CountryItem from './CountryItem'

CountryList.propTypes={
    cities:PropTypes.array,
    isLoading:PropTypes.bool
}

function CountryList({cities,isLoading}) {

    if(isLoading) return <Spinner/>

    if(!cities.length) {
        return (
            <Message message="there is no city So, click on the map for adding city"/>
        )
    }

 const countries=cities.reduce((arr,city)=>{
    if(!arr.map((el)=>el.country).includes(city.country))
        return [...arr,{country:city.country,emoji:city.emoji}];
    else return arr
 },[])

    return (
        <ul className={styles.countryList}>
            {countries.map((country)=><CountryItem country={country} key={country.id}/>)}
        </ul>
    )
}

export default CountryList
