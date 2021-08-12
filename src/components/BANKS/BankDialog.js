import React from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import { useData } from '../../contexts/DataContext';
import BankList from './BankList';

function BankDialog({ handleAlertOpening }) {
    const { banks } = useData()
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
            </Dialog>
        </div>
    );
}

export default BankDialog
