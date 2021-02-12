import axios from 'axios';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import {
	DONE
} from "../../../Redux/types"

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      backgroundColor: "#ff8903"
    }
  };

const SuccessModal = (props) => {
    const dispatch = useDispatch();
    const [step, setStep] = useState(1)
    const [number, setNumber] = useState(1)
    const [names, setNames] = useState({})
    const [numberOfPersons, setNumberOfPersons] = useState([])
    const [isoptionAvailable, setIsoptionAvailable] = useState(false);
    const [address, setAddress] = useState("")
    const [pickupLocation, setPickupLocation] = useState({
        data: [],
        location: "",
        code: "",
        place: ""
    })
    const [delivery, setDelivery] = useState("")
    const [isStep1Done, setIsStep1Done] = useState(false)
    const [availableOption, setAvailableOption] = useState("")
    const [isDoorDelivery, setIsDoorDelivery] = useState(true)
    const [isPickupDelivery, setIsPickupDelivery] = useState(true)

    useEffect(() => {
        axios.get(`https://server.wakafoods.com/api/avail_pickup/${props.pickupLocation.slug}/list`)
        .then((res) => {
            setPickupLocation({
                ...pickupLocation,
                data: res.data.pickup_locations
            })
        })
    }, [])

    const handleAddress = () => {
        localStorage.setItem("door_delivery", JSON.stringify(address))
        setIsStep1Done(true)
    }

    const handlePickup = (code, data) => {
        setPickupLocation({
            ...pickupLocation,
            location: `${data.address}, ${data.place.name}, ${data.name}`,
            code: code,
            place: data.place.id
        })
        localStorage.setItem("pickup", JSON.stringify({
            location: `${data.address}, ${data.place.name}, ${data.name}`,
            code: code,
        }))
        setIsStep1Done(true)
    }

    const cancel = () => {
            localStorage.removeItem("names")
            localStorage.setItem("names", JSON.stringify([1]))
            props.setSuccess(true)
            continue2()
            props.notifySuccess("You're shopping for 1 person")
    }
    
    const continue1 = () => {
        setStep(3)
        if(number > 1){
            for(var i = 1; i <= new Array(Number(number)).length; i++){
                numberOfPersons.push(i)
            }
        } else {
            localStorage.removeItem("names")
            localStorage.setItem("names", JSON.stringify([1]))
            props.setSuccess(true)
            continue2()
            props.notifySuccess("You're shopping for 1 person")
        }
    }

    const continue2 = () => {
        props.setOpenSuccess(false)
        props.setOpenFail(false)
        props.setOpen(false)
        dispatch({ type: DONE });
    }

    const onChange = (e, index) => {
        setNames({
            ...names,
            [index]: e.target.value
        })
    }

    const option = (option) => {
        localStorage.setItem("deliveryOption", JSON.stringify(option))
        if(option === "door_delivery" && !props.pickupLocation.delivery_available){
            setIsDoorDelivery(false)
            setIsPickupDelivery(true)
        } else if (option === "pickup" && !props.pickupLocation.pickup_available) {
            setIsPickupDelivery(false)
            setIsDoorDelivery(true)
        }
        else {
            setIsoptionAvailable(true)
            setAvailableOption(option)
            setDelivery(option)
        }
    }

    const option2 = (option) => {
        if(option === "continue") {
            setStep(2)
        } else {
            props.setOpen(true)
            props.setSuccess(false)
            props.setOpenSuccess(false)
            setIsDoorDelivery(true)
            setIsPickupDelivery(true)
            setStep(1)
        }
    }

    const done1 = () => {
        localStorage.setItem("names", JSON.stringify([Number(number)]))
        props.setSuccess(true)
        props.notifySuccess(`You're shopping for ${number} persons`)
        continue2()
    }

    const done = () => {
        localStorage.setItem("names", JSON.stringify(Object.values(names)))
        props.setSuccess(true)
        props.notifySuccess(`You're shopping for ${number} persons`)
        continue2()
    }

    const handleNumber = (e) => {
        setNumber(e.target.value)
    }
    return (
        <Modal
            isOpen={props.openSuccess}
            onRequestClose={() => null}
            style={customStyles}
            contentLabel="Success"
        >
            {step === 1 && (
                <div>
                    {!isoptionAvailable ? (
                        <div>
                            {isDoorDelivery && (
                                <div>
                                    {!props.isLuck ? (
                                        <div className="py-5 white">
                                            Choose an option below……
                                        </div>
                                    ) : (
                                        <div>
                                            {isPickupDelivery && (
                                                <div className="py-5 white">
                                                    Wow! you are in luck, choose an option below……
                                                </div> 
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                            <div>
                                {!isDoorDelivery && (
                                    <p style={{color: "white"}}>Delivery Option isn't available in your location yet. Please select another option</p>
                                )}
                                {!isPickupDelivery && (
                                    <p style={{color: "white"}}>Pickup Option isn't available in your location yet. Please select another option</p>
                                )}
                                <div className="d-flex justify-content-around align-items-center p-4">
                                    <button onClick={() => option("door_delivery")} className="btn btn-sm modal-btn">Delivery</button>
                                    {(!isDoorDelivery || !isPickupDelivery) && (
                                        <button onClick={() => option2("reset")} className="btn btn-sm modal-btn mr-2">Reset</button>
                                    )}
                                    <button onClick={() => option("pickup")} className="btn btn-sm modal-btn">Pickup</button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            {availableOption === "door_delivery" && !isStep1Done && (
                                <div className="p-5">
                                    <textarea
                                        name="address"
                                        onChange={e => setAddress(e.target.value)}
                                        className="form-control"
                                        placeholder="your delivery address"
                                        required
                                    />
                                    <button onClick={handleAddress} className="btn btn-sm modal-btn mt-2">Continue</button>
                                </div>
                            )}
                            {availableOption === "pickup" && !isStep1Done && (
                                <div className="my-3">
                                    <h5 style={{color: "white"}}>Please select a pickup location below</h5>
                                    {pickupLocation.data.map((data) => (
                                        <div key={data.id} onClick={() => handlePickup(data.code, data)} style={{border: "1px white solid", fontSize: "14px", color: "white"}} className="p-2 hover-location cursor mt-2" >
                                            {data.address}, {data.place.name}, {data.name}
                                            <span className="location-pointer">deh</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {isStep1Done && (
                                <div className="p-2">
                                    <p style={{color: "white"}}>Great! {delivery} option is available in your location. Press reset to restart the checker or continue with your order...</p>
                                    <div className="p-4 d-flex justify-content-around align-items-center">
                                        <button onClick={() => option2("reset")} className="btn btn-sm modal-btn mr-2">Reset</button>
                                        <button onClick={() => option2("continue")} className="btn btn-sm modal-btn">Continue</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
            {step === 2 && (
                <div>
                    <div className="py-3 white">
                        How many persons are you ordering for?
                    </div>
                    <div>
                        <input value={number} name="number" onChange={handleNumber} type="number" className="form-control" />
                        <button onClick={continue1} className="btn btn-sm modal-btn mt-4 d-inline">Continue</button>
                        <button onClick={cancel} className="btn btn-sm modal-btn mt-4 d-inline ml-2">Cancel</button>
                    </div>
                </div>
            )}
            {step === 3 && number > 1 && (
                <div>
                    <div className="py-3 white">
                        Click the button below to customise your orders
                    </div>
                    <div>
                        {/* <button onClick={done1} className="btn btn-primary mt-4">No</button> */}
                        <button onClick={() => setStep(4)} className="btn modal-btn mt-4 ml-2">CUSTOMISE</button>
                    </div>
                </div>
            )}
            {step === 4 && (
                <div style={{height: "70vh", overflowY: "scroll"}} className="pl-2 pr-4">
                    <h4 className="white">Please enter the name of the {number} persons</h4>
                    {numberOfPersons.map((data, index) => (
                        <div className="mt-2">
                            <label className="white">Person {data}</label>
                            <input name="text" onChange={(e) => onChange(e, index)} type="text" className="form-control" placeholder="Mark Essien" />
                        </div>
                    ))}
                    <button onClick={() => done()} className="btn btn-sm modal-btn mt-4">Continue</button>
                </div>
            )}
        </Modal>
    )
}

export default SuccessModal;