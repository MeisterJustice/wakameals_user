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
      backgroundColor: "#B02121"
    }
  };

const SuccessModal = (props) => {
    const dispatch = useDispatch();
    const [step, setStep] = useState(1)
    const [number, setNumber] = useState(1)
    const [names, setNames] = useState({})
    const [numberOfPersons, setNumberOfPersons] = useState([])
    const [isoptionAvailable, setIsoptionAvailable] = useState(false);

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
        setIsoptionAvailable(true)
    }

    const option2 = (option) => {
        if(option === "continue") {
            setStep(2)
        } else {
            props.setOpenSuccess(false)
            props.setOpenFail(false)
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
                            <div className="py-5 white">
                                Wow! you are in luck, choose an option below……
                            </div>
                            <div className="d-flex justify-content-around align-items-center p-4">
                                <button onClick={() => option("door_delivery")} className="btn btn-sm modal-btn">Delivery</button>
                                <button onClick={() => option("pickup")} className="btn btn-sm modal-btn">Pickup</button>
                            </div>
                        </div>
                    ) : (
                        <div className="d-flex justify-content-around align-items-center p-5">
                            <button onClick={() => option2("reset")} className="btn btn-sm modal-btn mr-2">Reset</button>
                            <button onClick={() => option2("continue")} className="btn btn-sm modal-btn">Continue</button>
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