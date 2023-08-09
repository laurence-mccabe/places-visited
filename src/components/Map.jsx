import { useNavigate, useSearchParams } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'

import styles from './Map.module.css'
import { useEffect, useState } from 'react'
import { useCities } from '../contexts/CitiesContext'
import { map } from 'leaflet'

const Map = () => {
  const navigate = useNavigate()
  const { cities } = useCities()

  const [mapPosition, setMapPosition] = useState([51.5072, 0.1276])
  const [searchParams, setSearchParams] = useSearchParams()

  const mapLat = searchParams.get('lat');
  const mapLng = searchParams.get('lng');

  useEffect(() => {
    console.log('mapLat and mapLng', mapLat, mapLng)
    if (mapLat && mapLng)
    {
    setMapPosition([mapLat, mapLng])}
  }, [mapLat, mapLng])


  return (
    <div className={styles.mapContainer}>
      <MapContainer
        // center={mapLat && mapLng ? [mapLat, mapLng] : mapPosition}
        // center={[mapLat, mapLng]}
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
            position={[(city.position.lat), (city.position.lng)]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}<h5>{city.cityName}<br></br> {city.notes}</h5> </span>
            </Popup>
            {/* <ChangeCenter position={[city.position.lat, city.position.lng]} /> */}
          </Marker>
        ))}
        
        <ChangeCenter position={mapPosition} />
      </MapContainer>
      {/* <h1>Postion: {lat}, {lng}</h1>
      <button onClick={() => {setSearchParams({ lat:23, lng:50 })}}>Change positon</button> */}
    </div>
  )
}

const ChangeCenter = ({ position }) => {
  const map = useMap()
  map.setView(position)
  return null;
}

export default Map
