import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react'

const CitiesContext = createContext();
// i have switched from using json-server to using jsonbin.io, as netlify does not support json-server
// I can only access data from JsonBin using the BinId for one lot of data - I cannot access directly sub parts
// of it from there. SO I either have to fetch the data and do do all the filtering and sorting clent side,
// or I have to create a new bin for each city. I have chosen to create a new bin for each city. 

const BASE_URL = 'https://api.jsonbin.io/v3/b/65290bbe0574da7622b8512f';
const BASE_URL_CREATE= 'https://api.jsonbin.io/v3/b';
const API_KEY = '$2a$10$ZJ/Nce.zxamZgfnfWwndkekLyNkSDVxYPWK8c6ss9ts7ZtMrlFoiO';

const binIds = [
  { binId: '65290bbe0574da7622b8512f', cityName: 'Lisbon' },
  { binId: '65290bbe0574da7622b8512f', cityName: 'Madrid' },
  { binId: '65290bbe0574da7622b8512f', cityName: 'Berlin' },
  { binId: '65290bbe0574da7622b8512f', cityName: 'Castlecomer' },
  { binId: '65290bbe0574da7622b8512f', cityName: 'Pirmasens' },
];
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
        cities: state.cities.filter((city) => city.cityName !== action.payload),
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

  useEffect(() => {
    console.log(' cities data =>', cities)
  }, [cities])

  useEffect(() => {
        const fetchCities = async () => {
          dispatch({ type: 'loading' })
    
          try {
            const response = await fetch(`${BASE_URL}`, {
              method: 'GET',
              headers: {
                'X-Master-Key': API_KEY,
                'Content-Type': 'application/json',
              },
            }); 
            const dataRaw = await response.json()
            console.log('dataRaw =>', dataRaw)
            const data = dataRaw.record
            console.log('data =>', data)
    
    
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
  const getCity = useCallback(async (id) => {
    // retireve these client side from the cities array, cannot access subparts of the 1 initial binId data from jsonbin.io
    if (Number(id) === currentCity.id) {
      return
    }
    dispatch({ type: 'loading' })

    try {
      const data = cities.find((city) => city.id === Number(id))
      dispatch({ type: 'city/loaded', payload: data })
    } catch (error) {
      dispatch({
        type: 'rejected',
        payload: 'there was an error loading the city',
      })
      alert('there was an error loading the city')
    }
  },[currentCity.id,cities])
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const createCity = async (newCity,id) => {
        if (cities.some((city) => city.cityName === newCity.cityName)) {
          console.log('city already exists, no need to add it again')
          alert('city already exists, no need to add it again')
          return
        }
    
        dispatch({ type: 'loading' })
    
        try {
          const response = await fetch(`${BASE_URL_CREATE}`, {
            method: 'POST',
            headers: {
              'X-Master-Key': API_KEY,
              'Content-Type': 'application/json',
              'X-Bin-Name': `${newCity}`,
            },
            body: JSON.stringify(newCity),
          }); 
            const dataRaw = await response.json()
            // console.log('dataCreateCityRaw =>', dataRaw)
            const binId = dataRaw.metadata.id
            // console.log('binId =>', binId)
            binIds.push({ binId, cityName: newCity.cityName,id });
            console.log('binIds =>', binIds)
    
            const data = dataRaw.record
            console.log('dataCreateCity =>', data)
    
          dispatch({ type: 'city/created', payload: data })
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
  const deleteCity = async (cityName) => {
    dispatch({ type: 'loading' })
    
    let binId;
    const binIdInfo = binIds.find((info) => info.cityName === cityName);
    console.log('binIdInfo =>', binIdInfo)
    binId = binIdInfo.binId;
    // do not delete the original binId from the server for the 5 default cities
    if (binId !== '65290bbe0574da7622b8512f') {
    try {
      const response = await fetch(`${BASE_URL_CREATE}/${binId}`, {
        method: 'DELETE',
        headers: {
          'X-Master-Key': API_KEY,
        }
      })

      if (response.ok) {
        console.log('City deleted');
      } else {
        console.log('City not deleted');
      }


      dispatch({ type: 'city/deleted', payload: cityName })
    } catch (error) {
      dispatch({
        type: 'rejected',
        payload: 'there was an error deleting the city',
      })
      alert('there was an error deleting the city')
    }
  }
else{      dispatch({ type: 'city/deleted', payload: cityName })


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