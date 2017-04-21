import React from 'react'

import 'styles/QuestionForm'

export default
class QuestionForm extends React.Component
{
    placeholder = 'Type the question here...'

    render()
    {
        const name = 'question'

        return (
            <div className='QuestionForm'>
                <div className='toolbar'>
                    <p className='title'>Question #1</p>
                    <i className='material-icons'>clear</i>
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
            </div>
        )
    }
}
