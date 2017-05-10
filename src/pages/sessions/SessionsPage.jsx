import React from 'react'
import moment from 'moment'
import db from '~/utils/db'

import './SessionsPage.scss'

export default
class SessionsPage extends React.Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            sessions: []
        }
    }

    componentWillMount()
    {
        if (window.dashboard)
            window.dashboard.setTitle('My Previous Sessions')

        db.fetchSessions(window.user.aaid)
            .then(items => {
                console.log('sessions: ', items)
                this.setState({sessions: items})
            })
            .catch(error => 
                console.log('SessionsPage.componentWillMount() - ', error)
            )
    }

    render()
    {
        const items = this.state.sessions.map(item => (
            <li key={item.timestamp} styleName='item'>
                <p styleName='time'>{moment.unix(item.timestamp).format('MMM D, YYYY - h:mm A')}</p>

                <ul styleName='session'>
                {
                    item.questions.map((question, index) => (
                        <div key={`${item.timestamp}, ${index}`} styleName='set'>
                            <p styleName='question'>{question}</p>
                            <p styleName='answer'>{item.answers[index]}</p>
                        </div>
                    ))
                }
                </ul>
            </li>
        ))

        return (
            <div styleName='page'>
                <ul>{items}</ul>
            </div>
        )
    }
}
