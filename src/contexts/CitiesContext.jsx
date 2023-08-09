import { createContext, useContext, useEffect, useState } from 'react'

const CitiesContext = createContext()
const BASE_URL = 'http://localhost:9000'

const CitiesProvider = ({ children }) => {
  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentCity, setCurrentCity] = useState({})

  useEffect(() => {
    console.log(' cities data =>', cities)
  }, [cities])

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`${BASE_URL}/cities`)
        const data = await response.json()
        setCities(data)
      } catch (error) {
        setIsLoading(false)
        alert('there was an error loading the cities')
      } finally {
        setIsLoading(false)
      }
    }
    fetchCities()
  }, [])

  const getCity = async (id) => {
    try {
      setIsLoading(true)
      const response = await fetch(`${BASE_URL}/cities/${id}`)
      const data = await response.json()
      setCurrentCity(data)
    } catch (error) {
      setIsLoading(false)
      alert('there was an error loading the cities')
    } finally {
      setIsLoading(false)
    }
  }

  const createCity = async (newCity) => {
    try {
      setIsLoading(true)
      const response = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await response.json()
      console.log('data =>', data)
      setCities([...cities, data])
    } catch (error) {
      setIsLoading(false)
      alert('there was an error loading the cities')
    } finally {
      setIsLoading(false)
    }
  }

  const deleteCity = async (id) => {
    try {
      setIsLoading(true)
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE'
      })
      setCities((cities) => cities.filter((city) => city.id !== id))
    } catch (error) {
      setIsLoading(false)
      alert('there was an error deleting the city')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, currentCity, getCity, createCity, deleteCity }}
    >
      {children}
    </CitiesContext.Provider>
  )
}

const useCities = () => {
  const context = useContext(CitiesContext)
  if (context === undefined) {
    throw new Error('useCities must be used within a CitiesProvider')
  }
  return context
}

export { CitiesContext, CitiesProvider, useCities }
