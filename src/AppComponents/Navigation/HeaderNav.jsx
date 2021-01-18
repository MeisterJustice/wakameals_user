import { useEffect, useState } from 'react'
import {BiMenuAltRight} from "react-icons/bi"
import {MdAddLocation, MdShoppingCart} from "react-icons/md"
import { Link, useHistory } from 'react-router-dom'
import {useDispatch} from 'react-redux';
import {
    USER_LOGOUT,
    REFRESH
} from "../../Redux/types"

export default function HeaderNav(props) {
    const [token, setToken] = useState(null)
    const [cart, setCart] = useState(0)
    const dispatch = useDispatch();
    let history = useHistory()

    const handleLogout = () => {
        localStorage.removeItem("token")
        dispatch({ type: USER_LOGOUT });
        setToken(null)
        history.push("/signin")
    }

    useEffect(() => {
        if(props.cartSize){
            setCart(props.cartSize)
        }
    }, [props.cartSize])

    useEffect(() => {
        let tok = localStorage.getItem("token")
        let cart = localStorage.getItem("cart")
        let parsedCart = JSON.parse(cart)
        setToken(tok)
        if(parsedCart !== undefined && parsedCart !== null){
            setCart(parsedCart.length)
        }
    }, [])

    const changeLocation = () => {
        dispatch({ type: REFRESH });
        props.setOpen(true)
        props.setSuccess(false)
    }
    return (
        <div>
               {/* ============ NAVBAR SECTION==========  */}
        <nav className="navbar navbar-expand-lg">
            <Link to="/" className="navbar-brand"> <img  alt="logo" src="/logo.jpeg" /></Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <BiMenuAltRight style={{color: "white", fontSize: "30px"}}/>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                
                    {typeof token === "string" && (
                    <Link to="/account" className="nav-item">
                        <a className="nav-link text-white">My Account</a>
                    </Link>
                     )}
                    {typeof token === "string" && (
                        <div onClick={handleLogout} className="nav-item cursor">
                            <div className="nav-link text-white">Log Out</div>
                        </div>
                    )}
                    {typeof token !== "string" && (
                        <Link to="/signin" className="nav-item">
                            <div className="nav-link text-white">Sign In</div>
                        </Link>
                    )}
                    {typeof token !== "string" && (
                    <Link to="/signup" className="nav-item">
                        <div className="nav-link text-white">Sign Up</div>
                    </Link>
                    )}
                </ul>
                <ul className="navbar-nav ml-auto">
                    {props.setOpen && props.home && (
                        <div className="nav-item cursor">
                            <div onClick={changeLocation} className="nav-link text-white">
                                <MdAddLocation style={{color: "#B02121", fontSize: "1.5em"}}/> change location
                            </div>
                        </div>
                    )}
                    {!props.cart && (
                        <Link to="/cart" className="nav-item">
                            <a className="nav-link text-white">
                                <MdShoppingCart style={{color: "#B02121", fontSize: "1.5em"}}/> {cart} items
                            </a>
                        </Link>
                    )}
                </ul>
            </div>
        </nav>
        {/* ============ NAVBAR SECTION ENDS HERE==========  */}
        </div>
    )
}
