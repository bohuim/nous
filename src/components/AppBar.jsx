import React from 'react'
import { Redirect } from 'react-router-dom'

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

  logout() {
    const logout = window.auth.logout
    if (logout) {
      this.setState({showMenu: false})
      logout()
    }
  }

  render() {
    // assume it exists
    const user = window.user
    if (!user) {
      return <Redirect to='/login' />
    }

    const show = this.state.showMenu
    const arrow = 'arrow_drop_' + (show ? 'up' : 'down')
    const menu = (show ? 'menu' : 'hide')

    return (
      <div styleName='appbar'>
        <h3>Temp section title</h3>

        <div styleName='profile'>
          <p styleName='name' onClick={() => this.toggleMenu()}>
            <span>{user.name}</span>
            <i className='material-icons'>{arrow}</i>
          </p>

          <ul styleName={menu}>
            <li styleName='logout' onClick={() => this.logout()}>Logout</li>
          </ul>
        </div>
      </div>
    )
  }
}
