import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';

import { useData } from '../../contexts/DataContext';
import InsuranceList from './InsuranceList';

const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
});

function SimpleDialog(props) {
    const classes = useStyles();
    const { onClose, selectedValue, open } = props;
    const {insurances} = useData()

    const handleClose = () => {
        onClose(selectedValue);
    };

    const content = insurances.map(insurance => (
        <InsuranceList key={insurance._id} insurance={insurance} />
    ))

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle>Connect user to insurance</DialogTitle>
                {content}
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo() {
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(0);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };

    return (
        <div>
            <Button size="small" variant="contained" color="primary" onClick={handleClickOpen}>
                Add Insurance
            </Button>
            <SimpleDialog open={open} onClose={handleClose} />
        </div>
    );
}
