import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { Typography, CircularProgress } from '@material-ui/core';

import { useData } from '../../contexts/DataContext';
import BankList from './BankList';
import axios from 'axios'

function BankDialog({ handleAlertOpening }) {
    const { banks, selectedCar, setSelectedCar } = useData()
    const [open, setOpen] = React.useState(false);
    const [buttonLoading, setButtonLoading] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const data = {
        vehiclePaymentType: 'cash'
    }

    const handleCashPayment = () => {
        setButtonLoading(true)

        axios.patch(`/cars/${selectedCar._id}`, data)
            .then(res => {
                if (res.status === 202) {
                    setTimeout(() => {
                        setSelectedCar(res.data.vehicle)
                        setButtonLoading(false)
                        handleAlertOpening(true)
                        setOpen(false)
                    }, 2000)
                }
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    const content = banks.map(bank => (
        <BankList handleDialogClosing={setOpen} handleAlertOpening={handleAlertOpening} key={bank._id} bank={bank} />
    ))

    return (
        <div>
            <Button size="small" variant="contained" color="primary" onClick={handleClickOpen}>
                Connect Bank
            </Button>
            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle>Connect vehicle to bank</DialogTitle>
                {content}
                <Typography align="center" variant="h6" style={{ margin: '5px', fontWeight: 600 }}>
                    If customer already payed with CASH press the button bellow.
                </Typography>
                <Button onClick={() => handleCashPayment()} style={{ margin: '0 auto 5px auto', width: '20%' }} variant="contained" color="primary">
                    {buttonLoading ? <CircularProgress style={{ height: 25, width: 25, color: '#fff' }} /> : 'cash!'}
                </Button>
            </Dialog>
        </div>
    );
}

export default BankDialog
