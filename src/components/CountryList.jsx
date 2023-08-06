/* eslint-disable react/prop-types */
import CountryItem from './CountryItem'
import styles from './CountryList.module.css'
import Spinner from './Spinner'
import Message from './Message'

const CountryList = ({cities, isLoading}) => {
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add a city by clicking on a city on the map" />
    );

    const countries = cities.reduce((acc, city) => {
        if(!acc.map(el=>el.country).includes(city.country)) {
        return [...acc, {country: city.country, emoji: city.emoji, id: city.id}]
        }
        return acc
    }, [])

    return (    
    <ul className={styles.countryList}>
        {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
        ))}

    </ul>
  )
} 

export default CountryList
