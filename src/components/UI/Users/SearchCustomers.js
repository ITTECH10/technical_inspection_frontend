import React from 'react'
import { Box, TextField, InputAdornment } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    boxRoot: {
        width: '100%',
        textAlign: 'center',
        margin: '5px 0'
    },
    inputRoot: {
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '100%'
        }
    }
}))

const SearchCustomers = ({ fields, setFields, noCustomers }) => {
    const classes = useStyles()

    const handleChange = (e) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })
    }

    return (
        <Box className={classes.boxRoot}>
            <Box>
                <TextField
                    className={classes.inputRoot}
                    autoFocus
                    name="query"
                    margin="dense"
                    disabled={noCustomers}
                    id="query"
                    label="Filter..."
                    onChange={handleChange}
                    type="text"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
        </Box>
    )
}

export default SearchCustomers
