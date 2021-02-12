import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const serviceType = [
    {
        name: "Pickup",
        code: "pickup"
    },
    {
        name: "Door Delivery",
        code: "door_delivery"
    },
    {
        name: "Full Buffet",
        code: "full_buffet"
    },
    {
        name: "Served Buffet",
        code: "served_buffet"
    },
    {
        name: "Pre Packed Service",
        code: "pre_packed_service"
    },
]

const menuType = [
    {
        name: "Waka G&B",
        code: "waka_g&b"
    },
    {
        name: "Waka Chinese",
        code: "waka_chinese"
    },
    {
        name: "Waka Naija",
        code: "waka_naija"
    },
    {
        name: "Beverages",
        code: "beverages"
    },
    {
        name: "Others",
        code: "others"
    },
]

const crowdType = [
    {
        name: "Mixed",
        code: "mixed"
    },
    {
        name: "Adults",
        code: "adults"
    },
    {
        name: "Children",
        code: "children"
    },
    {
        name: "Advanced",
        code: "advanced"
    },
    {
        name: "High Class",
        code: "high_class"
    },
    {
        name: "Middle Class",
        code: "middle_class"
    },
    {
        name: "Low Class",
        code: "low_class"
    },
    {
        name: "Mixed Class",
        code: "mixed_class"
    },
]


const BookTable = (props) => {
    const history = useHistory()
    const [data, setData] = useState({
        reserved_date: "",
        reserved_time: "",
        no_of_persons: 2,
        name: "",
        phone: "",
        address: "",
        event_address: "",
        service_type: "",
        crowd_type: "",
        menu_type: "",
        email: ""
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
        setLoading(true)
        axios.post("https://server.wakafoods.com/api/reservation/new", {
                ...data,
                dispatcher
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    },
            })
            .then((res) => {
                setLoading(false)
                props.notifySuccess("Booked successfully")
            })
            .catch((e) => {
                const error = e.response.data.errors;
                console.log(error)
                props.notifyWarning(error.reserved_date ? error.reserved_date[0] : error.reserved_time ? error.reserved_time[0] : error.email ? error.email[0] : error.name ? error.name[0] : error.no_of_persons ? error.no_of_persons : error.phone ? error.phone[0] : "an error occured")
                setLoading(false)
            })
        }
    }

    useEffect(() => {
        let location = localStorage.getItem("location")
        let parsedLocation = JSON.parse(location)
        axios.get(`https://server.wakafoods.com/api/avail_pickup/${parsedLocation.slug}/list`, {
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
        <div className="book p-3">
            <form onSubmit={submit}>
                <div className="d-flex flex-column justify-content-between">
                    <label htmlFor="name">Name</label>
                    <input className="form-control" onChange={handleChange} id="name" name="name" type="text" required />
                </div>
                <div className="d-flex flex-column justify-content-between">
                    <label htmlFor="email">Email</label>
                    <input className="form-control" onChange={handleChange} id="email" name="email" type="email" required />
                </div>
                <div className="mt-2 d-flex flex-column justify-content-between">
                    <label htmlFor="phone">Phone</label>
                    <input className="form-control" onChange={handleChange} id="phone" name="phone" type="text" required />
                </div>
                <div className="mt-2 d-flex flex-column justify-content-between">
                    <label htmlFor="address">Address</label>
                    <input className="form-control" onChange={handleChange} id="address" name="address" type="text" />
                </div>
                <div className="mt-2 d-flex flex-column justify-content-between">
                    <label htmlFor="event_address">Event_address</label>
                    <input className="form-control" onChange={handleChange} id="event_address" name="event_address" type="text" />
                </div>
                <div className="mt-2 d-flex flex-column justify-content-between">
                    <label htmlFor="reserved_date">Date</label>
                    <input className="form-control" onChange={handleChange} id="reserved_date" name="reserved_date" type="date" required />
                </div>
                <div className="mt-2 d-flex flex-column justify-content-between">
                    <label htmlFor="reserved_time">Time</label>
                    <input className="form-control" onChange={handleChange} id="reserved_time" name="reserved_time" type="time" required />
                </div>
                <div className="mt-2 d-flex flex-column justify-content-between">
                    <label htmlFor="number_of_persons">Number of persons</label>
                    <input className="form-control" onChange={handleChange} id="number_of_persons" value={data.no_of_persons} name="no_of_persons" type="number" required />
                </div>
                <div className="mt-2 d-flex flex-column justify-content-between">
                    <label htmlFor="service_type">Service Type</label>
                    <select name="service_type" className="form-control" onChange={handleChange} required id="service_type">
                        <option value=""></option>
                        {serviceType.map((data, index) => (
                            <option key={index} value={data.code}>{data.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mt-2 d-flex flex-column justify-content-between">
                    <label htmlFor="crowd_type">Crowd Type</label>
                    <select name="crowd_type" className="form-control" onChange={handleChange} required id="crowd_type">
                        <option value=""></option>
                        {crowdType.map((data, index) => (
                            <option key={index} value={data.code}>{data.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mt-2 d-flex flex-column justify-content-between">
                    <label htmlFor="menu_type">Menu Type</label>
                    <select name="menu_type" className="form-control" onChange={handleChange} required id="menu_type">
                        <option value=""></option>
                        {menuType.map((data, index) => (
                            <option key={index} value={data.code}>{data.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mt-2 d-flex flex-column justify-content-between">
                    <label htmlFor="reserved_location">Select Location</label>
                    <select className="form-control" onChange={(e) => setDispatcher(e.target.value)} required id="reserved_location">
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