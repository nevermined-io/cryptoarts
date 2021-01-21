import React from 'react'
import { render } from '@testing-library/react'
import { VersionTableContracts } from './VersionTable'

describe('VersionTableContracts', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <VersionTableContracts
                contracts={{ hello: 'hello', hello2: 'hello2' }}
                network="nile"
                keeperVersion="6.6.6"
            />
        )
        expect(container.firstChild).toBeInTheDocument()
    })

    xit('renders correct explorer links', () => {
        const { container, rerender } = render(
            <VersionTableContracts
                contracts={{ hello: 'hello', hello2: 'hello2' }}
                network="rinkeby"
                keeperVersion="0.6.1"
            />
        )
        expect(container.querySelector('tr:last-child a').href).toMatch(
            /explorer.rinkeby.nevermined/
        )

        rerender(
            <VersionTableContracts
                contracts={{ hello: 'hello', hello2: 'hello2' }}
                network="integration"
                keeperVersion="0.6.1"
            />
        )
        expect(container.querySelector('tr:last-child a').href).toMatch(
            /explorer.integration.nevermined/
        )

        rerender(
            <VersionTableContracts
                contracts={{ hello: 'hello', hello2: 'hello2' }}
                network="rinkeby"
                keeperVersion="0.6.1"
            />
        )
        expect(container.querySelector('tr:last-child a').href).toMatch(
            /explorer.nevermined/
        )
    })
})
