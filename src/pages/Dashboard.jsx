import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import PubNub  from '~/utils/pubnub'
import AppBar  from '~/components/AppBar'
import SideBar from '~/components/SideBar'

import BrowsePage    from '~/pages/browse/BrowsePage'
import QuestionsPage from '~/pages/browse/QuestionsPage'
import CartPage      from '~/pages/cart/CartPage'
import SessionsPage  from '~/pages/sessions/SessionsPage'
import SubmitPage    from '~/pages/submit/SubmitPage'

// style
import './Dashboard.scss'

let selectedQuestions = new Set()

export default
class Dashboard extends React.Component
{
    constructor(props)
    {
        super(props)
        
        this.pubnub = new PubNub()
        this.state = {
            title: '',
            alert: '',
            count: 0,
            standby: false
        }
    }

    componentWillMount()
    {
        const user = window.user
        if (!user)
            return

        window.cart = {
            add: this.add.bind(this),
            remove: this.remove.bind(this),
            contains: this.contains.bind(this),
            getItems: () => Array.from(selectedQuestions)
        }

        window.dashboard = {
            setTitle: this.setTitle.bind(this)
        }

        this.pubnub.addListener({message: this.messageHandler.bind(this)})
        this.pubnub.subscribe({channels: [user.aaid]})
    }

    render()
    {
        const user = window.user
        const cart = window.cart

        return !user ? <Redirect to='/login' /> :
        (
            <div styleName='dashboard'>
                <div styleName='side'><SideBar count={this.state.count} /></div>

                <div styleName='main'>
                    <div styleName={'alert ' + (this.state.alert ? 'active' : '')} >{this.state.alert}</div>
                    <div styleName='appbar'><AppBar title={this.state.title} /></div>

                    <div styleName='content'>
                    <Switch>
                        <Route path='/browse' exact     render={props => <BrowsePage    {...props} />} />
                        <Route path='/browse/:category' render={props => <QuestionsPage {...props} />} />
                        <Route path='/cart'             render={props => <CartPage      {...props} standby={this.state.standby} start={() => this.startInteview()} />} />
                        <Route path='/sessions'         render={props => <SessionsPage  {...props} />} />
                        <Route path='/submit'           render={props => <SubmitPage    {...props} />} />
                        <Route path='*'                 render={props => <Redirect to='/browse' />} />
                    </Switch>
                    </div>
                </div>
            </div>
        )
    }

    // --------------------
    // Helpers
    // --------------------
    setTitle(title)
    {
        this.setState({title: title})
    }

    add(question)
    {
        if (selectedQuestions.has(question))
            return false

        selectedQuestions.add(question)
        this.setState({count: selectedQuestions.size})
        return true
    }

    remove(question)
    {
        const success = selectedQuestions.delete(question)
        if (success)
            this.setState({count: selectedQuestions.size})
        return success
    }

    contains(question)
    {
        return selectedQuestions.has(question)
    }

    startInteview()
    {
        console.log('start interview!')
        if (!this.state.standby)
            return

        const payload = {
            channel: window.user.aaid,
            message: {
                for: 'alexa',
                event: 'setup',
                questions: Array.from(selectedQuestions).map(i => i.question)
            }
        }
        this.pubnub.publish(payload, (status, event) =>
        {
            console.log(status)
            if (status.error)
                return console.log('Dashboard.startInteview() - ', status.error)

            this.setState({
                alert: 'Interview Started!',
                standby: false
            })
        })
    }

    messageHandler(payload)
    {
        const message = payload.message
        if (message.for !== 'web')
            return

        if (message.event === 'standby' && !this.state.standby)
        {
            console.log('standby message: ', message)
            this.setState({
                standby: true,
                alert: 'Setup the Interview!'
            })
        }
    }
}
