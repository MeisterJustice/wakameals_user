
import SubCategory from './SubCategory';
import { useState } from 'react';
import {MdArrowDropDown, MdArrowDropUp} from "react-icons/md"
 

const Categories = (props) => {
    const [show, setShow] = useState(false)
    return (
            <div className="mt-3 mx-lg-5">
                <div onClick={() => setShow(!show)} className="pl-3 cursor" style={{fontSize: "18px", backgroundColor: "#ff7417", width: "100%", height: "60px", color: "white", display: "flex", justifyContent: 'space-between', alignItems: "center"}}>
                    <div style={{fontWeight: "500"}}>{props.data.name}</div> 
                    <div className="mr-2">
                    {show ? <MdArrowDropUp style={{color: "#ffffff", fontSize: "25px"}}/> : <MdArrowDropDown style={{color: "#ffffff", fontSize: "25px"}}/>}
                    </div>
                </div>
                {props.data.subcategories.map((data, index) => (
                    <div key={index} style={{display: show ? 'block' : 'none'}}>
                        <SubCategory notifySuccess={props.notifySuccess} handleAddCart={props.handleAddCart} {...props} data={data} />
                    </div>
                ))}
            </div>
        
    )
}

export default Categories