import React from 'react'
import Cookies from 'js-cookie'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

// components
import Login        from '~/pages/Login'
import AppBar        from '~/components/AppBar'
import SideBar       from '~/components/SideBar'
import HomePage      from '~/pages/home/HomePage'
import SetupPage     from '~/pages/setup/SetupPage'
import InterviewPage from '~/pages/interview/InterviewPage'
import SubmitPage    from '~/pages/submit/SubmitPage'

// styles
import './App.scss'

// this is a very cheap way to deal with the appbar - hopefully it'll get fixed later?
// but right now i don't feel like dealing with react-router to get text to show up.
class App extends React.Component {
  render() {
    return (
      <Router>
      <div styleName='app'>
        {this.state.user ? null : <Redirect to='/login' />}
        <Switch>
          <Route path='/login' render={() => this.state.user ? <Redirect to='/browse' /> : <Login callback={this.login} />} />
          <Route path='/browse' render={() => <div>browse</div>} />
        </Switch>
      </div>
      </Router>
    )
  }

  constructor(props) {
    super(props)

    this.login = this.login.bind(this)
    this.logout = this.login.bind(this)
    this.fetchProfile = this.fetchProfile.bind(this)

    this.state = {
      user: null,
      selectedQuestions : []
    }
  }

  componentDidMount() {
    window.onAmazonLoginReady = () => { 
      amazon.Login.setClientId('amzn1.application-oa2-client.719fc6d00eeb472398cf7aadc73cf21d') 
      amazon.Login.setUseCookie(true)
    }
    require('./utils/amazon-login')
    
    const token = Cookies.get('amazon_Login_accessToken')
    if (token)
      this.fetchProfile(token)
  }

  updateQuestions = (questions) => {
    this.setState({ selectedQuestions : questions })
  }

  login() {
    const options = {
      popup: true,
      scope: 'profile'
    }
    amazon.Login.authorize(options, (response) => {
      if (response.error)
        return console.log('Error while getting user access token: ', response.error)

      this.fetchProfile(response.access_token)
    })
  }

  logout() {
    amazon.Login.logout()
    this.setState({user: null})
  }

  fetchProfile(token) {
    amazon.Login.retrieveProfile(token, (response) => {
      if (response.error)
        return console.log('Error while getting user profile: ', response.error)

      const user = {
          aaid: response.profile.CustomerId,
          name: response.profile.Name,
          email: response.profile.PrimaryEmail
      }
      console.log('user: ', user)
      this.setState({user: user})
    })
  }
}

module.exports = App
