import React from 'react'
import PubNub from 'pubnub'
import './App.css'


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
            <div className="App">
                <p>Connect status: {this.state.isConnected}</p>
            </div>
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
