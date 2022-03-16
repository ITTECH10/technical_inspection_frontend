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
import { withNamespaces } from 'react-i18next';

const BankList = ({ bank, t, handleAlertOpening, handleDialogClosing }) => {
    const { selectedCar, setSelectedCar, setGeneralAlertOptions } = useData()
    const [buttonLoading, setButtonLoading] = useState(false)
    const { name, _id } = bank
    const data = { vehiclePaymentType: _id }

    const handleBankSelection = () => {
        setButtonLoading(true)

        axios.patch(`/cars/${selectedCar._id}`, data)
            .then(res => {
                // console.log(res.data)
                if (res.status === 202) {
                    // console.log(res.data)
                    setSelectedCar(res.data.vehicle)

                    setButtonLoading(false)
                    handleAlertOpening(true)
                    handleDialogClosing(false)
                }
            })
            .catch(err => {
                // console.log(err.response)
                setGeneralAlertOptions({
                    open: true,
                    message: err.response ? err.response.data.message : 'Server-Fehler......',
                    severity: 'error',
                    hideAfter: 2500
                })
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
                    {buttonLoading ? <CircularProgress style={{ height: 25, width: 25, color: '#fff' }} /> : t('SubmitButton')}
                </Button>
            </AccordionDetails>
        </Accordion>
    )
}

export default withNamespaces()(BankList)
