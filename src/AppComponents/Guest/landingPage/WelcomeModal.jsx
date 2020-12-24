import { useEffect, useState } from "react"
import LocationDropdown from "./LocationDropdown"
import Modal from 'react-modal';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      backgroundColor: "#ff7417"
    }
  };


const WelcomeModal = (props) => {
    const [state, setState] = useState({
        states: props.states,
        state: "",
        isAvailable: ""
    })
    const [lga, setLga] = useState({
        lgas: [],
        lga: "",
        isAvailable: ""
    })
    const [town, setTown] = useState({
        towns: [],
        town: "",
        isAvailable: ""
    })
    

    const onDone = () => {
        props.setOpen(false)
        localStorage.removeItem("location")
        localStorage.setItem("location", JSON.stringify({
            state: state.state,
            lga: lga.lga,
            town: town.town
        }))
        props.setOpenSuccess(true)
    }

    const onClose = () => {
        props.setOpen(false)
        props.setSuccess(false)
    }


    return (
        <div>
            <Modal
                isOpen={props.open}
                onRequestClose={() => null}
                style={customStyles}
                contentLabel="Select Location"
            >
                {/* <h5 className="text-right" onClick={() => props.setOpen(false)}>X</h5> */}
                <h6 className="modal-title white" id="myLandingModalLabel">Welcome to Wakameals, please choose your delivery location</h6>
                <div className="mt-3">
                    <div>
                        
                        {state.isAvailable === true && lga.isAvailable === true && town.isAvailable === true && (
                            <button onClick={onDone} className="ml-2 d-inline btn btn-sm modal-btn">select</button>
                        )}
                    </div>
                    {state.isAvailable === false || lga.isAvailable === false || town.isAvailable === false ? (
                        <div className="alert alert-danger my-2 white" role="alert">
                            Sorry, we're currently not available for your location
                        </div>
                    ) : (

                        <LocationDropdown openFail={props.openFail} setOpenFail={props.setOpenFail} openSuccess={props.openSuccess} setOpenSuccess={props.setOpenSuccess} state={state} lga={lga} town={town} setState={setState} setLga={setLga} setTown={setTown} />
                    )
                }
                </div>
            </Modal>
        </div>
    )
}

export default WelcomeModal