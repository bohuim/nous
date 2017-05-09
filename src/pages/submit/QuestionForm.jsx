import React from 'react'

// styles
import './QuestionForm.scss'

const questionPlaceholder = 'Type the question here...';
const categoriesPlaceholder = 'Comma separated categories ex) general, chemistry, ...';

export default (props) => {
    return (
        <div styleName='form'>
            <div styleName='toolbar'>
                <p styleName='label'>Question #{props.number}</p>
                <i styleName='clear' className='material-icons' onClick={props.remove}>clear</i>
            </div>

            <textarea
                rows='8' cols='48'
                styleName='question'
                placeholder='Enter the question here'
                onChange={e => props.update('question', e.target.value)}
            />

            <input
                type='text'
                styleName='category'
                placeholder='Give it a category ex) chemical-engineering'
                onChange={e => props.update('category', e.target.value)}
            />
        </div>
    )
}
