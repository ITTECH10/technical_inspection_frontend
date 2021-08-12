import React, { useState } from 'react'
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from '@material-ui/core/Accordion';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { CircularProgress } from '@material-ui/core';
import { useData } from './../../contexts/DataContext'
import axios from 'axios'

const BankList = ({ bank, handleAlertOpening, handleDialogClosing }) => {
    const { selectedCar, setSelectedCar } = useData()
    const [buttonLoading, setButtonLoading] = useState(false)
    const { name, _id } = bank
    const data = { vehiclePaymentType: _id }

    const handleBankSelection = () => {
        setButtonLoading(true)

        axios.patch(`/cars/${selectedCar._id}`, data)
            .then(res => {
                // console.log(res.data)
                if (res.status === 202) {
                    console.log(res.data)
                    setTimeout(() => {
                        setSelectedCar(res.data.vehicle)

                        setButtonLoading(false)
                        handleAlertOpening(true)
                        handleDialogClosing(false)
                    }, 2000)
                }
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>{name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Button onClick={() => handleBankSelection()} color="primary" variant="contained">
                    {buttonLoading ? <CircularProgress style={{ height: 25, width: 25, color: '#fff' }} /> : 'Select'}
                </Button>
            </AccordionDetails>
        </Accordion>
    )
}

export default BankList
