import React from 'react'
import { render } from '@testing-library/react'
import App from './App'
import { User } from './context'
import { userMock, userMockConnected } from '../__mocks__/user-mock'

describe('App', () => {
    it('should be able to run tests', () => {
        expect(1 + 2).toEqual(3)
    })

    // This tests are failing due an error in the way the versions are being grabbed in the sdk. We should unify that to be sure that everything run properly.
    xit('renders without crashing', () => {
        const { container } = render(
            <User.Provider value={userMockConnected}>
                <App />
            </User.Provider>
        )
        expect(container.firstChild).toBeInTheDocument()
    })

    xit('renders loading state', () => {
        const { container } = render(
            <User.Provider value={{ ...userMock, isLoading: true }}>
                <App />
            </User.Provider>
        )
        expect(container.querySelector('.spinner')).toBeInTheDocument()
    })
})
