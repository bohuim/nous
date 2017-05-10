import React from 'react'
import { Link, NavLink } from 'react-router-dom'

// styles
import './SideBar.scss'

const items =
[
  {
    path: '/browse',
    icon: 'dashboard',
    text: 'Browse',
  },
  {
    path: '/cart',
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
        <NavLink to={item.path} activeClassName='active'>
          <i className='material-icons'>{item.icon}</i>
          <p>
            {item.text}
            {item.text !== 'Cart' ? null : (<span styleName='count'>{this.props.count}</span>)}
          </p>
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
