import React from 'react';
import Categories from './Categories';

export default function FoodMenu(props) {
    return (
        <div className="bg-white p-3">
            {props.meals.map((data, index) => (
                <Categories notifySuccess={props.notifySuccess} handleAddCart={props.handleAddCart} {...props} key={index} data={data} index={index} />
            ))}
        </div>
    );
}
