import React from 'react';
import PreloaderImg from '../../images/preloader1.gif';

export default function Preloader() {
    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "90vh", width: "100%"}}>
            <div className="overlay">
                <div className="spinner">
                    <img  alt="loader" style={{width: "50px" , height: "50px"}} src={PreloaderImg} />
                </div>
            </div>
           
        </div>
    );
}