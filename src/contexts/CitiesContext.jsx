import { createContext, useContext, useEffect, useState } from 'react'

const CitiesContext = createContext()
const BASE_URL = 'http://localhost:9000'

const CitiesProvider = ({ children }) => {
  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentCity, setCurrentCity] = useState({});

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

return (
  <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity }}>
    {children}
  </CitiesContext.Provider>
)

}

const useCities= () => {
  const context = useContext(CitiesContext)
  if (context === undefined) {
    throw new Error('useCities must be used within a CitiesProvider')
  }
  return context
}


export { CitiesContext, CitiesProvider, useCities }