import React, { useState } from 'react'
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from '@material-ui/core/Accordion';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useData } from './../../contexts/DataContext'
import axios from 'axios'
import { CircularProgress } from '@material-ui/core';
import { withNamespaces } from 'react-i18next';

const InsuranceList = ({ insurance, t, handleAlertOpening, handleDialogClosing }) => {
    const { selectedCar, setSelectedCar, setGeneralAlertOptions } = useData()
    const [buttonLoading, setButtonLoading] = useState(false)

    const { name, _id } = insurance
    const data = { insuranceHouse: _id }

    const handleInsuranceSelection = () => {
        setButtonLoading(true)

        axios.patch(`/cars/${selectedCar._id}`, data)
            .then(res => {
                if (res.status === 202) {
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
                <Button onClick={() => handleInsuranceSelection()} color="primary" variant="contained">
                    {buttonLoading ? <CircularProgress style={{ height: 25, width: 25, color: '#fff' }} /> : t('SubmitButton')}
                </Button>
            </AccordionDetails>
        </Accordion>
    )
}

export default withNamespaces()(InsuranceList)
