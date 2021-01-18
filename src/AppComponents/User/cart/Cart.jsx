import { TextareaAutosize } from "@material-ui/core";
import Axios from "axios";
import { useEffect, useState } from "react";
import Naira from "react-naira";
import { Link } from "react-router-dom";
import HeaderNav from "../../Navigation/HeaderNav";
import Preloader from "../../ReuseableCompononts/Preloader";
import CartItem from "./CartItem";


const Cart = (props) => {
    const [cart, setCart] = useState([])
    const [carts, setCarts] = useState([])
    const [item, setItem] = useState({})
    const [token, setToken] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [press, setPress] = useState(0)
    const [location, setLocation] = useState(false)

    useEffect(() => {
        if(press > 0){
            if(carts.length > 0){
                localStorage.setItem("cart", JSON.stringify(carts))
            } else {
                localStorage.removeItem("cart")
            }
        }
    }, [press])

    useEffect(() => {
        let cartItem = localStorage.getItem("cart")
        let tokenn = localStorage.getItem("token")
        let locationItem = localStorage.getItem("location")
        let parsedLocation = JSON.parse(locationItem)
        let parsedCartItem = JSON.parse(cartItem)
        let parsedToken = JSON.parse(tokenn)
        setToken(parsedToken)
        setCarts(parsedCartItem)
        if(parsedLocation){
            setLocation(true)
        }
        if(parsedCartItem !== undefined){
            if(typeof parsedToken === "string"){
                Axios.post("https://server.wakameals.validprofits.xyz/api/cart/sync", {items: parsedCartItem}, {
                    headers: {
                        Authorization: `Bearer ${parsedToken}`,
                        "Content-Type": "application/json",
                        Accept: "application/json",
                      }
                }).then((res) => {
                    setCart(res.data.cart.items)
                    setItem(res.data.cart)
                    setLoading(false)
                })
                .catch(() => {
                    setLoading(false)
                    
                })
            } else {
                Axios.post("https://server.wakameals.validprofits.xyz/api/cart/sync", {items: parsedCartItem})
                .then((res) => {
                    setCart(res.data.cart.items)
                    setItem(res.data.cart)
                    setLoading(false)
                })
                .catch(() => {
                    setLoading(false)
                    
                })
            }
        }
    }, [])
    return (
        <div>
            <HeaderNav cart={true}/>
            {loading ? <Preloader /> : (
                <div className="my-5 container bg-white p-2">
                    <h1 style={{fontSize: "26px"}} >CART ({loading ? 0 : cart.length})</h1>
                    <div className="mt-5">
                    {cart.map((data, index) => (
                        <CartItem setPress={setPress} press={press} carts={carts} setCarts={setCarts} setCart={setCart} token={token} total={item.total} key={index} cart={data} />
                    ))}
                    </div>
                    {cart.length > 0 && (
                        <div className="mt-5" style={{display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
                            <div style={{fontWeight: "bold"}}>TOTAL:</div>
                            <div style={{color: "#B02121", fontSize: "24px", fontWeight: "bold"}} className="ml-5 mr-md-4"><Naira>{item.total}</Naira></div>
                        </div>
                    )}
                    <div className="mt-5 shadow">
                        <div className="p-4" style={{display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
                            <Link to="/">
                                <button style={{color: "#B02121", backgroundColor: "white", border: "none"}} className="btn shadow px-3 py-2">
                                    CONTINUE SHOPPING
                                </button>
                            </Link>
                            {cart.length > 0 && (
                                <Link to={{pathname: `${location ? "/checkout" : "/"}`, query: {price: item.total, location: true}}}>
                                    <button style={{color: "white", backgroundColor: "#B02121", border: "none"}} className="btn ml-4 shadow px-3 py-2">
                                        GO TO CHECKOUT
                                    </button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Cart;