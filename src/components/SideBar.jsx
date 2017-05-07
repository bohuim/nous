import React from 'react'
import { Link, NavLink } from 'react-router-dom'

// styles
import './SideBar.scss'

const items =
[
  {
    path: '/',
    icon: 'dashboard',
    text: 'Browse',
  },
  {
    path: '/setup',
    icon: 'shopping_cart',
    text: 'Cart',
  },
  {
    path: '/sessions',
    icon: 'list',
    text: 'Previous Sessions',
  },
  {
    path: '/submit',
    icon: 'add',
    text: 'Submit Questions',
  }
]

export default
class SideBar extends React.Component {
  render() {
    const links = items.map(item => (
      <li styleName='link' key={item.path}>
        <NavLink to={item.path} exact={true} activeClassName='active'>
          <i className='material-icons'>{item.icon}</i>
          <p>{item.text}</p>
        </NavLink>
      </li>
    ))

    return (
      <div styleName='sidebar'>
        <div styleName='logo'>nous</div>
        <ul>{links}</ul>
      </div>
    )
  }
}
