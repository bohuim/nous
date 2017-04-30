import React from 'react'
import ReactDOM from 'react-dom' 
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Cookies from 'js-cookie'
import PubNub from 'pubnub'

import 'styles/App'
import AppBar         from '~/AppBar'
import HomePage       from '~/pages/home/HomePage'
import SetupPage      from '~/pages/setup/SetupPage'
import InterviewPage  from '~/pages/interview/InterviewPage'
import SubmitPage     from '~/pages/submit/SubmitPage'

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {profile: null}
  }

  componentDidMount() {
    window.onAmazonLoginReady = () => { 
      amazon.Login.setClientId('amzn1.application-oa2-client.719fc6d00eeb472398cf7aadc73cf21d') 
      amazon.Login.setUseCookie(true)
    }
    require('./amazon-login')

    const token = Cookies.get('amazon_Login_accessToken')
    if (token)
      this.getProfile(token)
  }

  render() {
    return (
      <Router>
        <div className='App'>
          <AppBar login   = {() => this.login()} 
                  logout  = {() => this.logout()}
                  profile = {this.state.profile} />

          <Route exact path='/'     component={HomePage}      />
          <Route path='/setup'      component={SetupPage}     />
          <Route path='/interview'  component={InterviewPage} />
          <Route path='/submit'     component={SubmitPage}    />
        </div>
      </Router>
    )
  }

  login() {
    amazon.Login.authorize({scope: 'profile'}, (response) => {
      if (response.error)
        return console.log('Error while getting user access token: ', response.error)

      this.getProfile(response.access_token)
    })
  }

  logout() {
    amazon.Login.logout()
    this.setState({profile: null})
  }

  getProfile(token) {
    amazon.Login.retrieveProfile(token, (response) => {
      if (response.error)
        return console.log('Error while getting user profile: ', response.error)

      console.log(response.profile)
      this.setState({profile: response.profile})
    })
  }
}

ReactDOM.render(<App />, document.getElementById('react'))
