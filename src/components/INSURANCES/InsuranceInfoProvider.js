class InsuranceInfoProvider {
    constructor() {
        this.insurances = [
            {
                insuranceId: 1,
                insuranceName: 'Munich Insurance',
                insuranceTranslationKey: 'MUNICH_INSURANCE_TYPE_1'
            },
            {
                insuranceId: 2,
                insuranceName: 'Dortmund Insurance',
                insuranceTranslationKey: 'DORTMUND_INSURANCE_TYPE_2'
            },
            {
                insuranceId: 3,
                insuranceName: 'Berlin Insurance',
                insuranceTranslationKey: 'BERLIN_INSURANCE_TYPE_3'
            }
        ]
    }

    getInsuranceNames() {
        return this.insurances
    }
}

const insuranceInfoProvider = new InsuranceInfoProvider()

export default insuranceInfoProvider