
import Naira from "react-naira";
import { MdDeleteForever } from "react-icons/md";
import { useState } from 'react';
import Axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const CartItem = (props) => {
    const [loading, setLoading] = useState(false)

    const notifySuccess = (text) => toast.success(text);
    const notifyWarning = (text) => toast.error(text);

    const remove = async () => {
        props.setCart(carts => carts.filter(cartt => cartt.id !== props.cart.id));
        props.setCarts(carts => carts.filter(cartt => cartt.id !== props.cart.id));
        notifySuccess("Cart item removed")
        props.setPress(props.press + 1)
    }

    const removeCart = async () => {
        setLoading(true)
        if(typeof props.token === "string"){
            Axios.post("https://server.wakameals.validprofits.xyz/api/cart/remove", {id: props.cart.id}, {
                headers: {
                    Authorization: `Bearer ${props.token}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                  }
            })
            .then((res) => {
                setLoading(false)
                remove()
            })
            .catch(() => {
                setLoading(false)
                notifyWarning("Something went wrong!")
            })
        } else {
            remove()
            setLoading(false) 
        }
    }

    return (
        <div style={{backgroundColor: "white"}} className="card p-3 mt-4 shadow border-0">
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
            <div className="row">
                <div className="col-lg-3">
                    <img  alt="photo" style={{width: '100%', height: '120px', objectFit: "contain"}} src={props.cart.meal.image} />
                </div>
                <div className="col-lg-3">
                    <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%"}}>
                        <div>
                            <div className="mt-3 mt-lg-0">
                                <h6>{props.cart.meal.name}</h6>
                            </div>
                            <div className="mt-2" style={{color: "gray", fontSize: "13px"}} >For: {typeof props.cart.name === "number" ? `person ${props.cart.name}` : props.cart.name }</div>
                        </div>
                        <div className="mt-2 d-none d-lg-block">
                            {loading ? (
                                <div className="spinner-grow" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            ) : (
                                <div onClick={removeCart} style={{color: "#ff7417", fontWeight: "bold", fontSize: "13px"}} className="cursor">
                                    <MdDeleteForever style={{color: "#ff7417", fontSize: "20px"}}/> REMOVE
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-lg-2 mt-3 mt-lg-0">
                    <div style={{fontSize: "12px", color: "#ff7417", fontWeight: "bold"}}>
                        MEAL PRICE
                    </div>
                    <div className="mt-2">
                        <Naira>{props.cart.meal.price}</Naira>
                    </div>
                </div>
                <div className="col-lg-2 mt-3 mt-lg-0">
                    <div style={{fontSize: "12px", color: "#ff7417", fontWeight: "bold"}}>
                        EXTRAS PRICE
                    </div>
                    <div className="mt-2">
                        <Naira>{props.cart.sub_total - Number(props.cart.meal.price)}</Naira>
                    </div>
                </div>
                <div className="col-lg-2 mt-3 mt-lg-0">
                    <div style={{fontSize: "12px", color: "#ff7417", fontWeight: "bold"}}>
                        TOTAL PRICE
                    </div>
                    <div className="mt-2">
                        <Naira>{props.cart.sub_total}</Naira>
                    </div>
                </div>
            </div>
            <div className="mt-2 d-block d-lg-none">
                    {loading ? (
                        <div className="spinner-grow" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    ) : (
                        <div onClick={removeCart} style={{color: "#ff7417", fontWeight: "bold", fontSize: "15px"}} className="cursor">
                            <MdDeleteForever style={{color: "#ff7417", fontSize: "25px"}}/> REMOVE
                        </div>
                    )}
            </div>
        </div>
    )
}

export default CartItem;