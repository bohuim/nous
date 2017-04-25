import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import PubNub from 'pubnub'

import 'styles/App'
import AppBar from '~/AppBar'
import HomePage from '~/pages/home/HomePage'
import SetupPage from '~/pages/setup/SetupPage'
import InterviewPage from '~/pages/interview/InterviewPage'
import SubmitPage from '~/pages/submit/SubmitPage'

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='App'>
          <AppBar authHandler={this.authHandler} />

          <Route exact path='/' component={HomePage} />
          <Route path='/setup' component={SetupPage} />
          <Route path='/interview' component={InterviewPage} />
          <Route path='/submit' component={SubmitPage} />
        </div>
      </Router>
    )
  }

  constructor(props) {
    super(props)
    this.state = {
      isConnected: 'waiting...'
    }
    this.pubnub = new PubNub({
      publishKey: 'pub-c-8fd5e639-8131-4b76-867c-c38d0c1d15fc',
      subscribeKey: 'sub-c-7eaa1852-2563-11e7-bb8a-0619f8945a4f'
    })
  }

  componentDidMount() {
    window.onAmazonLoginReady = () => { amazon.Login.setClientId('amzn1.application-oa2-client.719fc6d00eeb472398cf7aadc73cf21d') }
    require('./amazon-login')
  }

  authHandler = (response) => {
    if (response.error) {
      console.log(`Error while getting user profile: ${response.error}`)
      return
    }

    const token = response.access_token
    
  }

  // pubnub stuff
  connectHandler = (event) => {
    const category = event.category
    if (category === 'PNUnknownStatus') {
      this.setState({ isConnected: 'error on subscription' })
    } else {
      this.setState({ isConnected: 'subscribed!' })
    }
  }

  messageHandler = (message) => {
    console.log(message)
  }
}

ReactDOM.render(<App />, document.getElementById('react'))
