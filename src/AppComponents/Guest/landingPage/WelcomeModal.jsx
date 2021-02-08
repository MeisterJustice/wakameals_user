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
      backgroundColor: "#B02121"
    }
  };


const WelcomeModal = (props) => {
    const [place, setPlace] = useState({
        name: "",
        slug: "",
        id: "",
        code: "",
        delivery_available: true,
        pickup_available: true
    })
    

    const onDone = () => {
        props.setOpen(false)
        localStorage.removeItem("location")
        localStorage.setItem("location", JSON.stringify({
            name: place.name,
            slug: place.slug,
            id: place.id,
            code: place.code,
            delivery_available: place.delivery_available,
            pickup_available: place.pickup_available
        }))
        props.setLocation({
            name: place.name,
            slug: place.slug,
            id: place.id,
            code: place.code,
            delivery_available: place.delivery_available,
            pickup_available: place.pickup_available
        })
        props.setIsLuck(true)
        props.setOpenSuccess(true)
    }

    return (
        <div>
            <Modal
                isOpen={props.open}
                onRequestClose={() => null}
                style={customStyles}
                contentLabel="Select Location"
            >
                <h6 className="modal-title white" id="myLandingModalLabel">Welcome to WakaFoods! Please choose your location</h6>
                <div className="mt-3">
                    <LocationDropdown {...props} openFail={props.openFail} setOpenFail={props.setOpenFail} openSuccess={props.openSuccess} setOpenSuccess={props.setOpenSuccess} place={place} setPlace={setPlace} />
                    <div className="py-2">
                        {place.name.length > 0 && (
                            <div>
                                <div className="text-white">{place.name}</div>
                                <button onClick={onDone} className="mt-1 d-inline btn btn-sm modal-btn">select</button>
                            </div>
                        )}
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default WelcomeModal