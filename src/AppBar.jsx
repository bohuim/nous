import React from 'react'
import { Link, NavLink } from 'react-router-dom'

import './AppBar.css'

class AppBar extends React.Component
{
    render()
    {
        return (
            <div className='AppBar'>
                <NavLink to='/' className='navlink home' activeClassName=''><p>Nous</p></NavLink>
                <NavLink to='/submit' className='navlink' activeClassName='active'><p>submit</p></NavLink>
                <NavLink to='/submit' className='navlink' activeClassName='active'><p>start</p></NavLink>
            </div>
        )
    }
}

export default AppBar
