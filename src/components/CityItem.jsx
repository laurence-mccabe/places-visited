/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import styles from './CityItem.module.css'

const formatDate = (date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))

const CityItem = ({ city }) => {
  const { cityName, emoji, date, id } = city

  console.log(city)
  return (
    <Link to={`${id}`} className={styles.cityItem}>
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>{formatDate(date)}</time>
      <button className={styles.deleteBtn}>x</button>
    </Link>
  )
}

export default CityItem
