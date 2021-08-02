import React from 'react'
import { CircularProgress } from '@material-ui/core'

const loaderStyle = {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

const Loader = () => {
    return (
        <div style={loaderStyle}>
            <CircularProgress color="primary" size={100} />
        </div>
    )
}

export default Loader
