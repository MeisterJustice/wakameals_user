import React from 'react'

export default function ViewOrderModal() {
    return (
        <div>
                  <div
                className="modal fade"
                id="viewOrderModal"
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
                            <div className="container-lg ">
                                <div className="d-flex justify-content-between">
                                    <p style={{color: 'black', fontWeight: 'bold', fontSize: '0.7em'}}>Item</p>
                                    <p style={{color: 'black', fontWeight: 'bold', fontSize: '0.7em'}}>Quantity</p>
                                    <p style={{color: 'black', fontWeight: 'bold', fontSize: '0.7em'}}>Amount</p>
                                </div>
                                <div style={{marginTop: '-20px'}}>
                                    <hr />

                                    <div className="d-flex justify-content-between">
                                        <p style={{color: 'black', fontSize: '0.7em'}}>soup</p>
                                        <p style={{color: 'black', fontSize: '0.7em'}}>1</p>
                                        <p style={{color: 'black', fontSize: '0.7em'}}>$200</p>
                                    </div>

                                    <div className="d-flex justify-content-between mt-5" >
                                        <p style={{color: 'black', fontWeight: 'bold', fontSize: '0.9em'}}>
                                            Total =<span className="ml-2">$406005</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
