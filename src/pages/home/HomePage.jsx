import React from 'react'
import { NavLink } from 'react-router-dom'
import request from 'superagent'
import { groupBy, map, without } from 'lodash'
import pubnub from '~/PubNubClient'

import 'styles/HomePage'
import AppBar from '~/AppBar'

class HomePage extends React.Component {
  render() {
    console.log(this)
    // yes, i probably should've done this with more components, sue me.
    let content = ''
    if (this.state.activeCategory) {
      content = map(this.state.categories[this.state.activeCategory], function(question) {
        let questionClass = 'question'
        let icon = 'add'
        if (this.props.selectedQuestions.includes(question.Content)) {
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
    if (this.state.categories && (this.state.activeCategory || this.props.selectedQuestions.length > 0)) {
      toolbar = (
        <div className='toolbar' key='toolbar'>
          {this.state.activeCategory ?
          <button className='left' onClick={e => this.goBack(e)}>Back</button> : '' }
          <button className='left' onClick={e => this.resetSelections(e)}>Reset</button>
          <button className='right' onClick={e => this.goInterview(e)}>Done ({this.props.selectedQuestions.length} selected)</button>
        </div>)
    }

    return (
      <div className='content'>
        <AppBar header='Browse Questions & Categories'
          authHandler={this.props.authHandler} />
        <div className='HomePage page'>
          <i className='material-icons search-icon'>search</i>
          <input
            placeholder="Search..."
            value={this.state.search}
            onChange={e => this.setState({ search : e.target.value })}/>
          {content}
          {toolbar}
        </div>
      </div>
    )
  }

  constructor(props) {
    super(props)
    this.state = {
      categories : [],
      activeCategory : '',
      search : ''
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
    this.props.updateQuestions([])
  }

  goBack(event) {
    this.setState({
      activeCategory : '',
      search : ''
    })
  }

  goInterview(event) {
    if (this.props.selectedQuestions.length == 0) {
      alert("please add at least one question before starting interview!");
      return;
    }

    this.props.history.push('/setup')
    pubnub.publish({
      channel: profile.aaid,
      message: {
        event: 'setup',
        questions: this.props.selectedQuestions
      }},
      function(status, error) {
        console.log(status)
        console.log(error)
    })
  }

  selectQuestion(event, question) {
    if (this.props.selectedQuestions.includes(question)) {
      this.props.updateQuestions(without(this.props.selectedQuestions, question))
    } else {
      this.props.updateQuestions(this.props.selectedQuestions.concat(question))
    }
  }
}

export default HomePage
