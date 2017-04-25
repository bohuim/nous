import React from 'react'
import request from 'superagent'
import { groupBy, map, without } from 'lodash'

import 'styles/HomePage'

class HomePage extends React.Component {
  render() {
    // yes, i probably should've done this with more components, sue me.
    let content = ''
    if (this.state.activeCategory) {
      content = map(this.state.categories[this.state.activeCategory], function(question) {
        let questionClass = 'question'
        if (this.state.selectedQuestions.includes(question.Content)) {
          questionClass += ' selected'
        }
        return (
          <div className={questionClass} key={question.Content} onClick={e => this.selectQuestion(e, question.Content)}>
            <p>{question.Content}</p>
          </div>
        )
      }.bind(this))
      content.push(
        <div className='toolbar' key='toolbar'>
          <button className='left' onClick={e => this.goBack(e)}>Back</button>
          <button className='right' onClick={e => this.goInterview(e)}>Done ({this.state.selectedQuestions.length} selected)</button>
        </div>)

    } else if (this.state.categories) {
      content = map(this.state.categories, function(questions, category) {
        return (
          <div className='category' key={category} onClick={e => this.loadCategory(e, category)}>
            <h3>#{category}</h3>
            <h4>{questions.length} questions</h4>
          </div>
        )
      }.bind(this))
    }
    return (
      <div className='HomePage page'>
        <input
          placeholder="search..."
          value={this.state.search}
          onChange={e => this.setState({ search : e.target.value })}/>
        {content}
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

  goBack(event) {
    this.setState({
      activeCategory : '',
      search : ''
    })
  }

  goInterview(event) {
    this.props.history.push('/setup', { selectedQuestions : this.state.selectedQuestions })
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
