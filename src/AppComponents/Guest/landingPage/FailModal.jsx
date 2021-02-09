import Modal from 'react-modal';


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

const FailModal = (props) => {
    const done = () => {
        props.setOpenSuccess(false)
        props.setOpenFail(false)
        props.setOpen(false)
    }
    return (
        <Modal
            isOpen={props.openFail}
            onRequestClose={() => null}
            style={customStyles}
            contentLabel="Fail"
        >
            <div className="py-5 white">
                Sorry, we are not available at your location yet. Please click the button below to drop a message
            </div>
            <div>
                <button onClick={done} className="btn btn-sm modal-btn">Send Message</button>
            </div>
        </Modal>
    )
}

export default FailModal;