import React from 'react';


export default function DeliverOrderModal() {
    return (
        <div>
            <div
                className="modal fade"
                id="deliverOrderModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h6 style={{color: 'black'}} className="modal-title" id="exampleModalCenterTitle">
                                Oder
                            </h6>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1" style={{fontSize: '0.7em', fontWeight: 'bold'}}>
                                    Delivery Man Code
                                </label>
                                <input type="email" className="form-control" placeholder="enter delivery" />
                            </div>
                            <div className="form-group mt-4">
                                <button
                                    type="button"
                                    style={{backgroundColor: '#ff8903', color: 'white'}}
                                    className="btn btn-warning">
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
