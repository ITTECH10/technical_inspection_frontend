class DocumentCategoryProvider {
    constructor() {
        this.FILE_CATEGORIES = [
            {
                name: 'DocumentCategoryNameVertrag',
                noResults: 'DocumentCategoryKeinVertrag',
                icon: '',
                categoryId: "DOCUMENT_TYPE_VERTRAG"
            },
            {
                name: 'DocumentCategoryNameFahrzeugschein',
                noResults: 'DocumentCategoryKeinFahrzeugschein',
                icon: '',
                categoryId: "DOCUMENT_TYPE_FAHRZEUGSCHEIN"
            },
            {
                name: 'DocumentCategoryNameSchaeden',
                noResults: 'DocumentCategoryKeinSchaeden',
                icon: '',
                categoryId: "DOCUMENT_TYPE_SCHADEN"
            },
            {
                name: 'DocumentCategoryNameRechnungen',
                noResults: 'DocumentCategoryKeinRechnungen',
                icon: '',
                categoryId: "DOCUMENT_TYPE_RECHNUNG"
            },
            {
                name: 'DocumentCategoryNameSonstiges',
                noResults: 'DocumentCategoryKeinSonstiges',
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