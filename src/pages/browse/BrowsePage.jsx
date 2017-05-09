import React from 'react'
import { Link } from 'react-router-dom'

import request from 'superagent'
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
            categories: []
        }
    }

    componentWillMount()
    {
        request
        .get('https://y7sn9xsm9h.execute-api.us-east-1.amazonaws.com/prod/NousDB')
        .query({TableName: 'NousCategories'})
        .end((error, response) => {
            if (error)
                return console.log('BrowsePage.componentWillMount() - error while fetching categories: ', error)

            const categories = 
                response.body.Items
                .map(item => ({category: item.Category, count: item.Count}))

            this.setState({categories: categories})
        })
    }

    render()
    {
        const items = 
            this.state.categories
            .filter(item => item.category.includes(this.state.search))
            .map(item => (
                <li key={item.category} styleName='item'>
                <Link to={'/browse/' + item.category} styleName='item-link'>
                    <span styleName='category'>{'#' + item.category}</span>
                    <span styleName='count'>{`${item.count} questions`}</span>
                </Link>
                </li>
            ))

        return (
            <div styleName='page'>
                <input styleName='searchbar'
                       value={this.state.search}
                       placeholder='search for a category...'
                       onChange={e => this.setState({search: e.target.value})} />

                <ul styleName='content'>{items}</ul>
            </div>
        )
    }
}
