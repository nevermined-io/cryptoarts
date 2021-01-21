import { MetaData } from '@nevermined-io/nevermined-sdk-js'

const AssetModel: MetaData = {
    // Metadata Attributes
    // https://docs.nevermined.io/architecture/specs/metadata/
    main: {
        type: 'dataset',
        name: '',
        dateCreated: '',
        author: '',
        license: '',
        price: '',
        files: []
    },
    additionalInformation: {
        description: '',
        copyrightHolder: '',
        categories: []
    }
}

export default AssetModel
