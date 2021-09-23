class BankInfoProvider {
    constructor() {
        this.banks = [
            {
                bankName: 'Munich Bank',
                bankId: 1
            },
            {
                bankName: 'Dortmund Bank',
                bankId: 2
            },
            {
                bankName: 'Berlin Bank',
                bankId: 3
            },
        ]
    }

    getBankNames() {
        return this.banks
    }
}

const bankInfoProvider = new BankInfoProvider()

export default bankInfoProvider