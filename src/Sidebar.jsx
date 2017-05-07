import React from 'react'
import { Link, NavLink } from 'react-router-dom'

import 'styles/Sidebar'

export default
class Sidebar extends React.Component {
  render() {
    return (
      <div className='Sidebar'>
        <div className='logo'>nous</div>
        <ul>
          <NavLink to='/' exact={true} activeClassName='active'>
            <li>
              <i className='material-icons'>dashboard</i>
              <label>Browse</label>
            </li>
          </NavLink>
          <NavLink to='/setup' exact={true} activeClassName='active'>
            <li>
              <i className='material-icons'>shopping_cart</i>
              <label>Cart</label>
            </li>
          </NavLink>
          <NavLink to='/submit' exact={true} activeClassName='active'>
            <li>
              <i className='material-icons'>add</i>
              <label>Submit Questions</label>
            </li>
          </NavLink>
        </ul>
      </div>
    )
  }
}
