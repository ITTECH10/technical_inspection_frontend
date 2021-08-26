import React from 'react';
import { Box, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useData } from '../contexts/DataContext';

const useStyles = makeStyles(theme => ({
    btnContainer: {
        width: '100%',
        textAlign: 'center',
        // position: 'fixed',
        padding: '10px 0',
        bottom: 25,
        // left: '50%',
        // transform: 'translate(-50%, 0)'
    },
    groupBtn: {
        margin: '0 5px'
    }
}))

function Pagination({ pageLimit }) {
    const { currentPage, setCurrentPage } = useData()
    const classes = useStyles()

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
        return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
    };

    const PaginationButtons = () => (
        <Box className={classes.btnContainer}>
            <Button
                onClick={goToPreviousPage}
                // className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
                disabled={currentPage === 1}
                variant="contained"
                color="primary"
            >
                prev
            </Button>

            {getPaginationGroup().map((item, index) => {
                console.log(item)
                return <Button
                    key={index}
                    onClick={changePage}
                    className={classes.groupBtn}
                    style={{ backgroundColor: item === currentPage ? '#ccc' : 'inherit' }}
                >
                    <span>{item}</span>
                </Button>
            })}

            <Button
                onClick={goToNextPage}
                // className={`next ${currentPage === pages ? 'disabled' : ''}`}
                // disabled={`next ${currentPage === pages ? 'disabled' : ''}`}
                variant="contained"
                color="primary"
            >
                next
            </Button>
        </Box>
    )

    return (
        <>
            <PaginationButtons />
        </>
    );
}

export default Pagination;
