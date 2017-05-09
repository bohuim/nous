import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import AuthManager from '~/utils/auth.js'

// components
import Login     from '~/pages/Login'
import Dashboard from '~/pages/Dashboard'

// styles
import './App.scss'

export default
class App extends React.Component {
  render() {
    // Show empty div (temporary) until async is ready.
    return !this.state.ready ? (<div></div>) :
    (
      <Router>
      <div styleName='app'>
        {this.state.user ? null : <Redirect to='/login' />}

        <Switch>
          <Route path='/login' render={() => this.state.user ? <Redirect to='/browse' /> : <Login />} />
          <Route path='/' exact render={() => <Redirect to='/browse' />} />
          <Route render={(props) => <Dashboard {...props} />} />
        </Switch>
      </div>
      </Router>
    )
  }

  constructor(props) {
    super(props)

    this.state = {
      ready: false
      // selectedQuestions : []
    }

    window.auth = null
    window.user = null
  }

  componentDidMount() {
    window.auth = new AuthManager(this)
  }

  didLogin(user) {
    console.log('App.didLogin\n\nuser:', user)

    window.user = user
    this.setState({user: user, ready: true})
  }

  didLogout() {
    console.log('App.didLogout')

    window.user = null
    this.setState({user: null})
  }
}
