import React from 'react'
import { NavLink } from 'react-router-dom'
import request from 'superagent'
import { groupBy, map, without } from 'lodash'
import Pubnub from '~/penguin'

import 'styles/HomePage'

class HomePage extends React.Component {
  render() {
    // yes, i probably should've done this with more components, sue me.
    let content = ''
    if (this.state.activeCategory) {
      content = map(this.state.categories[this.state.activeCategory], function(question) {
        let questionClass = 'question'
        let icon = 'add'
        if (this.state.selectedQuestions.includes(question.Content)) {
          questionClass += ' selected'
          icon = 'done'
        }
        return (
          <div className={questionClass} key={question.Content} onClick={e => this.selectQuestion(e, question.Content)}>
            <i className='material-icons'>{icon}</i>
            <p>{question.Content}</p>
            <div className='tagbar'>
              <h4>Tagged</h4> #{question.Category}
            </div>
          </div>
        )
      }.bind(this))

    } else if (this.state.categories) {
      content = map(this.state.categories, function(questions, category) {
        return (
          <div className='category' key={category} onClick={e => this.loadCategory(e, category)}>
            <i className='material-icons'>add</i>
            <h3>#{category}</h3>
            <h4>{questions.length} questions</h4>
          </div>
        )
      }.bind(this))
    }
    let toolbar = ''
    if (this.state.categories && (this.state.activeCategory || this.state.selectedQuestions.length > 0)) {
      toolbar = (
        <div className='toolbar' key='toolbar'>
          {this.state.activeCategory ?
          <button className='left' onClick={e => this.goBack(e)}>Back</button> : '' }
          <button className='left' onClick={e => this.resetSelections(e)}>Reset</button>
          <button className='right' onClick={e => this.goInterview(e)}>Done ({this.state.selectedQuestions.length} selected)</button>
        </div>)
    }

    return (
      <div className='HomePage page'>
        <NavLink to='/submit'>
          <button className='submit-button'>
            <i className='material-icons'>add</i>
            Submit Questions
          </button>
        </NavLink>
        <i className='material-icons search-icon'>search</i>
        <input
          placeholder="Search..."
          value={this.state.search}
          onChange={e => this.setState({ search : e.target.value })}/>
        {content}
        {toolbar}
      </div>
    )
  }

  constructor(props) {
    super(props)
    this.state = {
      categories : [],
      activeCategory : '',
      search : '',
      selectedQuestions : []
    }
  }

  componentDidMount() {
    request
      .get('https://x84ch6vh51.execute-api.us-east-1.amazonaws.com/prod/InterviewUpdate?TableName=InterviewDB')
      .end(function(err, res) {
        if (res.body) {
          this.setState({ categories : groupBy(res.body.Items, 'Category') })
        }
      }.bind(this))
  }

  loadCategory(event, category, questions) {
    this.setState({
      activeCategory : category,
      search : '#' + category.toLowerCase() })
  }

  resetSelections(event) {
    this.setState({
      selectedQuestions : []
    })
  }

  goBack(event) {
    this.setState({
      activeCategory : '',
      search : ''
    })
  }

  goInterview(event) {
    if (this.state.selectedQuestions.length == 0) {
      alert("please add at least one question before starting interview!");
      return;
    }
    this.props.history.push('/interview', { selectedQuestions : this.state.selectedQuestions })
    Pubnub.publish({
      'channels': ['nous'], 
      'message' : {
        'event': 'setup',
        'questions': this.state.selectedQuestions
      }}, 
      function(status, error) {
        console.log(status)
        console.log(error)
    })
  }

  selectQuestion(event, question) {
    if (this.state.selectedQuestions.includes(question)) {
      this.setState({ selectedQuestions : without(this.state.selectedQuestions, question)})
    } else {
      this.setState({ selectedQuestions : this.state.selectedQuestions.concat(question) })
    }
  }
}

export default HomePage
