import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DocumentCategoryProvider from './DocumentCategoryProvider'
import { withNamespaces } from 'react-i18next'

function DocumentUploadModal({ open, handleChange, setOpen, onHandleSubmit, fields, t }) {
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
                        {DocumentCategoryProvider.getDocumentCategories().map((fc) => (
                            <option key={fc.categoryId} value={fc.categoryId}>
                                {t(`${fc.categoryType}`)}
                            </option>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleClose} color="primary">
                        Abrechen
                    </Button>
                    <Button variant="contained" onClick={handleFilesUpload} color="secondary">
                        Absenden
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default withNamespaces()(DocumentUploadModal)