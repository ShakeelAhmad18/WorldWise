import styles from './CountryItem.module.css'
import PropTypes from 'prop-types';


/*function getFlagEmoji(countryCode) {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char =>  127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  }*/

    
CountryItem.propTypes={
    country:PropTypes.array
}

function CountryItem({country}) {
    return (
        <li className={styles.countryItem}>
            <span>{country.emoji}</span>
            <span>{country.country}</span>
        </li>
    )
}

export default CountryItem
