import CityItems from './CityItems'
import styles from './CityList.module.css'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import Message from './Message'
import { useContext } from 'react'
import { CitieContext } from '../context/CitiesContext'


CityList.propTypes={
    cities:PropTypes.array,
    isLoading:PropTypes.bool,
}
function CityList() {

const {cities,isLoading}=useContext(CitieContext)
    if(isLoading) {
        return(
            <Spinner/>
        )
    }

    if(!cities.length) {
        return (
            <Message message="there is no city So, click on the map for adding city"/>
        )
    }

    return (
        <ul className={styles.cityList}>
            {cities.map((city)=><CityItems city={city} key={city.id}/>)}
        </ul>
    )
}

export default CityList
