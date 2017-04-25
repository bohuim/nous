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
    const token = localStorage.getItem('token')
    const expires = localStorage.getItem('token_expires')
    const now = Math.floor(Date.now() / 1000)

    if (token && expires && now < expires) {
      // token is ready fetch profile and set it.
      // this.setState({profile: fetched_profiled})
      // Depending on profile state, AppBar should render profile or login button.
      return
    }

    // Otherwise import the amazon login module.
    window.onAmazonLoginReady = () => { amazon.Login.setClientId('amzn1.application-oa2-client.719fc6d00eeb472398cf7aadc73cf21d') }
    require('./amazon-login')

    this.setState({profile: null})
  }

  authHandler = (response) => {
    if (response.error) {
      console.log(`Error while getting user access token: ${response.error}`)
      return
    }

    const token = response.access_token
    localStorage.setItem('token', token)

    const expires = Math.floor(Date.now() / 1000) + parseInt(response.expires_in)
    localStorage.setItem('token_expires', String(expires))

    amazon.Login.retrieveProfile(token, (data) => {
      if (data.error) {
        console.log(`Error while getting user access token ${data.error}`)
        return
      }

      const profile = data.profile
      console.log(profile)
      // PROFILE AVAILABLE HERE
    })
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
