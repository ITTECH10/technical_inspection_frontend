import React from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import { useData } from '../../contexts/DataContext';
import InsuranceList from './InsuranceList';
import { withNamespaces } from 'react-i18next';

function InsuranceDialog({ handleAlertOpening, t }) {
    const { insurances } = useData()
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const content = insurances.map(insurance => (
        <InsuranceList
            handleDialogClosing={setOpen}
            handleAlertOpening={handleAlertOpening}
            key={insurance._id}
            insurance={insurance}
        />
    ))

    return (
        <div>
            <Button size="small" variant="contained" color="primary" onClick={handleClickOpen}>
                {t('ConnectInsuranceButton')}
            </Button>
            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle>{t('ConnectInsuranceToVehicleTitle')}</DialogTitle>
                {content}
            </Dialog>
        </div>
    );
}

export default withNamespaces()(InsuranceDialog)
