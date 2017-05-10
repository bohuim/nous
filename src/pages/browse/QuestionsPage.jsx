import React from 'react'
import { groupBy as _groupBy } from 'lodash'

import db from '~/utils/db'

import './QuestionsPage.scss'

export default
class QuestionsPage extends React.Component
{
    constructor(props)
    {
        super(props)

        this.category = props.match.params.category
        this.state = {
            ready: false,
            search: '',
            questions: []
        }
    }

    componentWillMount()
    {
        if (window.dashboard)
            window.dashboard.setTitle('#' + this.category)

        const grouped = window.questionsByCategory
        if (grouped)
        {
            return this.setState({
                ready: true,
                questions: grouped[this.category] || null
            })
        }

        db.fetchQuestions()
        .then(all => {
            const grouped = _groupBy(all, 'category')
            window.questionsByCategory = grouped

            this.setState({
                ready: true,
                questions: grouped[this.category] || null
            })
        })
        .catch(error => console.log('BrowsePage.componentWillMount() - ', error))
    }

    action(item, index)
    {
        const cart = window.cart
        const action = cart.contains(item) ? cart.remove : cart.add
        action(item)
    }

    render()
    {
        if (!this.state.ready)
            return <div styleName='loading'>Loading questions for #{this.category}</div>

        if (this.state.questions == null)
            return <div styleName='error'>whoops, there are no questions for #{this.category}</div>

        // Make question items
        const items = this.state.questions
            .filter(item => item.question.toLowerCase().includes(this.state.search.toLowerCase()))
            .map((item, index) => {
                const selected = window.cart.contains(item)

                return (
                    <li key={item.question} styleName='item'>
                        <p styleName='question'>{item.question}</p>

                        <ul styleName='menu'>
                            <li styleName='action' onClick={() => this.action(item, index)} >
                                <i className='material-icons'>{!selected ? 'add' : 'clear'}</i>
                                <span>{!selected ? 'Add to Cart' : 'Remove from Cart'}</span>
                            </li>
                        </ul>
                    </li>
                )
            })

        return (
            <div styleName='page'>
                <input className='global--searchbar'
                       value={this.state.search}
                       placeholder='search for a question...'
                       onChange={e => this.setState({search: e.target.value})} />

                <ul styleName='content'>{items}</ul>
            </div>
        )
    }
}
