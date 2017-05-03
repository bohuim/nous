import React from 'react'
import { map } from 'lodash'

import 'styles/SetupPage'
import AppBar from '~/AppBar'

class SetupPage extends React.Component {
  render() {
    return (
      <div className='content'>
        <AppBar header='Shopping Cart'
          authHandler={this.props.authHandler} />
        <div className='SetupPage page'>
          <h3>Selected Questions</h3>
          <ul>
            {map(this.props.selectedQuestions, function(question) {
              return (
                <li>{question}</li>
              )
            })}
          </ul>
          <p>add random question</p>
          <p>randomize</p>
          <button onClick={e => this.startInterview(e)}>Start Interview</button>
        </div>
      </div>
    )
  }

  startInterview(event) {
    this.props.history.push('/interview', { selectedQuestions : this.props.selectedQuestions })
  }
}

export default SetupPage
