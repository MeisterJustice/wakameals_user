import {useState} from 'react';
import HeaderNav from '../Navigation/HeaderNav';
import Axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

export default function Password(props) {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [formData, setFormData] = useState({
        current_password: '',
        new_password: '',
        retype_new_password: ""
    });

    const onChangeHandler = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const notifySuccess = (text) => toast.success(text);
    const notifyWarning = (text) => toast.error(text);

    const onSubmitHandle = e => {
        e.preventDefault();
        setLoading(true)
        if(formData.new_password === formData.retype_new_password){
            let token = localStorage.getItem("token")
            let parsedToken = JSON.parse(token)
            Axios.post("https://server.wakafoods.com/api/profile/password/update", formData, {
                headers: {
                    Authorization: `Bearer ${parsedToken}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                  },
            })
            .then(() => {
                setLoading(false)
                notifySuccess("Password updated successfully")
            })
            .catch((error) => {
                setLoading(false)
                notifyWarning(error.response.data.errors.current_password[0])
            })
        } else {
            setLoading(false)
            notifyWarning("Passwords do not match")
        }
    };



    return (
        <div>
            <HeaderNav />
            <ToastContainer
                position="top-right"
                autoClose={3500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="login container" style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "90vh"}}>
            <div className="card border-0 shadow " style={{backgroundColor: '#ff8903', width: "60%"}}>
                <div className="card-body">
                    <from>
                        <div className="from-row">
                        
                            <div className="form-group col-md-12">
                                <label style={styles.label} htmlFor="current_password">
                                    Current Password
                                </label>
                                <input
                                    id="current_password"
                                    value={formData.current_password}
                                    name="current_password"
                                    onChange={e => onChangeHandler(e)}
                                    type="password"
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group col-md-12">
                                <label style={styles.label} htmlFor="new_password">
                                    New Password
                                </label>
                                <input
                                    id="new_password"
                                    value={formData.new_password}
                                    name="new_password"
                                    onChange={e => onChangeHandler(e)}
                                    type="password"
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group col-md-12">
                                <label style={styles.label} htmlFor="retype_new_password">
                                    Confirm New Password
                                </label>
                                <input
                                    id="retype_new_password"
                                    value={formData.retype_new_password}
                                    name="retype_new_password"
                                    onChange={e => onChangeHandler(e)}
                                    type="password"
                                    className="form-control"
                                />
                            </div>
                            {loading ? (
                                <div style={{display: "flex", justifyContent: "center"}}>
                                    <div className="spinner-border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            ) : (

                            <div className="form-group col-md-12">
                                <button
                                    type="submit"
                                    onClick={onSubmitHandle}
                                    className="btn  btn-block"
                                    style={{color: 'white', backgroundColor: 'black'}}>
                                    CHANGE PASSWORD
                                </button>
                            </div>
                            )}
                        </div>
                    </from>
                </div>
            </div>
        </div>
        </div>
    );
}

const styles = {
    label: {
        fontSize: '0.9em',
        fontWeight: 'bold',
        color: 'black'
    },
    formError: {
        fontSize: '0.7em',
        color: 'red',
        marginTop: '10px',
        fontWeight: 'bold'
    }
};