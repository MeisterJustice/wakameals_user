import React from 'react';
import pic from '../../images/pic.jpg';


export default function UserProfileModal() {
    return (
        <div>
            <div
                className="modal fade"
                id="userProfileModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h6 style={{color: 'black'}} className="modal-title" id="exampleModalCenterTitle">
                                User Profile
                            </h6>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container-lg ">
                                <div className="text-center">
                                    <img
                                         alt="photo"
                                        src={pic}
                                        className="rounded-circle"
                                        style={{height: '200px', width: '200px'}}
                                    />
                                    <p style={{color: 'black', fontWeight: 'bold', marginTop: '10px'}}>
                                        Ibe Andyson Andrew
                                    </p>
                                    <p style={{color: 'black', fontWeight: 'bold', fontSize: "0.6em",  marginTop: '10px'}}>
                                        ibeandyson@gmail.com                                    </p>
                                    <p style={{color: 'black', fontWeight: 'bold', fontSize: "0.6em", marginTop: '10px'}}>
                                        09033275449
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
