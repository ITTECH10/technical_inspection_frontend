import React, {useState} from 'react'
import UserDetailsInformation from '../components/UI/Users/UserDetailsInformation'
import NewUserCreation from './../components/UI/NewUserCreation'
import Alerts from '../components/UI/Alerts'

const HomeUser = (props) => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <UserDetailsInformation location={props.location} />
            <NewUserCreation handleAlertOpening={setOpen} />
            <Alerts open={open} handleOpening={setOpen} message="User successfuly created!" />
        </>
    )
}

export default HomeUser
