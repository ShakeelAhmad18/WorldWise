import styles from './CityItems.module.css'
import PropTypes from 'prop-types'

CityItems.propTypes={
    city:PropTypes.array,
}

const formatDate=(date)=>new Intl.DateTimeFormat("en",{
    day:'numeric',
    month:'long',
    year:'numeric',
   }).format(new Date(date))

   function getFlagEmoji(countryCode) {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char =>  127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  }


function CityItems({city}) {
    const {emoji,cityName,date}=city;
    return (
        <li className={styles.cityItem}>
            <span className={styles.emoji}>{getFlagEmoji(emoji)}</span>
            <h3 className={styles.name}>{cityName}</h3>
            <time className={styles.date}>{formatDate(date)}</time>
            <button className={styles.deleteBtn}>&times;</button>
        </li>
    )
}

export default CityItems
