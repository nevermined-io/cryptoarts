const sdkMock = {
    sdk : {
        accounts: {
            list: () => ['xxx', 'xxx']
        },
        metadata: {
            name: "metadata",
            version: "0.1.0",
            queryMetadata: () => {
                return {
                    results: [],
                    totalResults: 1,
                    totalPages: 1
                }
            }
        },
        assets: {
            query: () => {
                return {
                    results: [],
                    page: 1,
                    /* eslint-disable @typescript-eslint/camelcase */
                    total_pages: 1611,
                    total_results: 1611
                    /* eslint-enable @typescript-eslint/camelcase */
                }
            },
            resolve: jest.fn(),
            order: () => {
                return {
                    next: jest.fn()
                }
            },
            consume: jest.fn()
        },
        keeper: {
            conditions: {
                accessSecretStoreCondition: {
                    getGrantedDidByConsumer: () => {
                        return {
                            find: jest.fn()
                        }
                    }
                }
            }
        },
        versions: {
            get: jest.fn(() =>
                Promise.resolve({
                    sdk: {
                        name: 'sdk-js',
                        status: 'Working'
                    },
                    metatada: {
                        name: 'Metadata',
                        status: 'Working'
                    },
                    gateway: {
                        name: 'Gateway',
                        network: 'Nile',
                        status: 'Working',
                        contracts: {
                            hello: 'hello',
                            hello2: 'hello2'
                        }
                    },
                    status: {
                        ok: true,
                        network: true,
                        contracts: true
                    }
                })
            )
        }
    }
}

export default sdkMock
