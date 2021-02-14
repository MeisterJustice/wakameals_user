import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import HeaderNav from '../../Navigation/HeaderNav';
import FoodMenu from '../meal/index'
import FailModal from './FailModal';
import SuccessModal from './SuccessModal';
import WelcomeModal from './WelcomeModal';
import {useSelector, useDispatch} from 'react-redux';
import Preloader from '../../ReuseableCompononts/Preloader';
import { FaArrowCircleDown, FaArrowCircleUp, FaTable, FaUtensils, FaUtensilSpoon } from "react-icons/fa"
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Bg from './Bg';
import CatItems from './CatItems';
import Footer from '../../Navigation/Footer';
import BookTable from './BookTable';
import { Link } from 'react-router-dom';


export default function LandingPage(props) {
    const dispatch = useDispatch();

    const done = useSelector(state => state.done);

    const [states, setStates] = useState([])
    const [open, setOpen] = useState(true)
    const [openFail, setOpenFail] = useState(false)
    const [openSuccess, setOpenSuccess] = useState(false)
    const [success, setSuccess] = useState(false)
    const [persons, setPersons] = useState([""])
    const [person, setPerson] = useState("")
    const [numberOfPersons, setNumberOfPersons] = useState([])
    const [step, setStep] = useState(1)
    const [location, setLocation] = useState(false)
    const [meals, setMeals] = useState([])
    const [token, setToken] = useState("")
    const [initialCart, setInitialCart] = useState([])
    const [finish, setFinish] = useState(false)
    const [cartSize, setCartSize] = useState(0)
    const [tabValue, setTabValue] = React.useState(0);
    const [categoryTab, setCategoryTab] = useState(false)
    const [isLuck, setIsLuck] = useState(false)
    const [pickupLocation, setPickupLocation] = useState({})
    const handleChangeTab = (event, newValue) => {
        setTabValue(newValue);
    };
    const [modalTime, setModalTime] = useState(false)
    const notifySuccess = (text) => toast.success(text);
    const notifyWarning = (text) => toast.warning(text);

    const changePerson = () => {
        setPerson(persons[step])
        setStep(step + 1)
    }
    const changePerson1 = () => {
        setPerson(numberOfPersons[step])
        setStep(step + 1)
    }

    const handleAddCart = async (data) => {
        if(person.length === 0){
            return;
        }
        let storedCart = localStorage.getItem("cart")
        let parsedStoredCart = JSON.stringify(storedCart)
        localStorage.setItem("cart", JSON.stringify([
            ...initialCart,
            {...data, name: person}
        ]))
        setInitialCart([
            ...initialCart,
            {...data, name: person}
        ])
        // if(token === undefined || token === null){
        //     localStorage.setItem("cart", JSON.stringify([
        //         ...initialCart,
        //         {...data, name: person}
        //     ]))
        // } else {
        //     Axios.post("https://server.wakafoods.com/api/cart/new", {
        //         ...data,
        //         name: person ? person : "John Doe"
        //     }, {
        //         headers: {
        //             Authorization: `Bearer ${token}`,
        //             "Content-Type": "application/json",
        //             Accept: "application/json",
        //           },
        //     })
        //     .then((res) => {
        //         localStorage.setItem("cart", JSON.stringify([
        //             ...initialCart,
        //             {...data, name: person}
        //         ]))
        //         setInitialCart([
        //             ...initialCart,
        //             {...data, name: person}
        //         ])
        //     })
        //     .catch((e) => {})
        // }
        notifySuccess(`Meal added to cart`)
        setCartSize(cartSize + 1)
    }


    useEffect(() => {
        if(props.location.query === "undefined"){
            notifyWarning("Select Your location")
            setOpen(true)
            setSuccess(false)
        }
        let location = localStorage.getItem("location")
        let parsedLocation = JSON.parse(location)
        let token = localStorage.getItem("token")
        let cart = localStorage.getItem("cart")
        let parsedCart = JSON.parse(cart)
        setFinish(done.done)
        setToken(token)
        if(parsedCart === undefined || parsedCart === null){
            setInitialCart([])
        } else {
            setInitialCart(parsedCart)
            setCartSize(parsedCart.length)
        }
        // if(parsedLocation){
        //     setLocation(true)
        //     setOpenSuccess(true)
        //     setOpen(false)
        // } 
        Axios.get("https://server.wakafoods.com/api/place/list")
        .then((res) => {
            setStates(res.data.places)
        })

        Axios.get("https://server.wakafoods.com/api/meal/list")
        .then((res) => {
            setMeals(res.data.data)
        })
        setTimeout(() => {
            setModalTime(true)
        }, 10000)
        
    }, [])

    useEffect(() => {
        if(success){
            let names = localStorage.getItem("names")
            let parsedNames = JSON.parse(names)
            setPersons(parsedNames)
            setPerson(parsedNames[0])
            if(parsedNames.length === 1){
                for(var i = 1; i <= new Array(parsedNames[0]).length; i++){
                    numberOfPersons.push(i)
                }
                setPerson(numberOfPersons[0])
            }
        }
    }, [success])

    return (
        <div id="home-screen">
            <HeaderNav cartSize={cartSize} home={true} setSuccess={setSuccess} setOpen={setOpen}/>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Bg />
            {!finish && (
                <div>
                    {states.length > 0 && modalTime && !openFail && !openSuccess && open && (
                        <WelcomeModal setLocation={setPickupLocation} setIsLuck={setIsLuck} setSuccess={setSuccess} open={open} openFail={openFail} setOpenFail={setOpenFail} openSuccess={openSuccess} setOpenSuccess={setOpenSuccess} setOpen={setOpen} states={states} {...props} />
                    )}
                    {openFail && !openSuccess && (
                        <FailModal notifyWarning={notifyWarning} open={open} openFail={openFail} setOpenFail={setOpenFail} openSuccess={openSuccess} setOpenSuccess={setOpenSuccess} setOpen={setOpen} />
                    )}
                    {!openFail && openSuccess && pickupLocation.slug && (
                        <SuccessModal setSuccess={setSuccess} setOpen={setOpen} pickupLocation={pickupLocation} isLuck={isLuck} notifySuccess={notifySuccess} location={location} openFail={openFail} setOpenFail={setOpenFail} openSuccess={openSuccess} setOpenSuccess={setOpenSuccess} setOpen={setOpen} />
                    )}
                </div>
            )}
            <div id="meals">
                {/* <!--============ THE FOOD LISTING ==========--> */}
                <div style={{width: "100%"}} className="container">
                    <h4 className="py-5 text-center" style={{color: "#ff8903"}}>{success ? persons.length > 1 ? `For ${person}` : `For Person ${step}` : ""}</h4>
                    <div className="row">
                        <div className="col-12">
                            {meals.length > 0 ? (
                                <div className="row">
                                    <div className="col-lg-2">
                                        <div className="d-none d-lg-block">
                                            <h6><FaUtensils /> Categories</h6>
                                            <CatItems meals={meals} />
                                        </div>
                                        <div className="d-lg-none pb-3">
                                            <div onClick={() => setCategoryTab(!categoryTab)} style={{width: "100%"}} className="bg-white cursor p-2 d-flex justify-content-around align-items-center">
                                               <div style={{color: "gray"}}>Categories</div>
                                               <div>{categoryTab ? <FaArrowCircleUp color="gray" /> : <FaArrowCircleDown color="gray" /> }</div>
                                            </div>
                                            {categoryTab && <CatItems meals={meals} />}
                                        </div>
                                    </div>
                                    <div className="col-lg-10">
                                        <div className="d-flex justify-content-start align-items-center pb-3">
                                            <div className="py-3 px-5 cursor" style={{fontWeight: "bold", color: tabValue === 0 ? "#ff8903" : "gray", backgroundColor: tabValue === 0 ? "white" : "transparent"}} onClick={(e) => handleChangeTab(e, 0)}><FaUtensilSpoon />  Menu</div>
                                            <div className="py-3 px-5 cursor" style={{fontWeight: "bold", color: tabValue === 1 ? "#ff8903" : "gray", backgroundColor: tabValue === 1 ? "white" : "transparent"}} onClick={(e) => handleChangeTab(e, 1)}><FaTable />  Book an Engagement</div>
                                        </div>
                                        {tabValue === 0 && (
                                            <FoodMenu notifySuccess={notifySuccess} handleAddCart={handleAddCart} person={person} meals={meals} />
                                        )}
                                        {tabValue === 1 && (
                                            <BookTable notifySuccess={notifySuccess} notifyWarning={notifyWarning} token={token} />
                                        )}
                                        <div className="mt-4 pb-5">
                                            {persons.length > 1 && step !== persons.length && (
                                                <button onClick={changePerson} className="btn btn-style btn-lg">NEXT PERSON</button>
                                            )}
                                            {persons.length === 1 && step < numberOfPersons.length && (
                                                <button onClick={changePerson1} className="btn btn-style btn-lg">NEXT PERSON</button>
                                            )}
                                        </div>
                                        <div className="mb-5">
                                            {tabValue === 0 && (
                                                <Link to="/cart" className="nav-item">
                                                    <button className="btn" style={{color: "white", backgroundColor: "#ff8903"}}>CONTINUE TO CART</button>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Preloader home={true} />
                            )}
                            
                        </div>

                        
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
