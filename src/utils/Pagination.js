import React from 'react';
import { Box, Button, useMediaQuery } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useData } from '../contexts/DataContext';

const useStyles = makeStyles(theme => ({
    groupBtn: {
        margin: '0 5px'
    }
}))

function Pagination({ pageLimit, data, dataLimit }) {
    const [pages] = React.useState(Math.ceil(data.length / dataLimit));
    const { currentPage, setCurrentPage } = useData()
    const classes = useStyles()
    const matches = useMediaQuery('(max-width: 600px)')

    const desktopStyle = {
        width: '100%',
        textAlign: 'right',
        paddingBottom: 10,
        position: 'relative',
        zIndex: 100000
    }

    const mobileStyle = {
        textAlign: 'left',
        padding: '10px 0',
        position: 'relative',
        zIndex: 100000
    }

    function goToNextPage() {
        setCurrentPage(page => page + 1);
    }

    function goToPreviousPage() {
        setCurrentPage(page => page - 1);
    }

    function changePage(event) {
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
    }

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        return new Array(pages).fill().map((_, idx) => start + idx + 1);
    };

    const PaginationButtons = () => {
        <Button
            onClick={goToPreviousPage}
            // className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
            disabled={currentPage === 1}
            variant="contained"
            color="primary"
            size="small"
        >
            prev
        </Button>

        {
            getPaginationGroup().map((item, index) => {
                return <Button
                    key={index}
                    onClick={changePage}
                    className={classes.groupBtn}
                    style={{ backgroundColor: item === currentPage ? '#eee' : 'inherit' }}
                    size="small"
                >
                    <span>{item}</span>
                </Button>
            })
        }

        <Button
            onClick={goToNextPage}
            // className={`next ${currentPage === pages ? 'disabled' : ''}`}
            disabled={currentPage >= pages}
            variant="contained"
            color="primary"
            size="small"
        >
            next
        </Button>
    }

    return (
        <Box style={!matches ? desktopStyle : mobileStyle}>
            <PaginationButtons />
        </Box>
    );
}

export default Pagination
