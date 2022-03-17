import * as React from 'react';
import { Box, Snackbar } from '@material-ui/core'
import { Alert as MuiAlert } from '@material-ui/lab'
import { useData } from '../contexts/DataContext'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Alerts() {
    const { generalAlertOptions, setGeneralAlertOptions } = useData()

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setGeneralAlertOptions(prevState => ({
            ...prevState,
            open: false
        }));
    };

    return (
        <Box spacing={2} sx={{ width: '100%', position: 'absolute', zIndex: 1000000 }}>
            <Snackbar
                open={generalAlertOptions.open}
                onClose={handleClose}
                autoHideDuration={generalAlertOptions.hideAfter}
                sx={{ left: { xs: null, md: '50%' }, transform: { xs: 'none', md: 'translateX(-50%)' } }}
            >
                <Alert onClose={handleClose} severity={generalAlertOptions.severity} sx={{ width: '100%' }}>
                    {generalAlertOptions.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}