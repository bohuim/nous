import React from 'react'
import { map } from 'lodash'

import 'styles/SetupPage'

class SetupPage extends React.Component {
  render() {
    return (
      <div className='SetupPage page'>
        <h3>Selected Questions</h3>
        <ul>
          {map(this.props.location.state.selectedQuestions, function(question) {
            return (
              <li>{question}</li>
            )
          })}
        </ul>
        <p>add random question</p>
        <p>randomize</p>
        <button onClick={e => this.startInterview(e)}>Start Interview</button>
      </div>
    )
  }

  startInterview(event) {
    this.props.history.push('/interview', { selectedQuestions : this.props.location.state.selectedQuestions })
  }
}

export default SetupPage
