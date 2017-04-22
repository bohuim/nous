import React from 'react'

import 'styles/SubmitPage'
import QuestionForm from './QuestionForm'

export default
class SubmitPage extends React.Component
{
    constructor(props)
    {
        super(props)

        this.addForm = this.addForm.bind(this)
        this.removeForm = this.removeForm.bind(this)
        this.submit = this.submit.bind(this)

        this.key = 0
        this.state = {
            forms: [this.keys++]
        }
    }

    addForm()
    {
        this.setState(prev => ({
            forms: prev.forms.concat(this.key++)
        }))
    }

    removeForm(index)
    {
        const forms = this.state.forms
        if (forms.length <= 1)
            return

        forms.splice(index, 1)
        this.setState({forms: forms})
    }

    submit()
    {
        console.log()
    }

    render()
    {
        return (
            <div className='SubmitPage page'>
                <h3>Submit New Questions</h3>

                <ul className='forms'>
                    {this.state.forms.map((key, index) => 
                        <QuestionForm
                            key={key}
                            index={index}
                            removeCallback={this.removeForm}
                        />
                    )}
                </ul>

                <div className='toolbar'>
                    <button onClick={this.addForm}>Add another</button>
                    <button onClick={this.submit}>Submit</button>
                </div>
            </div>
        )
    }
}

// Helpers
const range = (n) => Array.from(Array(n).keys())
