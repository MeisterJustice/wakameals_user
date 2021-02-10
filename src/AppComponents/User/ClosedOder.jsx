import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import HeaderNav from '../Navigation/HeaderNav';
import Preloader from '../ReuseableCompononts/Preloader';
import Moment from 'react-moment';
import Naira from 'react-naira';

export default function ClosedOder() {
    const [loading, setLoading] = useState(true)
    const [loading1, setLoading1] = useState(false)
    const [orders, setOrders] = useState({
        next_url: null,
        data: []
    })
    const [call, setCall] = useState(1)

    useEffect(() => {
        let token = localStorage.getItem("token")
        let parsedToken = JSON.parse(token)
        Axios.get("https://server.wakameals.validprofits.xyz/api/order/list/closed", {
            headers: {
                Authorization: `Bearer ${parsedToken}`,
                "Content-Type": "application/json",
                Accept: "application/json",
              },
        })
        .then((res) => {
            setOrders({
                next_url: res.data.orders.next_page_url,
                data: res.data.orders.data
            })
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        let token = localStorage.getItem("token")
        let parsedToken = JSON.parse(token)
        if(call > 1){
            Axios.get(orders.next_url, {
                headers: {
                    Authorization: `Bearer ${parsedToken}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                  },
            })
            .then((res) => {
                setOrders({
                    next_url: res.data.orders.next_page_url,
                    data: [...orders.data, ...res.data.orders.data]
                })
                setLoading1(false)
            })
        }
    }, [call])

    const seeMore = () => {
        setLoading1(true)
        setCall(call + 1)
    }

    return (
        <div>
            <HeaderNav />
            {loading ? <Preloader /> : (
                <div className="mt-5 container">
                    {orders.data.length > 0 ? (
                        <div className="table-responsive mt-5 bg-white p-2">
                        <table className="table">
                            <thead className="thead-light">
                                <tr>
                                    <th style={{fontSize: "13px"}} scope="col">Order Number</th>
                                    <th style={{fontSize: "13px"}} scope="col">Delivery Type</th>
                                    <th style={{fontSize: "13px"}} scope="col">Amount</th>
                                    <th style={{fontSize: "13px"}} scope="col">Date</th>
                                    <th style={{fontSize: "13px"}} scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.data.map((data, i) => (
                                    <tr key={i}>
                                                                                <td style={{fontSize: "13px"}}>{data.code}</td>
                                        <td style={{fontSize: "13px"}}>{data.delivery_type}</td>
                                        <td style={{fontSize: "13px"}}><Naira>{data.total}</Naira></td>
                                        <td style={{fontSize: "13px"}}>
                                            <Moment format="YYYY/MM/DD">
                                                    {data.created_at}
                                                </Moment>
                                        </td>
                                        <td style={{fontSize: "13px"}}><span className={`badge ${data.status === "completed" ? "badge-success" : data.status === "cancelled" ? "badge-secondary" : data.status === "cancelled_failed_payment" ? "badge-warning" : data.status === "cancelled_system" ? "badge-primary" : data.status === "cancelled_user" ? "badge-dark" : "badge-warning" }`}>{data.status}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {typeof orders.next_url === "string" && (
                            <div className="my-5" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                {loading1 ? (
                                    <div className="spinner-grow" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                ) : (
            
                                    <button onClick={seeMore} className="cursor btn btn-style" style={{fontWeight: "bold"}}>
                                        SEE MORE
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                    ) : (
                        <div style={{fontWeight: "bold", color: "#ff8903"}} className="text-center">
                            NO ORDER
                        </div>
                    )}
                </div>
            )}
    </div>
    );
}
