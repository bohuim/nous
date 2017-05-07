import React from 'react'
import { Redirect } from 'react-router-dom'

import './Login.scss'

export default
class Login extends React.Component {
  render() {
    return (
      <div styleName='container'>
        <div styleName='col'>
          <h1 styleName='title'>nous</h1>
          <p  styleName='label'>personal mock interviews</p>
        </div>

        <div styleName='col'>
          <a styleName='login' onClick={this.props.callback}>Login with Amazon</a>
        </div>
      </div>
    )
  }
}
