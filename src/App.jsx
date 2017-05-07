import React from 'react'
import Cookies from 'js-cookie'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// components
import AppBar        from '~/components/AppBar'
import Sidebar       from '~/components/SideBar'
import HomePage      from '~/pages/home/HomePage'
import SetupPage     from '~/pages/setup/SetupPage'
import InterviewPage from '~/pages/interview/InterviewPage'
import SubmitPage    from '~/pages/submit/SubmitPage'

// styles
import './App.scss'

// this is a very cheap way to deal with the appbar - hopefully it'll get fixed later?
// but right now i don't feel like dealing with react-router to get text to show up.
class App extends React.Component {

  componentDidMount() {
    window.onAmazonLoginReady = () => { 
      amazon.Login.setClientId('amzn1.application-oa2-client.719fc6d00eeb472398cf7aadc73cf21d') 
      amazon.Login.setUseCookie(true)
    }
    require('./utils/amazon-login')

    const token = Cookies.get('amazon_Login_accessToken')
    if (token)
      this.getProfile(token)
  }

  render() {
    return (
      <Router>
        <div className='App'>
          <Sidebar />
          <Route exact path='/' render={(props) =>
            <HomePage authHandler={this.authHandler}
              selectedQuestions={this.state.selectedQuestions}
              updateQuestions={this.updateQuestions}
              {...props} />} />
          <Route path='/setup' render={(props) =>
            <SetupPage authHandler={this.authHandler}
              selectedQuestions={this.state.selectedQuestions}
              updateQuestions={this.updateQuestions}
              {...props} />} />
          <Route path='/interview' render={(props) =>
            <InterviewPage authHandler={this.authHandler}
              selectedQuestions={this.state.selectedQuestions}
              {...props} />} />
          <Route path='/submit' render={(props) =>
            <SubmitPage authHandler={this.authHandler}
              {...props} />} />
        </div>
      </Router>
    )
  }

  constructor(props) {
    super(props)
    this.state = {
      profile: null,
      selectedQuestions : []
    }
  }

  updateQuestions = (questions) => {
    this.setState({ selectedQuestions : questions })
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

module.exports = App
