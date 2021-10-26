class DocumentCategoryProvider {
    constructor() {
        this.FILE_CATEGORIES = [
            {
                categoryType: 'DocumentCategoryNameFahrzeugschein',
                noDocumentsInCategory: 'DocumentCategoryKeinFahrzeugschein',
                icon: '',
                categoryId: "DOCUMENT_TYPE_FAHRZEUGSCHEIN"
            },
            {
                categoryType: 'DocumentCategoryNameVertrag',
                noDocumentsInCategory: 'DocumentCategoryKeinVertrag',
                icon: '',
                categoryId: "DOCUMENT_TYPE_VERTRAG"
            },
            {
                categoryType: 'DocumentCategoryNameSchaeden',
                noDocumentsInCategory: 'DocumentCategoryKeinSchaeden',
                icon: '',
                categoryId: "DOCUMENT_TYPE_SCHADEN"
            },
            {
                categoryType: 'DocumentCategoryNameRechnungen',
                noDocumentsInCategory: 'DocumentCategoryKeinRechnungen',
                icon: '',
                categoryId: "DOCUMENT_TYPE_RECHNUNG"
            },
            {
                categoryType: 'DocumentCategoryNameSonstiges',
                noDocumentsInCategory: 'DocumentCategoryKeinSonstiges',
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