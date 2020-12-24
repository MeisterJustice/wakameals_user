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
        <div className="bg-white p-2 mt-2">
            <div>
                <p className="food-list-name">{props.meal.name}</p>
                <div className="row">
                    <div className="col-7 col-md-8">
                        <div className="row">
                            <div className="col-lg-5">
                                
                                <img
                                     alt="photo"
                                    style={{width: '150px', height: '100px'}}
                                    src={props.meal.image}
                                />
                            </div>
                            <div className="col-lg-7">
                                <p>{parse(props.meal.description.substring(0, 25))}...</p>
                                <button 
                                    className="btn btn-style btn-sm"
                                    onClick={handleClickOpen}
                                >
                                    read more
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-5 col-md-4">
                        <div>
                            <p className="food-list-item-1" style={{fontSize: '1.2em'}}><Naira>{props.meal.price}</Naira></p>
                        </div>
                        <div className="mt-3">
                            <button onClick={handleClickOpenCart} className="btn btn-sm btn-danger">Add To Cart</button>
                        </div>
                    </div>
                </div>
            </div>
            <ItemDetail handleClose={handleClose} open={open} meal={props.meal} />
            <AddToCart handleClose={handleCloseCart} open={openCart} notifySuccess={props.notifySuccess} handleAddCart={props.handleAddCart} person={props.person} meal={props.meal} />
        </div>
    )
}

export default Meal