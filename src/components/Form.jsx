// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from 'react'
import styles from './Form.module.css'
import Button from './Button'
import BackButton from './BackButton'
import { useUrlPositon } from '../hooks/useUrlPosition'
import { latLngBounds } from 'leaflet'
import Message from './Message'
import Spinner from './Spinner'


 const convertToEmoji = (countryCode) => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt())
  return String.fromCodePoint(...codePoints)
}

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client'

function Form() {
  const [lat, lng] = useUrlPositon()

  const [cityName, setCityName] = useState('')
  const [country, setCountry] = useState('')
  const [date, setDate] = useState(new Date())
  const [notes, setNotes] = useState('')
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false)
  const [emoji, setEmoji] = useState('')
  const [geocodingError, setGeocodingError] = useState('')

  useEffect(() => {

    if (!lat || !lng) return

    async function fetchCityData() {
      try {
        setIsLoadingGeocoding(true)
        setGeocodingError('')
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
        const data = await res.json()
        console.log('data in form fetch', data)

        if (!data.countryCode)
          throw new Error('That city does not exist, click somewhere else')

        setCityName(
          data.city || data.locality || data.principalSubdivision || 'Unknown'
        )
        setCountry(data.countryName)
        setEmoji(convertToEmoji(data.countryCode))
      } catch (error) {
        setGeocodingError(error.message)
      } finally {
        setIsLoadingGeocoding(false)
      }
    }
    fetchCityData()
  }, [lat, lng])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newCity = {
      cityName,
      country,
      date,
      notes,
      lat,
      lng,
    }
    console.log('newCity', newCity)
  }


  if (isLoadingGeocoding) return <Spinner />

  if (!lat && !lng) return <Message message="Click on the map to add a city" />

  if (geocodingError) return <Message message={geocodingError} />

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  )
}

export default Form
