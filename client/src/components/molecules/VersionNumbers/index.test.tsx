import React from 'react'
import { render } from '@testing-library/react'
import mockAxios from 'jest-mock-axios'
import { StateMock } from '@react-mock/state'
import VersionNumbers from '.'

import { User } from '../../../context'
import { userMockConnected } from '../../../../__mocks__/user-mock'

afterEach(() => {
    mockAxios.reset()
})

const stateMockIncomplete = {
    marketplace: {
        name: 'Marketplace',
        version: undefined
    },
    sdk: {
        name: 'sdk-js',
        version: undefined
    },
    metadata: {
        name: 'Metadata',
        version: undefined
    },
    gateway: {
        name: 'Gateway',
        version: undefined,
        contracts: undefined,
        network: undefined,
        keeperVersion: undefined,
        keeperUrl: undefined
    },
    faucet: {
        name: 'Faucet',
        version: undefined,
        network: undefined
    },
    status: {
        ok: false,
        network: false,
        contracts: false
    }
}

const mockResponse = {
    data: {
        software: 'Faucet',
        version: '6.6.6',
        network: 'Rinkeby'
    }
}

const mockResponseFaulty = {
    status: 404,
    statusText: 'Not Found',
    data: {}
}

describe('VersionNumbers', () => {
    xit('renders without crashing', () => {
        const { container, rerender } = render(
            <User.Provider value={userMockConnected}>
                <VersionNumbers account="0x00000" />
            </User.Provider>
        )
        mockAxios.mockResponse(mockResponse)
        expect(mockAxios.get).toHaveBeenCalled()
        expect(container.firstChild).toBeInTheDocument()

        rerender(
            <User.Provider value={userMockConnected}>
                <VersionNumbers account="0x99999" />
            </User.Provider>
        )
        mockAxios.mockResponse(mockResponse)
        expect(mockAxios.get).toHaveBeenCalled()
    })

    xit('renders without proper component response', () => {
        const { container } = render(
            <User.Provider value={userMockConnected}>
                <StateMock state={stateMockIncomplete}>
                    <VersionNumbers account="0x00000" />
                </StateMock>
            </User.Provider>
        )
        mockAxios.mockResponse(mockResponseFaulty)
        expect(mockAxios.get).toHaveBeenCalled()
        expect(container.querySelector('table')).toHaveTextContent(
            'Could not get version'
        )
    })
})
