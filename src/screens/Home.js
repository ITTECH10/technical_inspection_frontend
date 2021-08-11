import React, {useState} from 'react'
import UsersList from './../components/UI/Users/UsersList'
import NewUserCreation from './../components/UI/NewUserCreation'
import Alerts from '../components/UI/Alerts'

const Home = () => {
    const [open, setOpen] = useState(false)
    return (
        <>
            <UsersList />
            <NewUserCreation handleAlertOpening={setOpen} />
            <Alerts open={open} handleOpening={setOpen} message="User successfuly created!" />
        </>
    )
}

export default Home
