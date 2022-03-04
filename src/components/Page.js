import { useData } from '../contexts/DataContext'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { forwardRef } from 'react';
// material
import { Box } from '@material-ui/core';
import Alert from './Alert'
import Loader from '../utils/Loader'

// ----------------------------------------------------------------------

const Page = forwardRef(({ children, title = '', ...other }, ref) => {
    const { appLoading, logedInPacient, authenticated } = useData()
    const history = useHistory()

    //   useEffect(() => {
    //     if (authenticated && (logedInPacient && !logedInPacient.policiesAccepted)) {
    //       navigate('/datenshutz')
    //     }
    //   }, [authenticated, logedInPacient])

    return (
        !appLoading ?
            <Box ref={ref} {...other}>
                <Alert />
                <Helmet>
                    <title>{title}</title>
                </Helmet>
                {children}
            </Box> : <Loader />
    )
})

Page.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string
};

export default Page;