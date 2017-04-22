import React from 'react'

import 'styles/QuestionForm'

export default
class QuestionForm extends React.Component
{
    placeholder = 'Type the question here...';

    constructor(props)
    {
        super(props)
        
        this.remove = () => props.removeHandler(this.state.index)
        this.state = {
            index: 0
        }

        console.log(this)
    }

    render()
    {
        const name = 'question'

        return (
            <li className='QuestionForm'>
                <div className='toolbar'>
                    <p className='title'>Question #{this.state.index + 1}</p>
                    <i className='material-icons' onClick={this.remove}>clear</i>
                </div>

                <textarea 
                    name={name}
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
