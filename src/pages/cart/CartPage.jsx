import React from 'react'

import './CartPage.scss'

export default
class CartPage extends React.Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            items: window.cart.getItems()
        }
    }

    componentWillMount()
    {
        if (window.dashboard)
            window.dashboard.setTitle('Cart')
    }

    remove(item)
    {
        const items = this.state.items
        const index = items.indexOf(item)
        if (index < 0)
            return

        items.splice(index, 1)
        this.setState({items: items})
        window.cart.remove(item)
    }

    render()
    {
        const items = this.state.items.map((item, index) => (
            <li key={item.question} styleName='item'>
                <p styleName='question'>{item.question}</p>

                <div styleName='remove' onClick={() => this.remove(item)}>
                    <i className='material-icons'>clear</i>
                    <span>Remove from Cart</span>
                </div>
            </li>
        ))

        return (
            <div styleName='page'>
                <div styleName='toolbar'>
                    <p styleName='count'>Selected: {this.state.items.length}</p>
                    <button 
                        styleName='start' 
                        disabled={!this.props.standby}
                        onClick={this.props.start}
                    >
                        Start the Interview!
                    </button>
                </div>

                <ul styleName='content'>{items}</ul>
            </div>
        )
    }
}
