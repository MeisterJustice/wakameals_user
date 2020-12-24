import React from 'react';
import Categories from './Categories';

export default function FoodMenu(props) {
    return (
        <div>
            {props.meals.map((data, index) => (
                <Categories notifySuccess={props.notifySuccess} handleAddCart={props.handleAddCart} {...props} key={index} data={data} index={index} />
            ))}
        </div>
    );
}
