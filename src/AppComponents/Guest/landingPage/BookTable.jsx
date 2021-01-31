import axios from "axios";
import { useEffect, useState } from "react";


const BookTable = (props) => {
    const [data, setData] = useState({
        reserved_date: "",
        reserved_time: "",
        number_of_seat: 2
    })
    const [loading, setLoading] = useState(false)
    const [locations, setLocations] = useState([])
    const [dispatcher, setDispatcher] = useState("")

    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }


    const submit = (e) => {
        e.preventDefault();
        if(data.number_of_seat < 1){
            props.notifyWarning("Number of seats must be greater than zero")
        }
        else if(dispatcher.length === 0){
            props.notifyWarning("a location must be selected")
        }
        else {
        let token = localStorage.getItem("token")
        let parsedToken = JSON.parse(token)
        setLoading(true)
        axios.post("https://server.wakameals.validprofits.xyz/api/reservation/new", {
                ...data,
                dispatcher
            }, {
                headers: {
                    Authorization: `Bearer ${parsedToken}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    },
            })
            .then((res) => {
                setLoading(false)
                props.notifySuccess("Booked successfully")
            })
            .catch((e) => {
                props.notifyWarning(e.response.data.errors.reserved_date ? e.response.data.errors.reserved_date[0] : e.response.data.errors.reserved_time ? e.response.data.errors.reserved_time[0] : "an error occured")
                setLoading(false)
            })
        }
    }

    useEffect(() => {
        let location = localStorage.getItem("location")
        let parsedLocation = JSON.parse(location)
        axios.get(`https://server.wakameals.validprofits.xyz/api/avail_pickup/${parsedLocation.slug}/list`, {
            headers: {
                Authorization: `Bearer ${props.token}`,
                "Content-Type": "application/json",
                Accept: "application/json",
              },
        })
        .then((res) => {
            setLocations(res.data.pickup_locations)
        })
    }, [])
    return (
        <div style={{height: "500px"}}>
            <form onSubmit={submit}>
                <div className="d-flex flex-column justify-content-between">
                    <label htmlFor="reserved_date">Date</label>
                    <input onChange={handleChange} id="reserved_date" name="reserved_date" type="date" required />
                </div>
                <div className="mt-2 d-flex flex-column justify-content-between">
                    <label htmlFor="reserved_time">Time</label>
                    <input onChange={handleChange} id="reserved_time" name="reserved_time" type="time" required />
                </div>
                <div className="mt-2 d-flex flex-column justify-content-between">
                    <label htmlFor="number_of_seat">Number of seat</label>
                    <input onChange={handleChange} id="number_of_seat" value={data.number_of_seat} name="number_of_seat" type="number" required />
                </div>
                <div className="mt-2 d-flex flex-column justify-content-between">
                    <label htmlFor="reserved_location">Select Location</label>
                    <select onChange={(e) => setDispatcher(e.target.value)} required id="reserved_location">
                        <option value=""></option>
                        {locations.map((data, index) => (
                            <option key={index} value={data.id}>{data.name}</option>
                        ))}
                    </select>
                </div>
                {loading ? (
                    <div className="spinner-grow text-center mt-4 ml-1" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                ) : (
                    <button className="btn mt-4 modal-btn">Submit</button>
                )}
            </form>
        </div>
    )
}

export default BookTable;