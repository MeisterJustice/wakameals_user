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
    const handleChangeTab = (event, newValue) => {
        setTabValue(newValue);
    };

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
        let storedCart = localStorage.getItem("cart")
        let parsedStoredCart = JSON.stringify(storedCart)
        if(token === undefined || token === null){
            localStorage.setItem("cart", JSON.stringify([
                ...initialCart,
                {...data, name: person}
            ]))
        } else {
            Axios.post("https://server.wakameals.validprofits.xyz/api/cart/new", {
                ...data,
                name: person
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                  },
            })
            .then((res) => {
                localStorage.setItem("cart", JSON.stringify([
                    ...initialCart,
                    {...data, name: person}
                ]))
                setInitialCart([
                    ...initialCart,
                    {...data, name: person}
                ])
            })
            .catch((e) => {})
        }
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
        if(parsedLocation){
            setLocation(true)
            setOpenSuccess(true)
            setOpen(false)
        } 
        Axios.get("https://server.wakameals.validprofits.xyz/api/state/list")
        .then((res) => {
            setStates(res.data.states)
        })

        Axios.get("https://server.wakameals.validprofits.xyz/api/meal/list")
        .then((res) => {
            setMeals(res.data.data)
        })
        
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
            {/* {!finish && (
                <div>
                    {states.length > 0 && !openFail && !openSuccess && open && (
                        <WelcomeModal setSuccess={setSuccess} open={open} openFail={openFail} setOpenFail={setOpenFail} openSuccess={openSuccess} setOpenSuccess={setOpenSuccess} setOpen={setOpen} states={states} {...props} />
                    )}
                    {openFail && !openSuccess && (
                        <FailModal notifyWarning={notifyWarning} open={open} openFail={openFail} setOpenFail={setOpenFail} openSuccess={openSuccess} setOpenSuccess={setOpenSuccess} setOpen={setOpen} />
                    )}
                    {!openFail && openSuccess && (
                        <SuccessModal notifySuccess={notifySuccess} location={location} setSuccess={setSuccess} open={open} openFail={openFail} setOpenFail={setOpenFail} openSuccess={openSuccess} setOpenSuccess={setOpenSuccess} setOpen={setOpen} />
                    )}
                </div>
            )} */}
            <div id="meals">
                {/* <!--============ THE FOOD LISTING ==========--> */}
                <div style={{width: "100%"}} className="container">
                    <h4 className="mt-3 text-center" style={{color: "white"}}>{success ? persons.length > 1 ? `For ${person}` : `For Person ${step}` : ""}</h4>
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
                                            <div className="py-3 px-5 cursor" style={{fontWeight: "bold", color: tabValue === 0 ? "#B02121" : "gray", backgroundColor: tabValue === 0 ? "white" : "transparent"}} onClick={(e) => handleChangeTab(e, 0)}><FaUtensilSpoon />  Menu</div>
                                            <div className="py-3 px-5 cursor" style={{fontWeight: "bold", color: tabValue === 1 ? "#B02121" : "gray", backgroundColor: tabValue === 1 ? "white" : "transparent"}} onClick={(e) => handleChangeTab(e, 1)}><FaTable />  Book a Table</div>
                                        </div>
                                        {tabValue === 0 && (
                                            <FoodMenu notifySuccess={notifySuccess} handleAddCart={handleAddCart} person={person} meals={meals} />
                                        )}
                                        {tabValue === 1 && (
                                            <div style={{height: "500px"}}>jj</div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <Preloader />
                            )}
                            <div className="mt-3 pb-5">
                                {persons.length > 1 && step !== persons.length && (
                                    <button onClick={changePerson} className="btn btn-style btn-lg">NEXT PERSON</button>
                                )}
                                {persons.length === 1 && step < numberOfPersons.length && (
                                    <button onClick={changePerson1} className="btn btn-style btn-lg">NEXT PERSON</button>
                                )}
                            </div>
                        </div>

                        
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
