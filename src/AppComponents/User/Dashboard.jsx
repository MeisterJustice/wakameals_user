import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderNav from '../Navigation/HeaderNav';
import Preloader from "../ReuseableCompononts/Preloader"

export default function Dashboard() {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        let token = localStorage.getItem("token")
        let parsedToken = JSON.parse(token)
        Axios.get("https://server.wakameals.validprofits.xyz/api/profile/details", {
            headers: {
                Authorization: `Bearer ${parsedToken}`,
                "Content-Type": "application/json",
                Accept: "application/json",
              }
        })
        .then((res) => {
            setLoading(false)
            setUser(res.data.details)
        })
    }, [])
    return (
        <div>
            <HeaderNav/>
            {loading ? <Preloader /> : (
            <div className="user-dashboard mt-5">
                <div className="text-center">
                    <img  alt="photo" src={user.avatar === null ? "https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg" : user.avatar} className="rounded-circle" style={{height: '200px', width: '200px', objectFit: "cover"}} />
                    <h5 style={{color: 'white', fontWeight: 'bold', marginTop: '10px'}}>{user.first_name} {user.last_name}</h5>
                </div>
                <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-6 mb-3 ">
                        <Link to="/account/open">
                            <div className="card shadow border-0 card-hover">
                                <div className="card-body text-center">
                                    <p className="card-text" style={{fontWeight: 'bold', fontSize: '0.7em'}}>
                                    Open Oders
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    
                    <div className="col-lg-6 col-md-6 col-6 mb-3 ">
                        <Link to="/account/close">
                            <div className="card shadow border-0 card-hover">
                                <div className="card-body text-center">
                                    <p className="card-text" style={{fontWeight: 'bold', fontSize: '0.7em'}}>
                                    Closed Orders
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="col-lg-6 col-md-6 col-6 mb-3 ">
                        <Link to="/account/password">
                            <div className="card shadow border-0 card-hover">
                                <div className="card-body text-center">
                                    <p className="card-text" style={{fontWeight: 'bold', fontSize: '0.7em'}}>
                                    Change Password
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>

                
                    <div className="col-lg-6 col-md-6 col-6 mb-3 ">
                        <Link to="/account/edit">
                            <div className="card shadow border-0 card-hover">
                                <div className="card-body text-center">
                                    <p className="card-text" style={{fontWeight: 'bold', fontSize: '0.7em'}}>
                                    Edit Profile
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>

                    </div>               
                </div>
            </div>
            ) }
        </div>
    );
}
