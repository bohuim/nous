import React from 'react'
import { Link } from 'react-router-dom'
import { groupBy as _groupBy } from 'lodash'

import db from '~/utils/db'
import pubnub from '~/utils/pubnub'

import './BrowsePage.scss'

export default
class BrowsePage extends React.Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            search: '',
            ready: false
        }
    }

    componentWillMount()
    {
        if (window.dashboard)
            window.dashboard.setTitle('Browse')

        if (window.questionsByCategory && !window.dirty)
            return this.setState({ready: true})

        db.fetchQuestions()
        .then(questions => {
            window.questionsByCategory = _groupBy(questions, 'category')

            this.setState({ready: true})
        })
        .catch(error => console.log('BrowsePage.componentWillMount() - ', error))
    }

    render()
    {
        if (!this.state.ready)
            return <div styleName='loading'>getting categories...</div>

        const group = window.questionsByCategory
        const categories = Object.keys(group)
            .filter(c => c.includes(this.state.search))
            .map(c => (
                <li key={c} styleName='item'>
                <Link to={'/browse/' + c} styleName='item-link'>
                    <span styleName='category'>{'#' + c}</span>
                    <span styleName='count'>{`${group[c].length} questions`}</span>
                </Link>
                </li>
            ))

        return (
            <div styleName='page'>
                <input className='global--searchbar'
                       value={this.state.search}
                       placeholder='search for a category...'
                       onChange={e => this.setState({search: e.target.value})} />

                <ul styleName='content'>{categories}</ul>
            </div>
        )
    }
}
