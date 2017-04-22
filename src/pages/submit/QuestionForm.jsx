import React from 'react'

import 'styles/QuestionForm'

export default
class QuestionForm extends React.Component
{
    placeholder = 'Type the question here...';

    constructor(props)
    {
        super(props)
        
        const protocol = props.protocol
        protocol.update = this.update.bind(this)

        this.state = {
            index: protocol.index
        }
    }

    update()
    {
        console.log('QuestionForm.update()')
        this.setState({index: this.props.protocol.index})
    }

    render()
    {
        console.log('QuestionForm.render()')

        const protocol = this.props.protocol
        const index = this.state.index

        return (
            <li className='QuestionForm'>
                <div className='toolbar'>
                    <p className='title'>Question #{index + 1}</p>
                    <i className='material-icons' onClick={() => protocol.remove(index)}>clear</i>
                </div>

                <textarea 
                    name='question'
                    className='input'
                    placeholder={this.placeholder}
                    rows="8" cols="48"
                ></textarea>

                <input 
                    type='text' 
                    className='input'
                    placeholder='Comma separated categories ex) general, chemistry, ...'
                />
            </li>
        )
    }
}
