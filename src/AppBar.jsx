import React from 'react'
import { Link, NavLink } from 'react-router-dom'

// styles
import './AppBar.scss'

export default
class AppBar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {showMenu: false}
  }

  toggleMenu() {
    this.setState(prev => ({showMenu: !prev.showMenu}))
  }

  delegate(f) {
    this.setState({showMenu: false})
    f()
  }

  render() {
    const profile = this.props.profile
    const show = this.state.showMenu

    const right_item = !profile ?
      (<a className='login' onClick={() => this.delegate(this.props.login)}></a>) : 
      (
        <div className='profile'>
          <p className='name' onClick={() => this.toggleMenu()}>
            <span>{profile.name}</span>
            <i className='material-icons'>{`arrow_drop_${show ? 'up' : 'down'}`}</i>
          </p>

          <ul className={'menu' + (this.state.showMenu ? ' show' : '')}>
            <li className='logout' onClick={() => this.delegate(this.props.logout)}>Logout</li>
          </ul>
        </div>
      )

    return (
      <div className='AppBar'>
        <div className='header'>{this.props.header}</div>
        <a className='login' onClick={() => this.auth()}>Amazon Login</a>
      </div>
    )
  }
}
