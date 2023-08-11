import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react'

const CitiesContext = createContext()
const BASE_URL = 'http://localhost:9000'

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: '',
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true }

    case 'cities/loaded':
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      }

    case 'city/loaded':
      return { ...state, isLoading: false, currentCity: action.payload }

    case 'city/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      }

    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      }

    case 'rejected':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    default:
      throw new Error('Unknown action type')
  }
}
const CitiesProvider = ({ children }) => {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  )
  // const [cities, setCities] = useState([])
  // const [isLoading, setIsLoading] = useState(false)
  // const [currentCity, setCurrentCity] = useState({})

  useEffect(() => {
    console.log(' cities data =>', cities)
  }, [cities])

  useEffect(() => {
    const fetchCities = async () => {
      dispatch({ type: 'loading' })

      try {
        const response = await fetch(`${BASE_URL}/cities`)
        const data = await response.json()
        dispatch({ type: 'cities/loaded', payload: data })
      } catch (error) {
        dispatch({
          type: 'rejected',
          payload: 'there was an error loading cities',
        })
        alert('there was an error loading the cities')
      }
    }
    fetchCities()
  }, [])
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const getCity = async (id) => {
    if(Number(id) === currentCity.id) {return}

    dispatch({ type: 'loading' })

    try {
      const response = await fetch(`${BASE_URL}/cities/${id}`)
      const data = await response.json()
      dispatch({ type: 'city/loaded', payload: data })
    } catch (error) {
      dispatch({
        type: 'rejected',
        payload: 'there was an error loading the city',
      })
      alert('there was an error loading the city')
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const createCity = async (newCity) => {
    if (cities.map((city) => city.cityName === newCity.cityName)) {
      console.log('city already exists, no need to add it again')
      alert('city already exists, no need to add it again')
      return
    }

    dispatch({ type: 'loading' })

    try {
      const response = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await response.json()
      dispatch({ type: 'city/created', payload: data })
      console.log('data =>', data)
      // setCities([...cities, data])
    } catch (error) {
      dispatch({
        type: 'rejected',
        payload: 'there was an error creating the city',
      })
      alert('there was an error creating the city')
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const deleteCity = async (id) => {
    dispatch({ type: 'loading' })

    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      })
      // setCities((cities) => cities.filter((city) => city.id !== id))
      dispatch({ type: 'city/deleted', payload: id })
    } catch (error) {
      dispatch({
        type: 'rejected',
        payload: 'there was an error deleting the city',
      })
      alert('there was an error deleting the city')
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
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
