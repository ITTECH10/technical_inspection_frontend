import React from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import { useData } from '../../contexts/DataContext';
import InsuranceList from './InsuranceList';

function InsuranceDialog({ handleAlertOpening }) {
    const { insurances } = useData()
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const content = insurances.map(insurance => (
        <InsuranceList handleDialogClosing={setOpen} handleAlertOpening={handleAlertOpening} key={insurance._id} insurance={insurance} />
    ))

    return (
        <div>
            <Button size="small" variant="contained" color="primary" onClick={handleClickOpen}>
                Connect Insurance
            </Button>
            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle>Connect vehicle to insurance</DialogTitle>
                {content}
            </Dialog>
        </div>
    );
}

export default InsuranceDialog
