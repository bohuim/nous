import React from 'react'
import { padStart } from 'lodash'

import 'styles/InterviewPage'

class InterviewPage extends React.Component {
  render() {
    let questions = this.props.location.state.selectedQuestions
    let minThis = Math.floor(this.state.currentTime / 60)
    let secThis = padStart((this.state.currentTime % 60).toString(), 2, '0')
    let minTotal = Math.floor(this.state.totalTime / 60)
    let secTotal = padStart((this.state.totalTime % 60).toString(), 2, '0')
    let nextButton = this.state.question >= questions.length ? 'Done' : 'Next'
    return (
      <div className='InterviewPage page'>
        <h3>Question {this.state.question} / {questions.length}</h3>
        <h1>
          {questions[this.state.question - 1]}
        </h1>
        <div className='timer'>
          <h4>THIS QUESTION</h4>
          <h2>{minThis}:{secThis} / {minTotal}:{secTotal}</h2>
          <h4>TOTAL</h4>
        </div>
        <button onClick={ e => this.nextQuestion(e) }>{nextButton}</button>
      </div>
    )
  }

  constructor(props) {
    super(props)
    this.state = {
      question : 1,
      currentTime : 0,
      totalTime : 0
    }
  }

  componentDidMount() {
    this.interval = setInterval(function() {
      this.setState({
        currentTime : this.state.currentTime + 1,
        totalTime : this.state.totalTime + 1
      })
    }.bind(this), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  nextQuestion(event) {
    if (this.state.question >= this.props.location.state.selectedQuestions.length) {
      this.props.history.push('/')
    } else {
      this.setState({
        question : this.state.question + 1,
        currentTime : 0})
    }
  }

}

export default InterviewPage
