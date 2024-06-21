import styles from "./CityItems.module.css";
import PropTypes from "prop-types";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CitieContext} from "../context/CitiesContext";

CityItems.propTypes = {
  city: PropTypes.array,
};

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

/*function getFlagEmoji(countryCode) {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char =>  127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  }*/

function CityItems({ city }) {
  const { emoji, cityName, date, id,position } = city;
  const {currentCity}=useContext(CitieContext)

  return (
    <li>
      <Link className={`${styles.cityItem} ${id === currentCity.id ? styles['cityItem--active'] : ''}`} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItems;
