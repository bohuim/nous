import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import PubNub from 'pubnub'

import './App.css'
import HomePage from './pages/home/HomePage'
import SubmitPage from './pages/submit/SubmitPage'

class App extends React.Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            isConnected: 'waiting...'
        }

        this.pubnub = new PubNub({
            publishKey: 'pub-c-8fd5e639-8131-4b76-867c-c38d0c1d15fc',
            subscribeKey: 'sub-c-7eaa1852-2563-11e7-bb8a-0619f8945a4f'
        })
    }

    componentDidMount()
    {
        this.pubnub.addListener({
            message: this.messageHandler,
            status: this.connectHandler
        })

        this.pubnub.subscribe({
            channels: ['nous-alexa']
        })
    }

    render()
    {
        return (
            <Router className='router'>
                <div>
                    {/* NAVBAR HERE */}
                    <Route exact path='/' component={HomePage} />
                    <Route exact path='/submit' component={SubmitPage} />
                </div>
            </Router>
        )
    }


    // --------------------
    // PubNub
    // --------------------
    connectHandler = (event) =>
    {
        const category = event.category
        if (category === 'PNUnknownStatus')
        {
            this.setState({isConnected: 'error on subscription'})
            return
        }

        this.setState({isConnected: 'subscribed!'})
        return  
    };

    messageHandler = (message) =>
    {
        console.log(message)
    };
}

export default App
