import React from 'react'

import 'styles/QuestionForm'

const questionPlaceholder = 'Type the question here...';
const categoriesPlaceholder = 'Comma separated categories ex) general, chemistry, ...';

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
    render()
    {
        const index = this.props.index
        const update = this.props.updateHandler
        const remove = this.props.removeHandler

        return (
            <li className='QuestionForm'>
                <div className='toolbar'>
                    <p className='title'>Question #{index + 1}</p>
                    <i className='material-icons' onClick={() => remove(index)}>clear</i>
                </div>

                <textarea 
                    name='question'
                    className='input'
                    rows="8" cols="48"
                    placeholder={questionPlaceholder}
                    onChange={e => update(index, 'question', e.target.value)}
                ></textarea>

                <input 
                    type='text' 
                    className='input'
                    placeholder={categoriesPlaceholder}
                    onChange={e => update(index, 'categories', e.target.value)}
                />
            </li>
        )
    }
}
