
import { useState } from 'react';
import {AiOutlinePlus} from 'react-icons/ai';
import {AiOutlineMinus} from 'react-icons/ai';
import Naira from 'react-naira';

const CartItem = ({extra, setCartData, cartData}) => {
    const [totalPrice, setTotalPrice] = useState(0.00)
    const [defaultMeasurement, setDefaultMeasurement] = useState(1)

    const handleAdd = async () => {
        await setTotalPrice(extra.price *  (Number(defaultMeasurement - 1) + 1))
        await setDefaultMeasurement(defaultMeasurement + 1)
        let selectedExtra = await cartData.meal_extras.filter((extras) => extras.id === extra.id)
        let isAvailable = await selectedExtra.length > 0
        if(!isAvailable){
            await setCartData({
                ...cartData,
                meal_extras: [
                    ...cartData.meal_extras,
                    {
                        id: extra.id,
                        quantity: Number(defaultMeasurement - 1) + 1
                    }
                ]
            })
        } else {
            const index = await cartData.meal_extras.findIndex((extras) => extras.id === extra.id);
            let extras = [...cartData.meal_extras];
            let newExtra = {...extras[index]}
            newExtra.quantity = await Number(defaultMeasurement - 1) + 1
            extras[index] = await newExtra
            await setCartData({
                ...cartData,
                meal_extras: extras
            })
        }

    } 

    const handleMinus = async () => {
        if(defaultMeasurement - 1 < 1){
            return;
        }
        await setTotalPrice(totalPrice - extra.price)
        await setDefaultMeasurement(defaultMeasurement - 1)
        let selectedExtra = await cartData.meal_extras.filter((extras) => extras.id === extra.id)
        let isAvailable = await selectedExtra.length > 0
        if(!isAvailable){
            return;
        } else {
            const index = await cartData.meal_extras.findIndex((extras) => extras.id === extra.id);
            let extras = [...cartData.meal_extras];
            let newExtra = {...extras[index]}
            newExtra.quantity = await Number(defaultMeasurement) - 1
            extras[index] = await newExtra
            await setCartData({
                ...cartData,
                meal_extras: extras
            })
        }
    } 

    return (
        <div className="mt-2">
            <div className="row">
                <div className="col-5">
                    <p style={{opacity: 0.9, color: 'black', fontWeight: '600', fontSize: '0.9em', display:"inline"}}>{extra.name}</p>
                    <p style={{opacity: 0.9, color: 'black', fontSize: '0.7em', display:"inline", fontWeight:"500"}} className="ml-2"><Naira>{extra.price}</Naira>/{extra.measurement_quantity}{extra.measurement_type}</p>
                </div>
                <div className="col-3">
                    <p style={{color: 'black', fontSize: '1em', display:"inline", fontWeight:"500"}}><Naira>{totalPrice}</Naira></p>
                </div>
                <div className="btn-group btn-group-sm col-4" role="group" aria-label="...">
                    <button onClick={handleMinus} type="button" className="btn btn-style">
                        <AiOutlineMinus />
                    </button>
                    <div className="btn btn-style">
                        {defaultMeasurement - 1}
                    </div>
                    <button onClick={handleAdd} type="button" className="btn btn-style">
                        <AiOutlinePlus />
                    </button>
                </div>
                
            </div>
            <hr className="mt-3" />
        </div>
    )
}

export default CartItem;