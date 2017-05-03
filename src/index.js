import React from 'react'
import ReactDOM from 'react-dom' 
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Cookies from 'js-cookie'
import PubNub from 'pubnub'
import createBrowserHistory from 'history/createBrowserHistory'

import 'styles/App'
import AppBar from '~/AppBar'
import Sidebar from '~/Sidebar'
import HomePage from '~/pages/home/HomePage'
import SetupPage from '~/pages/setup/SetupPage'
import InterviewPage from '~/pages/interview/InterviewPage'
import SubmitPage from '~/pages/submit/SubmitPage'

// this is a very cheap way to deal with the appbar - hopefully it'll get fixed later?
// but right now i don't feel like dealing with react-router to get text to show up.
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
    let browserHistory = createBrowserHistory()
    return (
      <Router history={browserHistory}>
        <div className='App'>
          <Sidebar />
          <Route exact path='/' render={() =>
            <HomePage authHandler={this.authHandler}
              selectedQuestions={this.state.selectedQuestions}
              updateQuestions={this.updateQuestions}
              history={browserHistory} />} />
          <Route path='/setup' render={() =>
            <SetupPage authHandler={this.authHandler}
              selectedQuestions={this.state.selectedQuestions}
              updateQuestions={this.updateQuestions}
              history={browserHistory} />} />
          <Route path='/interview' render={() =>
            <InterviewPage authHandler={this.authHandler}
              history={browserHistory} />} />
          <Route path='/submit' render={() =>
            <SubmitPage authHandler={this.authHandler}
              history={browserHistory} />} />
        </div>
      </Router>
    )
  }

  constructor(props) {
    super(props)
    this.state = {
      selectedQuestions : []
    }
  }

  updateQuestions = (questions) => {
    this.setState({ selectedQuestions : questions })
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

      const profile = {
          aaid: response.profile.CustomerId,
          name: response.profile.Name,
          email: response.profile.PrimaryEmail
      }
      console.log('profile: ', profile)
      this.setState({profile: profile})
    })
  }
}

ReactDOM.render(<App />, document.getElementById('react'))
