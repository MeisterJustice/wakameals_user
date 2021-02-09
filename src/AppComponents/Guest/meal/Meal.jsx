import Naira from 'react-naira'
import ItemDetail from './ItemDetail';
import AddToCart from './AddToCart';
import { useState } from 'react';
import parse from 'html-react-parser';

const Meal = (props) => {
    const [open, setOpen] = useState(false);
    const [openCart, setOpenCart] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpenCart = () => {
        setOpenCart(true);
    };

    const handleCloseCart = () => {
        setOpenCart(false);
    };
    return (
        <div className="bg-white mt-4">
            <div className="mt-4">
                <div className="row">
                    <div className="col-7 col-md-8">
                        <div className="row">
                            <div className="col-lg-3">
                                
                                <img
                                     alt="photo"
                                    style={{width: '90px', height: '90px'}}
                                    src={props.meal.image}
                                />
                            </div>
                            <div style={{width: "100%"}} className="col-lg-9">
                                <div className="food-desc">{props.meal.name}</div>
                                <div className="food-desc mute mt-1">{parse(props.meal.description)}</div>
                                {/* <button 
                                    className="btn btn-style btn-sm"
                                    onClick={handleClickOpen}
                                >
                                    read more
                                </button> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-5 col-md-4">
                        <div>
                            <p className="food-list-item-1" style={{fontSize: '1.2em'}}><Naira>{props.meal.price}</Naira></p>
                        </div>
                        <div className="mt-3">
                            <button onClick={handleClickOpenCart} style={{backgroundColor: "#FF8903", color: "white" }} className="btn btn-sm">Add To Cart</button>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="py-2" />
            <ItemDetail handleClose={handleClose} open={open} meal={props.meal} />
            <AddToCart handleClose={handleCloseCart} open={openCart} notifySuccess={props.notifySuccess} handleAddCart={props.handleAddCart} person={props.person} meal={props.meal} />
        </div>
    )
}

export default Meal