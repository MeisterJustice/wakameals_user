import Axios from "axios"
import { useState } from "react"

const LocationDropdown = (props) => {
    const [loading, setLoading] = useState(false)

    const onChange = async (e) => {
        setLoading(true)
        let selectedPlace = await props.states.filter((place) => place.id == e.target.value)
        props.setPlace({
            ...selectedPlace[0]
        })
        setLoading(false)
        localStorage.setItem("place", JSON.stringify(selectedPlace[0].id))
    }

    return (
        <div>
            {loading ? (
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <div className="spinner-grow text-center" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            ) : (
                <div>
                    <label htmlFor="locationDropdown" className="white text-big">Select Location</label>
                        <select className="form-control cursor" onChange={onChange}>
                            <option value="">Pick a city...</option>
                            {props.states.map((data) => (
                                <option className="cursor" key={data.slug} value={data.id}>{data.name}</option>
                            ))}
                        </select>        
                </div>
            )
        }
        </div>
    )
}

export default LocationDropdown