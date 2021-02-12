import React, { useEffect, useState } from 'react';
import HeaderNav from '../Navigation/HeaderNav';
import Axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Preloader from '../ReuseableCompononts/Preloader';

export default function EditProfile() {
    const [formData, setFormData] = useState({
        email: '',
        first_name: "",
        last_name: "",
        title: "",
        phone: "",
        avatar: null
    });
    const [loading, setLoading] = useState(true)
    const [loading1, setLoading1] = useState(false)

    const notifySuccess = (text) => toast.success(text);
    const notifyWarning = (text) => toast.error(text);

    const onChangeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onImageChange = (e) => {
        setFormData({
            ...formData,
            avatar: e.target.files[0]
        })
    }

    const onSubmitHandle = async (e) => {
        e.preventDefault();
        setLoading1(true)
        let token = await localStorage.getItem("token")
        let parsedToken = await JSON.parse(token)
        let form_data = await new FormData()
        form_data.append("email", formData.email)
        form_data.append("first_name", formData.first_name)
        form_data.append("last_name", formData.last_name)
        form_data.append("title", formData.title)
        form_data.append("phone", formData.phone)
        form_data.append("avatar", formData.avatar)
        Axios.post("https://server.wakafoods.com/api/profile/update", form_data, {
            headers: {
                Authorization: `Bearer ${parsedToken}`,
                "Content-Type": "application/json",
                Accept: "application/json",
              },
        })
        .then(() => {
            setLoading1(false)
            notifySuccess("Profile updated successfully")
        })
        .catch((e) => {
            setLoading1(false)
            let err = Object.keys(e.response.data.errors)[0][0];
            notifyWarning(err) 
        })
    }

    useEffect(() => {
        let token = localStorage.getItem("token")
        let parsedToken = JSON.parse(token)
        Axios.get("https://server.wakafoods.com/api/profile/details", {
            headers: {
                Authorization: `Bearer ${parsedToken}`,
                "Content-Type": "application/json",
                Accept: "application/json",
              }
        })
        .then((res) => {
            setLoading(false)
            setFormData({
                ...formData,
                email: res.data.details.email,
                first_name: res.data.details.first_name,
                last_name: res.data.details.last_name,
                title: res.data.details.title,
                phone: res.data.details.phone,
            })
        })
    }, [])

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
            {loading ? <Preloader /> : (
                <div className="user-dashboard mt-5 container bg-white p-2">
                <div className="form-group">
                    <label htmlFor="first_name" style={{fontSize: '0.7em', fontWeight: 'bold'}}>
                        First Name
                    </label>
                    <input onChange={onChangeHandler} value={formData.first_name} name="first_name" id="first_name" type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="last_name" style={{fontSize: '0.7em', fontWeight: 'bold'}}>
                        Last Name
                    </label>
                    <input onChange={onChangeHandler} name="last_name" value={formData.last_name} id="last_name" type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label style={{fontSize: '0.7em', fontWeight: 'bold'}} htmlFor="title">Title</label>
                    <select onChange={onChangeHandler} value={formData.title} id="title" name="title" onChange={e => onChangeHandler(e)} className="form-control" id="title">
                        <option value="mr">Mr</option>
                        <option value="mrs">Mrs</option>
                        <option value="miss">Miss</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="number" style={{fontSize: '0.7em', fontWeight: 'bold'}}>
                        Phone Number
                    </label>
                    <input  onChange={onChangeHandler} value={formData.phone} name="phone" id="number" type="number" className="form-control" />
                </div>
                <div className="custom-file">
                    <input accept="image/*" onChange={onImageChange} type="file" className="custom-file-input" id="image" />
                    <label className="custom-file-label" htmlFor="image" style={{fontSize: '1em', opacity: '0.8'}}>
                        Choose Profile Avatar
                    </label>
                </div>
                {loading1 ? (
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                ) : (

                <div className="form-group mt-5">
                    <button
                        type="submit"
                        onClick={onSubmitHandle}
                        className="btn btn-block"
                        style={{color: 'white', backgroundColor: ' #ff8903'}}>
                        UPDATE PROFILE
                    </button>
                </div>
                )}
                </div>
            )}
        </div>
    );
}
