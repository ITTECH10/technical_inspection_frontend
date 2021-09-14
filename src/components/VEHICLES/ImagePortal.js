import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const FILE_CATEGORIES = [
    {
        name: 'X',
        icon: ''
    },
    {
        name: 'Y',
        icon: ''
    },
    {
        name: 'Z',
        icon: ''
    },
]

export default function ImagePortal({ open, handleChange, setOpen, onHandleSubmit, fields }) {
    const handleClose = () => {
        setOpen(false);
    };

    const handleFilesUpload = () => {
        if (onHandleSubmit && fields.photo !== '') {
            onHandleSubmit.click()
        }
    }

    return (
        open &&
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Datei vor dem Hochladen bearbeiten?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Sie können die Dateidetails im Formular unten bearbeiten
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="fileName"
                        label="File name"
                        type="text"
                        onChange={handleChange}
                        fullWidth
                        style={{ marginBottom: 10 }}
                    />
                    <TextField
                        name="fileCategory"
                        id="file-categories-upload"
                        select
                        label="File category"
                        onChange={handleChange}
                        fullWidth
                        required
                        SelectProps={{
                            native: true,
                        }}
                        helperText="Bitte selekten sie die file category."
                    >
                        {FILE_CATEGORIES.map((fc) => (
                            <option key={fc.name} value={fc.name}>
                                {fc.name}
                            </option>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button disabled={Object.values(fields)[1] === ''} variant="contained" onClick={handleFilesUpload} color="secondary">
                        Subscribe
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
