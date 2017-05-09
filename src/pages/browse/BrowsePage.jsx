import React from 'react'

import pubnub from '~/utils/pubnub'

import './BrowsePage.scss'

export default
class BrowsePage extends React.Component
{
    render()
    {
        const category = (this.props.match.params.category || '').toLowerCase()
        console.log('category: ', category)

        return (
            <div styleName='page'>
                <div styleName='toolbar'>

                </div>

                <ul styleName='content'>

                </ul>
            </div>
        )
    }
}
