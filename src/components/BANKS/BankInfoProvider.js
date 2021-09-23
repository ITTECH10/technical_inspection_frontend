class BankInfoProvider {
    constructor() {
        this.banks = [
            {
                bankId: 1,
                bankName: 'Munich Bank',
                bankTranslationKey: "MUNICH_BANK_TYPE_1"
            },
            {
                bankId: 2,
                bankName: 'Dortmund Bank',
                bankTranslationKey: "DORTMUND_BANK_TYPE_2"
            },
            {
                bankId: 3,
                bankName: 'Berlin Bank',
                bankTranslationKey: "BERLIN_BANK_TYPE_3"
            },
        ]
    }

    getBankNames() {
        return this.banks
    }
}

const bankInfoProvider = new BankInfoProvider()

export default bankInfoProvider