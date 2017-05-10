import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import PubNub  from '~/utils/pubnub'
import AppBar  from '~/components/AppBar'
import SideBar from '~/components/SideBar'

import BrowsePage    from '~/pages/browse/BrowsePage'
import QuestionsPage from '~/pages/browse/QuestionsPage'
import CartPage      from '~/pages/cart/CartPage'
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
            count: 0,
            title: ''
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

    render()
    {
        const user = window.user
        const cart = window.cart

        return !user ? <Redirect to='/login' /> :
        (
            <div styleName='dashboard'>
                <div styleName='side'><SideBar count={this.state.count} /></div>

                <div styleName='main'>
                    <div styleName='appbar'><AppBar title={this.state.title} /></div>

                    <div styleName='content'>
                    <Switch>
                        <Route path='/browse' exact     render={props => <BrowsePage    {...props} />} />
                        <Route path='/browse/:category' render={props => <QuestionsPage {...props} />} />
                        <Route path='/cart'             render={props => <CartPage      {...props} />} />
                        <Route path='/sessions'         render={props => <div>sessions</div>} />
                        <Route path='/submit'           render={props => <SubmitPage    {...props} />} />
                        <Route path='*'                 render={props => <Redirect to='/browse' />} />
                    </Switch>
                    </div>
                </div>
            </div>
        )
    }

    messageHandler(payload)
    {
        console.log('Received payload: ', payload)
    }
}
