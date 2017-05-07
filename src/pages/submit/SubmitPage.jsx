import React from 'react'
import ReactDOM from 'react-dom'
import request from 'superagent'
import { Link, NavLink } from 'react-router-dom'

import 'styles/SubmitPage'
import QuestionForm from './QuestionForm'
import AppBar from '~/AppBar'

export default
class SubmitPage extends React.Component {
  render() {
    return (
      <div className='content'>
        <AppBar header='Submit New Questions'
          authHandler={this.props.authHandler} />
        <div className='SubmitPage page'>
          <h3>Submit New Questions</h3>
          <ul ref='formList' className='data'>
            {this.state.data.map((data, index) =>
              <QuestionForm
                key={data.key}
                index={index}
                updateHandler={this.update.bind(this)}
                removeHandler={this.remove.bind(this)} />
            )}
          </ul>

          <div className='toolbar'>
            <button onClick={() => this.add()} >Add another</button>
            <NavLink to='/'>
              <button>
                Back
              </button>
            </NavLink>
          <button onClick={() => this.submit()} >Submit</button>
          </div>
        </div>
      </div>
    )
  }

  constructor(props) {
    super(props)
    this.key = 1
    this.state = {
      data: [{ key: 0,
               question: '',
               categories: '' }]
    }
  }

  add() {
    this.setState(prev => ({
      data: prev.data.concat({
        key: this.key++,
        question: '',
        categories: ''
      })
    }))
  }

  remove(index) {
    const data = this.state.data
    if (data.length > 1) {
      data.splice(index, 1)
      this.setState({data: data})
    }
  }

  update(index, uid, val) {
    this.state.data[index][uid] = val
  }

  submit() {
    for (let i = 0; i < this.state.data.length; i++) {
      let data = {
        'TableName' : 'InterviewDB',
        'Item' : {
          'Content' : this.state.data[i]['question'],
          'Category' : this.state.data[i]['categories']
        }
      }
      data = JSON.stringify(data)
      request
        .post('https://x84ch6vh51.execute-api.us-east-1.amazonaws.com/prod/InterviewUpdate')
        .send(data)
        .end(function(err, res) {
          if (err || !res.ok) {
           console.log(err)
         } else {
           this.props.history.push('/')
         }
        }.bind(this))
    }
  }

}

// Helpers
const range = (n) => Array.from(Array(n).keys())
