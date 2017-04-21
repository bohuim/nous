import React from 'react'

import 'styles/SubmitPage'
import QuestionForm from './QuestionForm'

export default
class SubmitPage extends React.Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            count: 1
        }
    }

    render()
    {
        return (
            <div className='SubmitPage page'>
                <div className='content'>
                    <h3>Submit New Questions</h3>
                    <QuestionForm />
                </div>           
            </div>
        )
    }
}

// Helpers
const range = (n) => Array.from(Array(n).keys())
