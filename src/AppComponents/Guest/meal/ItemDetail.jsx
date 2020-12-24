import React from 'react';
import Naira from 'react-naira';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import parse from 'html-react-parser';


export default function ItemDetail({meal, open, handleClose}) {
    
    return (
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{meal.name}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div>
                            <img alt="photo" style={{height: '200px', width: '100%'}} src={meal.image} />
                        </div>
                        <div>
                            <div className="mt-3">
                                <div className="d-flex flex-row-reverse">
                                    <p style={{color: 'black', fontSize: '0.8em', fontWeight: 'bold'}}><Naira>{meal.price}</Naira></p>
                                </div>
                                <h5 style={{color: 'black'}}>Description </h5>
                                <p style={{color: 'black', fontSize: "0.7em"}}>
                                    {parse(meal.description)}
                                </p>
                            </div>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} style={{color: "#ff7417"}}>
                    CLOSE
                </Button>
                </DialogActions>
            </Dialog>

      
    );
}
