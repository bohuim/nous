import React from 'react'

import 'styles/QuestionForm'

/**
 <QuestionForm
    key={index}
    index={index}
    removeCallback={removeCallback}
 />
 */
export default
class QuestionForm extends React.Component
{
    placeholder = 'Type the question here...';

    render()
    {
        const index = this.props.index
        const remove = this.props.removeCallback

        return (
            <li className='QuestionForm'>
                <div className='toolbar'>
                    <p className='title'>Question #{index + 1}</p>
                    <i className='material-icons' onClick={() => remove(index)}>clear</i>
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
