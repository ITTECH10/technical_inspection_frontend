import React from 'react'
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from '@material-ui/core/Accordion';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {useData} from './../../contexts/DataContext'
import axios from 'axios'

const BankList = ({ bank }) => {
    const {selectedCar} = useData()
    const {name, _id} = bank
    // const data = {vehiclePaymentType: _id}

    const handleBankSelection = () => {
        axios.patch(`/cars/${selectedCar._id}`, {vehiclePaymentType: _id})
        .then(res => {
            console.log(res.data)
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
                <Button onClick={() => handleBankSelection()} color="primary" variant="contained">Select</Button>
            </AccordionDetails>
        </Accordion>
    )
}

export default BankList
