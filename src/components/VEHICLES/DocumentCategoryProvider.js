class DocumentCategoryProvider {
    constructor() {
        this.FILE_CATEGORIES = [
            {
                name: 'DocumentCategoryNameVertrag',
                icon: '',
                categoryId: "DOCUMENT_TYPE_VERTRAG"
            },
            {
                name: 'DocumentCategoryNameFahrzeugschein',
                icon: '',
                categoryId: "DOCUMENT_TYPE_FAHRZEUGSCHEIN"
            },
            {
                name: 'DocumentCategoryNameSchaeden',
                icon: '',
                categoryId: "DOCUMENT_TYPE_SCHADEN"
            },
            {
                name: 'DocumentCategoryNameRechnungen',
                icon: '',
                categoryId: "DOCUMENT_TYPE_RECHNUNG"
            },
            {
                name: 'DocumentCategoryNameSonstiges',
                icon: '',
                categoryId: "DOCUMENT_TYPE_SONSTIGES"
            }
        ]
    }

    getDocumentCategories() {
        return this.FILE_CATEGORIES
    }
}

const documentCategories = new DocumentCategoryProvider()

export default documentCategories