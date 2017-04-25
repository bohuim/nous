import React from 'react'
import { Link, NavLink } from 'react-router-dom'

import 'styles/AppBar'

export default
class AppBar extends React.Component {
  render() {
    return (
      <div className='AppBar'>
        <NavLink to='/' exact={true} activeClassName='active' className='home'>
          <p>Nous</p>
        </NavLink>

        <NavLink to='/setup' activeClassName='active'>
          <p>Start Interview</p>
        </NavLink>
        <NavLink to='/interview' activeClassName='active'>
          <p>Interview</p>
        </NavLink>
        <NavLink to='/submit' activeClassName='active'>
          <p>Submit Questions</p>
        </NavLink>

        <a className='login' onClick={() => this.auth()}></a>
      </div>
    )
  }

  auth() {
    amazon.Login.authorize({scope: 'profile'}, this.props.authHandler)
  }
}
