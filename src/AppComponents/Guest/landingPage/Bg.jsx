import { useState } from "react";
import { FaClock, FaLocationArrow, FaPhone } from "react-icons/fa"

const Bg = () => {
    const [open1, setOpen1] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [open3, setOpen3] = useState(false)

    return (
        <div>
            <div id="bgImage">
                <div className="d-flex bg-wrapper flex-column justify-content-center align-items-center">
                    <h1>
                        <div className="text-center">WELCOME TO WAKAFOODS</div>
                        <div className="text-center">Your No 1 Online Restaurant</div>
                    </h1>
                    <h5 className="mt-2">Good Food Is Coming Your Way</h5>
                    <div className="mt-5 d-flex flex-row justify-content-center align-items-center">
                        <div className="mx-4">
                            <div className="text-center muted muted1">{open1 ? "Opening Time  8:00 Am" : ""}</div>
                            <div onMouseEnter={() => setOpen1(true)} onMouseLeave={() => setOpen1(false)} className="icon-wrapper1 d-flex">
                                <FaClock color="white" size="30px" />
                            </div>
                        </div>
                        <div className="mx-4">
                            <div className="text-center muted muted2">{ open2 ? "0913333360" : "" }</div>
                            <div onMouseEnter={() => setOpen2(true)} onMouseLeave={() => setOpen2(false)} className="icon-wrapper2 d-flex">
                                <FaPhone color="white" size="30px" />
                            </div>
                        </div>
                        <div className="mx-4">
                            <div className="text-center muted muted3">{ open3 ? "37A pa Michael Imoudu Avenue Gwarinpa" : "" }</div>
                            <div onMouseEnter={() => setOpen3(true)} onMouseLeave={() => setOpen3(false)} className="icon-wrapper3 d-flex">
                                <FaLocationArrow color="white" size="30px" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="order-now">
                <div style={{height: "100%"}} className="container d-flex flex-column flex-lg-row justify-content-lg-between justify-content-around align-items-center">
                    <div className="text-white">
                        <div style={{fontSize: "29px", fontWeight: "bold", lineHeight: "1"}}>IT'S VALENTINE NOW. ORDER FOR YOUR LOVED ONES FROM ANY CITY IN NIGERIA</div>
                        <div className="mt-1">The first 50 persons to get an added FREE Meal Pack</div>
                    </div>
                    <div className="d-lg-none" style={{width: "100%"}}>
                        <a style={{backgroundColor: "white", color: "#B02121", fontWeight: "bold"}} href="#meals" className="btn btn-lg btn-block">ORDER NOW</a>
                   </div>
                   <div className="d-lg-block d-none order-lg">
                        <a style={{backgroundColor: "white", color: "#B02121", fontWeight: "bold"}} href="#meals" className="btn btn-lg">ORDER NOW</a>
                   </div>
                </div>
            </div>
        </div>
    )
}

export default Bg;