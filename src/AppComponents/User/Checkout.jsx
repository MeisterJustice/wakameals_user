import { MdHome, MdLocationCity, MdPerson, MdPhoneAndroid } from "react-icons/md"
import HeaderNav from "../Navigation/HeaderNav"
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useEffect, useState } from "react";
import { Checkbox, TextField } from "@material-ui/core";
import Moment from 'react-moment';
import { usePaystackPayment } from 'react-paystack';
import { v4 as uuidv4 } from 'uuid';
import Axios from "axios";
import Preloader from "../ReuseableCompononts/Preloader";

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom";


Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}


var date = new Date();

const Checkout = (props) => {
    const history = useHistory();
    const [order_codes, setOrderCodes] = useState([])
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [checked, setChecked] = useState(false);
    const [checkedMonday, setCheckedMonday] = useState({
        status: false,
        date: null
    });
    const [checkedTuesday, setCheckedTuesday] = useState({
        status: false,
        date: null
    });
    const [checkedWednesday, setCheckedWednesday] = useState({
        status: false,
        date: null
    });
    const [checkedThursday, setCheckedThursday] = useState({
        status: false,
        date: null
    });
    const [checkedFriday, setCheckedFriday] = useState({
        status: false,
        date: null
    });
    const [checkedSaturday, setCheckedSaturday] = useState({
        status: false,
        date: null
    });
    const [checkedSunday, setCheckedSunday] = useState({
        status: false,
        date: null
    });
    const [first_time, setFirstTime] = useState(null)
    const [second_time, setSecondTime] = useState(null)
    const [config, setConfig] = useState({
        reference: uuidv4(),
        email: "",
        amount: "",
        metadata: {
            customer: "",
            email: "",
            order_codes: []
        },
        publicKey: 'pk_live_09c5cb5a0db47dbe7a2c4488bb27fbb6f2f3109c',
    })
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        title: "",
        phone: "",
    })
    const [address, setAddress] = useState("")
    const [pickupLocation, setPickupLocation] = useState({
        location: "",
        code: "",
        place: ""
    })
    const [placeId, setPlaceId] = useState("")
    const [cart, setCart] = useState([])
    const [loading, setLoading] = useState(true)
    const [selected, setSelected] = useState("door_delivery")
    const [loadOrder, setLoadOrder] = useState(false)
    const notifySuccess = (text) => toast.success(text);
    const notifyWarning = (text) => toast.error(text);

    const days = [1, 2, 3, 4, 5, 6, 7]

    const onSubmit = () => {
        setLoadOrder(true)
        let token = localStorage.getItem("token")
        let parsedToken = JSON.parse(token)
        let cart = localStorage.getItem("cart")
        let parsedCart = JSON.parse(cart)
        // if("07:00" > first_time){
        //     notifyWarning("time must be after 6:59 AM")
        // }
        // if(second_time > "17:15"){
        //     notifyWarning("time must be before 5:15 PM")
        // }
        // var dates = []
        // var times = []
        // if(checkedMonday.status){
        //     dates.push(checkedMonday.date.toLocaleDateString('en-CA'))
        // } if(checkedTuesday.status){
        //     dates.push(checkedTuesday.date.toLocaleDateString('en-CA'))
        // } if(checkedWednesday.status){
        //     dates.push(checkedWednesday.date.toLocaleDateString('en-CA'))
        // }if(checkedThursday.status){
        //     dates.push(checkedThursday.date.toLocaleDateString('en-CA'))
        // }if(checkedFriday.status){
        //     dates.push(checkedFriday.date.toLocaleDateString('en-CA'))
        // }if(checkedSaturday.status){
        //     dates.push(checkedSaturday.date.toLocaleDateString('en-CA'))
        // }if(checkedSunday.status){
        //     dates.push(checkedSunday.date.toLocaleDateString('en-CA'))
        // } if(first_time !== null){
        //     times.push(first_time)
        // }if(second_time !== null){
        //     times.push(second_time)
        // }
        // if(checked && dates.length === 0){
        //     notifyWarning("You must select at least one date")
        // }
        // if(checked && times.length === 0){
        //     notifyWarning("You must select at least one time")
        // }
        // if(selected === "door_delivery" && address.length === 0) {
        //     notifyWarning("address must not be empty")
        //     setLoadOrder(false)
        // }
        Axios.post("https://server.wakafoods.com/api/order/new", {
            delivery_type: selected,
            pickup_code: pickupLocation.code,
            place: placeId,
            address,
            // recurring: checked,
            // recurring_dates: dates,
            // recurring_times: times,
            meals: parsedCart
        }, {
            headers: {
                Authorization: `Bearer ${parsedToken}`,
                "Content-Type": "application/json",
                Accept: "application/json",
              }
        })
        .then((res) => {
            setOrderCodes(res.data.order_codes)
            setConfig({
                ...config,
                amount: res.data.order_total * 100,
                metadata: {
                    ...config.metadata,
                    order_codes: res.data.order_codes
                }
            })
            setTimeout(() => {
                setLoadOrder(false)
                setOpen1(true)
            }, 2000);
        })
        .catch(() => {
            setLoadOrder(false)
            notifyWarning("An error occured.... Try again")
        })
    }

    const onSuccess = (reference) => {
        let token = localStorage.getItem("token")
        let parsedToken = JSON.parse(token)
        localStorage.removeItem("cart")
        setOpen1(false)
        setLoading(true)
        Axios.get(`https://server.wakafoods.com/api/order/verify_payment?trxref=${config.reference}`, {
            headers: {
                Authorization: `Bearer ${parsedToken}`,
                "Content-Type": "application/json",
                Accept: "application/json",
              }
        })
        .then(() => {
            setLoading(false)
            notifySuccess("Order completed and payment successful")
            setOpen1(false)
            history.push("/account/open")
        })
      };
    
      // you can call this function anything
      const onClose = () => {
        Axios.get(`https://server.wakafoods.com/api/order/verify_payment?trxref=${config.reference}`)
        .then(() => {
            notifyWarning("Could not complete payment")
            setOpen1(false)
            history.push("/account/open")
            setConfig({
                ...config,
                reference: uuidv4()
            })
        })
      }

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleChangeMonday = (event, date) => {
    setCheckedMonday({
        status: event.target.checked,
        date
    });
  };
  const handleChangeTuesday = (event, date) => {
    setCheckedTuesday({
        status: event.target.checked,
        date
    });
  };
  const handleChangeWednesday = (event, date) => {
    setCheckedWednesday({
        status: event.target.checked,
        date
    });
  };
  const handleChangeThursday = (event, date) => {
    setCheckedThursday({
        status: event.target.checked,
        date
    });
  };
  const handleChangeFriday = (event, date) => {
    setCheckedFriday({
        status: event.target.checked,
        date
    });
  };
  const handleChangeSaturday = (event, date) => {
    setCheckedSaturday({
        status: event.target.checked,
        date
    });
  };
  const handleChangeSunday = (event, date) => {
    setCheckedSunday({
        status: event.target.checked,
        date
    });
  };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if(typeof props.location.query !== "undefined"){
        let token = localStorage.getItem("token")
        let parsedToken = JSON.parse(token)
        let cart = localStorage.getItem("cart")
        let parsedCart = JSON.parse(cart)
        let door_delivery = localStorage.getItem("door_delivery")
        let parsedDoorDelivery = JSON.parse(door_delivery)
        let pickup = localStorage.getItem("pickup")
        let parsedPickup = JSON.parse(pickup)
        let option = localStorage.getItem("deliveryOption")
        let parsedOption = JSON.parse(option)
        let place = localStorage.getItem("place")
        let parsedPlace = JSON.parse(place)
        setPlaceId(parsedPlace)
        if(parsedOption === "door_delivery"){
            setAddress(parsedDoorDelivery)
        }
        if(parsedOption === "pickup"){
            setPickupLocation(parsedPickup)
        }
        setSelected(parsedOption)
        setCart(parsedCart)
        Axios.get("https://server.wakafoods.com/api/profile/details", {
            headers: {
                Authorization: `Bearer ${parsedToken}`,
                "Content-Type": "application/json",
                Accept: "application/json",
              }
        })
        .then((res) => {
            setLoading(false)
            setConfig({
                ...config,
                email: res.data.details.email,
                metadata: {
                    ...config.metadata,
                    email: res.data.details.email,
                    customer: `${res.data.details.first_name} ${res.data.details.last_name}`
                }
            })
            setUser({
                first_name: res.data.details.first_name,
                last_name: res.data.details.last_name,
                title: res.data.details.title,
                phone: res.data.details.phone,
            })
        })
       
        } else {
            history.push("/cart");
        }
    }, [])

    const initializePayment = usePaystackPayment(config);

    return (
        <div>
            <HeaderNav cart={true} />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            {loading ? <Preloader /> : (

            
            <div className="my-5 container checkout-container">
                <div style={{height: "100%"}} className="row d-flex justify-content-center align-items-center">
                    <div className="col-lg-8 checkout p-2 shadow px-2 py-4">
                        <div className="container">
                            <h5>Delivery Summary</h5>
                            <hr className="mt-3" />

                            <div className="mt-2 row" >
                                <div className="col-lg-1"/>
                                <div style={{border: "1px solid gray", backgroundColor: selected === "door_delivery" ? "#ffeee3" : "white"}} className="col-lg-5 cursor mr-lg-1">
                                    <div className="p-2">
                                        <h5 style={{color: "#ff8903"}}>Deliver to me</h5>
                                        <hr className="mt-2" />
                                        <div className="mt-2">
                                            <div style={{fontSize: "15px"}}>
                                                <MdPerson style={{color: "#ff8903", fontSize: "17px"}}/>{`   ${user.title} ${user.first_name} ${user.last_name}`}
                                            </div>
                                            <div className="mt-2" style={{fontSize: "15px"}}>
                                                <MdPhoneAndroid style={{color: "#ff8903", fontSize: "17px"}}/>{`   ${user.phone}`}
                                            </div>
                                            {address.length > 0 && (
                                                <div className="my-3">
                                                    <input
                                                        name="address"
                                                        value={address}
                                                        disabled
                                                        type="text"
                                                        className="form-control"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div style={{border: "1px solid gray", backgroundColor: selected === "pickup" ? "#ffeee3" : "white"}} className="col-lg-5 cursor ml-lg-1 mt-3 mt-lg-0">
                                    <div className="p-1">
                                        <h6 style={{color: "#ff8903"}}>Selected Pickup Location</h6>
                                        <hr className="mt-2" />
                                        <div className="mt-2">
                                            <div style={{fontSize: "15px"}}>
                                                <MdHome style={{color: "#ff8903", fontSize: "17px"}}/>{`   ${pickupLocation.location}`}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-1"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-1">

                    </div>
                    <div className="col-lg-3 mt-3 mt-lg-0 p-2">
                        <div>
                            {/* <h5>Order Options</h5>
                            <hr className="mt-3" />
                            <div className="mt-2 p-1" style={{display: "flex", alignItems: "center", border: "1px solid gray"}}>
                                <Checkbox
                                    checked={checked}
                                    onChange={handleChange}
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                                <div className="ml-2">Add to reoccuring order?</div>
                            </div> */}
                            {/* {checked && (
                                <div className="mt-3">
                                    <h6 style={{color: "#ff8903"}}>Choose delivery days</h6>
                                    <hr className="mt-2" />
                                    {days.map((data, index) => (
                                        <div className="mt-1 p-1" style={{display: "flex", alignItems: "center", border: "1px solid gray"}}>
                                            <Checkbox
                                                checked={
                                                    data === 1 ? checkedMonday.status : data === 2 ? checkedTuesday.status : data === 3 ? checkedWednesday.status : data === 4 ? checkedThursday.status : data === 5 ? checkedFriday.status : data === 6 ? checkedSaturday.status : checkedSunday.status
                                                }
                                                onChange={(e) =>
                                                    data === 1 ? handleChangeMonday(e, date.addDays(1)) : data === 2 ? handleChangeTuesday(e, date.addDays(2)) : data === 3 ? handleChangeWednesday(e, date.addDays(3)) : data === 4 ? handleChangeThursday(e, date.addDays(4)) : data === 5 ? handleChangeFriday(e, date.addDays(5)) : data === 6 ? handleChangeSaturday(e, date.addDays(6)) : handleChangeSunday(e, date.addDays(7))
                                                }
                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                            />
                                            <div style={{fontSize: "13px"}} className="ml-2">
                                                <Moment format="YYYY/MM/DD">
                                                    {date.addDays(data)}
                                                </Moment>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="mt-2">
                                        <h6 style={{color: "#ff8903"}}>Choose delivery times (7:05 AM to 5:15 PM</h6>
                                        <div style={{fontSize: "13px"}}>First Time (Leave empty if not applicable)</div>
                                        <input
                                            name="first_time"
                                            onChange={e => setFirstTime(e.target.value)}
                                            type="time"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mt-2">
                                        <div style={{fontSize: "13px"}}>Second Time (Leave empty if not applicable)</div>
                                        <input
                                            name="second_time"
                                            onChange={e => setSecondTime(e.target.value)}
                                            type="time"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            )} */}
                            {loadOrder ? (
                                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                    <div className="spinner-grow" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            ) : (

                            <div className="mt-3">
                                <button onClick={onSubmit} className="btn btn-lg btn-block" style={{backgroundColor: "#ff8903", border: "none", color: "white", fontWeight: "bold", fontSize: "19px"}}>CONTINUE TO ORDER</button>
                            </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            )}
            {/* FOR PICKUP LOCATION SELECTION */}
            {/* <Dialog
                fullWidth
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-cart"
            >
                <DialogTitle id="alert-dialog-title">
                    <h6 style={{color: '#ff8903'}} className="modal-title" id="exampleModalCenterTitle">
                        Select Location
                    </h6>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-cart">                                
                        <div>
                            {pickupLocation.data.map((data) => (
                                <div key={data.id} onClick={() => handlePickup(data.code, data)} style={{border: "1px gray solid", fontSize: "14px"}} className="p-2 hover-location cursor mt-2" >
                                    {data.address}, {data.place.name}, {data.name}
                                </div>
                            ))}
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} style={{color: "#ff8903", fontWeight: "550"}}>
                    CLOSE
                </Button>
                </DialogActions>
            </Dialog> */}


            {/* PAYMENT */}
            <Dialog
                fullWidth
                open={open1}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-cart"
            >
                <DialogTitle id="alert-dialog-title">
                    
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-cart">                                
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}} className="mt-3">
                            <button className="btn btn-lg btn-block" style={{backgroundColor: "#ff8903", border: "none", color: "white", fontWeight: "bold"}} onClick={() => {
                                initializePayment(onSuccess, onClose)
                            }}>CONTINUE TO PAYMENT</button>
                        </div>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Checkout