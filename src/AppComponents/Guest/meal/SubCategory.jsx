import { useState } from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import Meal from "./Meal";


const SubCategory = (props) => {
    const [show, setShow] = useState(true)
    return (
        <div className="mt-2">
            <div onClick={() => setShow(!show)} className="pl-3 cursor" style={{fontSize: "18px", backgroundColor: "#302f2f", width: "100%", height: "50px", color: "white", display: "flex", justifyContent: 'space-between', alignItems: "center"}}>
                    <div>{props.data.name}</div> 
                    <div className="mr-2">
                    {show ? <MdArrowDropUp style={{color: "#ffffff", fontSize: "25px"}}/> : <MdArrowDropDown style={{color: "#ffffff", fontSize: "25px"}}/>}
                    </div>
            </div>
            <div className="card-body body-inner mt-3" style={{display: show ? "block" : "none"}} >
                {props.data.meals.map((meal, index) => (
                    <Meal index={index} notifySuccess={props.notifySuccess} handleAddCart={props.handleAddCart} {...props} key={index} meal={meal} />
                ))}
            </div>
        </div>
    )
}

export default SubCategory;