import React from 'react'
import { Box } from '@material-ui/core'
import { useData } from '../../contexts/DataContext'
import InsurancePaymentDialog from './InsurancePaymentDialog'

const InsurancePaymentVariants = () => {
    const { selectedCar, getCorespondingInsurance, setSelectedCarInsurance, user } = useData()
    const { insuranceHouse } = selectedCar

    React.useEffect(() => {
        if (selectedCar && insuranceHouse) {
            getCorespondingInsurance(insuranceHouse)
        } else {
            setSelectedCarInsurance({})
        }
    }, [getCorespondingInsurance, selectedCar, setSelectedCarInsurance, insuranceHouse])

    return (
        user.role === 'admin' &&
        <Box>
            <InsurancePaymentDialog />
        </Box>
    )
}

export default InsurancePaymentVariants
