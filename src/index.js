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
          <AppBar />

          <Route exact path='/' component={HomePage} />
          <Route path='/setup' component={SetupPage} />
          <Route path='/interview' component={InterviewPage} />
          <Route path='/submit' component={SubmitPage} />
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('react'))
