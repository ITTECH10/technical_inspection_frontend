import React from 'react'
import FloatingButton from './FloatingButton'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { Box } from '@material-ui/core';

const ScrollToTopButton = () => {
    // INITIAL FUNCTION
    // const scrollToTop = () => {
    //     window.scrollTo({ behavior: 'smooth', top: '0px' })
    // }

    const scrollElRef = React.useRef()

    //CONSIDER REPLACING
    //IMPLEMENTED BECAUSE SMOOTH SCROLL NOT WORKING ON INITIAL FUNCTION
    function SmoothVerticalScrolling(e, time, where) {
        var eTop = e.getBoundingClientRect().top;
        var eAmt = eTop / 100;
        var curTime = 0;
        while (curTime <= time) {
            window.setTimeout(SVS_B, curTime, eAmt, where);
            curTime += time / 100;
        }
    }

    function SVS_B(eAmt, where) {
        if (where == "center" || where == "")
            window.scrollBy(0, eAmt / 2);
        if (where == "top")
            window.scrollBy(0, eAmt);
    }

    return (
        <>
            <Box ref={scrollElRef} style={{ position: 'absolute', top: -57, height: 0, width: 0 }}></Box>
            <FloatingButton bottom={0} onHandleClick={() => SmoothVerticalScrolling(scrollElRef.current, 275, 'top')}>
                <ArrowDropUpIcon />
            </FloatingButton>
        </>
    )
}

export default ScrollToTopButton
