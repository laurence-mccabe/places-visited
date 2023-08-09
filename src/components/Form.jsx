// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from 'react'
import styles from './Form.module.css'
import Button from './Button'
import BackButton from './BackButton'
import { useUrlPositon } from '../hooks/useUrlPosition'
import { latLngBounds } from 'leaflet'
import Message from './Message'
import Spinner from './Spinner'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useCities } from '../contexts/CitiesContext'
import { useNavigate } from 'react-router-dom'

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
  const { createCity, isLoading } = useCities()
  const navigate = useNavigate()

  const [cityName, setCityName] = useState('')
  const [country, setCountry] = useState('')
  const [date, setDate] = useState(new Date())
  const [notes, setNotes] = useState('')
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false)
  const [emoji, setEmoji] = useState('')
  const [geocodingError, setGeocodingError] = useState('')
  const [startDate, setStartDate] = useState(new Date())

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!cityName || !date) return
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    }
    console.log('newCity', newCity)
    await createCity(newCity)
    navigate('/app/cities')
  }

  if (isLoadingGeocoding) return <Spinner />

  if (!lat && !lng) return <Message message="Click on the map to add a city" />

  if (geocodingError) return <Message message={geocodingError} />

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ''}`}
      onSubmit={handleSubmit}
    >
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
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="dd/MM/yyyy"
          id="date"
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
