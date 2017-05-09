import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import PubNub  from '~/utils/pubnub'
import AppBar  from '~/components/AppBar'
import SideBar from '~/components/SideBar'

import BrowsePage from '~/pages/browse/BrowsePage'

// style
import './Dashboard.scss'

export default
class Dashboard extends React.Component
{
    constructor(props)
    {
        super(props)
        this.pubnub = new PubNub()
    }

    componentWillMount()
    {
        const user = window.user
        if (!user)
            return

        this.pubnub.addListener({message: this.messageHandler.bind(this)})
        this.pubnub.subscribe({channels: [user.aaid]})
    }

    render()
    {
        const user = window.user

        return !user ? <Redirect to='/login' /> :
        (
            <div styleName='dashboard'>
                <div styleName='side'><SideBar /></div>

                <div styleName='main'>
                    <div styleName='appbar'><AppBar /></div>

                    <Switch>
                        <Route path='/browse/:category?' render={props => <BrowsePage {...props} />} />
                        <Route path='/cart' render={() => <div>cart</div>} />
                        <Route path='/sessions' render={() => <div>sessions</div>} />
                        <Route path='/submit' render={() => <div>submit</div>} />
                        <Route path='*' render={() => <Redirect to='/browse' />}/>
                    </Switch>
                </div>
            </div>
        )
    }

    messageHandler(payload)
    {
        console.log('Received payload: ', payload)
    }
}
