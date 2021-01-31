import Axios from "axios"
import { useState } from "react"

const LocationDropdown = (props) => {
    const [loading, setLoading] = useState(false)

    const onChange = async (e) => {
        setLoading(true)
        let selectedPlace = await props.states.filter((place) => place.id == e.target.value)
        // if(isAvailable === "0"){
        //     props.setOpenSuccess(false)
        // }
        props.setPlace({
            ...selectedPlace[0]
        })
        setLoading(false)
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
                    <label htmlFor="locationDropdown" className="white">Select Location</label>
                        <select className="form-control cursor" onChange={onChange}>
                            <option value="">Pick a state...</option>
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