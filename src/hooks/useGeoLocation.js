import { useState } from "react"

export function useGeoLocation(defaultPosition = null) {
    const [isLoading, setIsLoading] = useState(false)
    const [position, setPosition] = useState(defaultPosition)
    const [error, setError] = useState(null)


const getPosition = () => {
    if (!navigator.geolocation) 
        return setError('Geolocation is not supported by your browser')

        setIsLoading(true)
        navigator.geolocation.getCurrentPosition((pos) => {
            setPosition({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
            })
            setIsLoading(false)
        }, (error) => {
            setError(error.message)
            setIsLoading(false)
        }
        )
    }

    return { isLoading, position, error, getPosition }
}
