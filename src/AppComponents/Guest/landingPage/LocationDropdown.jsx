import Axios from "axios"
import { useState } from "react"

const LocationDropdown = (props) => {
    const [loading, setLoading] = useState(false)
    const onChange = (e) => {
        setLoading(true)
        if(e.target.name === "town"){
            let selectedTown = props.town.towns.filter((town) => town.id == e.target.value)
            let isAvailable = selectedTown[0].enabled
            if(isAvailable === "0"){
                props.setOpenSuccess(false)
            }
            props.setTown({
                ...props.town,
                town: e.target.value,
                isAvailable: isAvailable === "1" ? true : false
            })
            setLoading(false)
        }
        else if(e.target.name === "lga"){
            let selectedLga = props.lga.lgas.filter((lga) => lga.id == e.target.value)
            let isAvailable = selectedLga[0].enabled
            if(isAvailable === "0"){
                props.setOpenSuccess(false)
            }
            Axios.get(`https://server.wakameals.validprofits.xyz/api/town/list/${e.target.value}`)
            .then((res) => {
                props.setTown({
                    ...props.town,
                    towns: res.data.towns,
                })
                props.setLga({
                    ...props.lga,
                    lga: e.target.value,
                    isAvailable: isAvailable === "1" ? true : false
                })
                setLoading(false)
            })
            .catch((e) => {
                setLoading(false)
            })
        }
        else if(e.target.name === "state"){ 
        let selectedState = props.state.states.filter((state) => state.id == e.target.value)
        let isAvailable = selectedState[0].enabled
        if(isAvailable === "0"){
            props.setOpenSuccess(false)
        }
            Axios.get(`https://server.wakameals.validprofits.xyz/api/lga/list/${e.target.value}`)
            .then((res) => {
                console.log(res)
                props.setLga({
                    ...props.lga,
                    lgas: res.data.lgas,
                })
                props.setState({
                    ...props.state,
                    state: e.target.value,
                    isAvailable: isAvailable === "1" ? true : false
                })
                setLoading(false)
            })
            .catch((e) => {
                setLoading(false)
            })
        } else {
            setLoading(false)
        }
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
                    <label for="locationDropdown" className="white">{props.state.isAvailable ? props.lga.isAvailable ? "Town" : "LGA" : "State"}</label>
                    {props.state.isAvailable !== true && (
                        <select className="form-control cursor" onChange={onChange} name="state">
                            <option value="">Pick a state...</option>
                            {props.state.states.map((data) => (
                                <option className="cursor" key={data.slug} value={data.id}>{data.name}</option>
                            ))}
                        </select>
                    )}
                    {props.lga.isAvailable !== true && props.town.isAvailable === "" && props.state.isAvailable === true && (
                        <select className="form-control cursor" onChange={onChange} name="lga">
                            <option value="">Pick an LGA...</option>
                            {props.lga.lgas.map((data) => (
                                <option className="cursor" key={data.slug} value={data.id}>{data.name}</option>
                            ))}
                        </select>
                    )}
                    {props.lga.isAvailable === true && props.state.isAvailable === true && (
                        <select className="form-control cursor" onChange={onChange} name="town">
                            <option value="">Pick a town...</option>
                            {props.town.towns.map((data) => (
                                <option className="cursor" key={data.slug} value={data.id}>{data.name}</option>
                            ))}
                        </select>
                    )}
                    
                
                </div>
            )
        }
        </div>
    )
}

export default LocationDropdown