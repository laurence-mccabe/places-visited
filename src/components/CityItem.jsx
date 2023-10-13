/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import styles from './CityItem.module.css'
import { useCities } from '../contexts/CitiesContext'

const formatDate = (date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))

const CityItem = ({ city }) => {
  const { currentCity, deleteCity } = useCities()
  const { cityName, emoji, date, id, position } = city

  function handleClick(e) {
    e.preventDefault();
    deleteCity(cityName);
  }

  return (
    <Link
      to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      className={`${styles.cityItem} ${
        id === currentCity.id ? styles['cityItem--active'] : ''
      }`}
    >
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>{formatDate(date)}</time>
      <button className={styles.deleteBtn} onClick={handleClick}>
        x
      </button>
    </Link>
  )
}

export default CityItem
