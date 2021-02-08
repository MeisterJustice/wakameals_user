import React, { useState } from 'react';
import CartItem from './CartItem';
import Naira from 'react-naira';
import { v4 as uuidv4 } from 'uuid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function AddToCart({meal, person, handleAddCart, open, handleClose}) {
    const [price, setPrice] = useState(Number(meal.price))
    const [cartData, setCartData] = useState({
        id: "",
        meal_id: "",
        special_instruction: "",
        meal_extras: []
    })

    const handleAdd = async () => {
        handleAddCart({
            ...cartData,
            meal_id: meal.id,
            id: uuidv4()
        })
        setCartData({
            id: "",
            meal_id: "",
            special_instruction: "",
            meal_extras: []
        })
        handleClose()
    }
    
    return (
        <div>
            <Dialog
                fullWidth
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-cart"
            >
                <DialogTitle id="alert-dialog-title">
                    <h5 style={{color: '#B02121'}} className="modal-title" id="exampleModalCenterTitle">
                        <Naira>{price}</Naira>
                    </h5>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-cart">                                
                        <div className="pr-3">
                            <h5 className="mb-4" style={{color: 'black', fontWeight: "500"}} >
                                EXTRAS
                            </h5>
                            {meal.extra_items.map((extra, index) => (
                                <CartItem price={price} setPrice={setPrice} meal={meal} cartData={cartData} person={person} setCartData={setCartData} extra={extra} key={index} />
                            ))}
                            <div className="mt-3">
                                <label htmlFor="additional-request" style={{color: "black"}}>Additional Request</label>
                                <input onChange={(e) => setCartData({...cartData, special_instruction: e.target.value})} type="text" className="form-control" id="additional-request" placeholder="I am allergic to garlic"/>
                            </div>
                            <div onClick={handleAdd} className="mt-3">
                                <button data-dismiss="modal" aria-label="Close" className="btn btn-md btn-block" style={{backgroundColor: "#B02121", color: "white"}}>ADD TO CART</button>
                            </div>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} style={{color: "#black", fontWeight: "550"}}>
                    CLOSE
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
