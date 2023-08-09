import { useNavigate } from 'react-router-dom'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from 'react-leaflet'

import styles from './Map.module.css'
import { useEffect, useState } from 'react'
import { useCities } from '../contexts/CitiesContext'
import { map } from 'leaflet'
import { useGeoLocation } from '../hooks/useGeoLocation'
import Button from './Button'
import { useUrlPositon } from '../hooks/useUrlPosition'

const Map = () => {
  const { cities } = useCities()

  const [mapPosition, setMapPosition] = useState([51.5072, 0.1276])
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeoLocation()

  const [mapLat, mapLng] = useUrlPositon()
  
  useEffect(() => {
    if (mapLat && mapLng) {
      setMapPosition([mapLat, mapLng])
    }
  }, [mapLat, mapLng])

useEffect(() => {
  if (geolocationPosition) {
    setMapPosition([geolocationPosition.lat, geolocationPosition.lng])
  }
}, [geolocationPosition])


  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && <Button type="position" onClick={getPosition}>
        {isLoadingPosition ? 'Loading' : 'Use your position'}
      </Button>}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>
                {city.emoji}
                <h5>
                  {city.cityName}
                  <br></br> {city.notes}
                </h5>{' '}
              </span>
            </Popup>
            {/* <ChangeCenter position={[city.position.lat, city.position.lng]} /> */}
          </Marker>
        ))}

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  )
}

const ChangeCenter = ({ position }) => {
  const map = useMap()
  map.setView(position)
  return null
}

const DetectClick = () => {
  const navigate = useNavigate()
  useMapEvents({
    click: (e) => {
      console.log(e)
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    },
  })
  return null
}

export default Map
