import { useNavigate, useSearchParams } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import styles from './Map.module.css'
import { useState } from 'react'
import { useCities } from '../contexts/CitiesContext'

const Map = () => {
  const navigate = useNavigate()
  const { cities } = useCities()
  const [mapPosition, setMapPosition] = useState([51.505, -0.09])

  const [searchParams, setSearchParams] = useSearchParams()
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[(city.position.lat), (city.position.lng)]}
            key={city.id}
          >
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      {/* <h1>Postion: {lat}, {lng}</h1>
      <button onClick={() => {setSearchParams({ lat:23, lng:50 })}}>Change positon</button> */}
    </div>
  )
}

export default Map
