import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { showChannels } from './config'

import About from './routes/About'
import Home from './routes/Home'
import NotFound from './routes/NotFound'
import Publish from './routes/Publish/'
import NewPublish from './routes/NewPublish/'
import Search from './routes/Search'
import Faucet from './routes/Faucet'
import History from './routes/History'
import Channels from './routes/Channels'
import Styleguide from './routes/Styleguide'

import Asset from './components/templates/Asset'
import Channel from './components/templates/Channel'
import Profile from './routes/Profile'

const Routes = () => (
    <Switch>
        <Route component={Home} exact path="/" />
        <Route component={Styleguide} path="/styleguide" />
        <Route component={About} path="/about" />
        <Route component={Publish} path="/old-publish" />
        <Route component={NewPublish} path="/publish" />
        <Route component={Profile} path="/profile" />
        <Route component={Search} path="/search" />
        <Route component={Asset} path="/asset/:did" />
        <Route component={Faucet} path="/faucet" />
        <Route component={History} path="/history" />
        {showChannels && (
            <>
                <Route component={Channels} exact path="/channels" />
                <Route component={Channel} path="/channels/:channel" />
            </>
        )}
        <Route component={NotFound} />
    </Switch>
)

export default Routes
