import React from 'react'

import 'styles/SubmitPage'
import QuestionForm from './QuestionForm'

export default
class SubmitPage extends React.Component
{
    constructor(props)
    {
        super(props)

        this.newForm = this.newForm.bind(this)
        this.addForm = this.addForm.bind(this)
        this.removeForm = this.removeForm.bind(this)

        this.state = {
            forms: [this.newForm(0)]
        }
    }

    newForm(index)
    {
        const form = (
            <QuestionForm
                key={index}
                removeHandler={this.removeForm}
            />
        )

        console.log(form)
        return form
    }

    addForm()
    {
        this.setState(prev => ({
            forms: prev.forms.concat( this.newForm(prev.forms.length) )
        }))
    }

    removeForm(i)
    {
        const oldForms = this.state.forms
        if (oldForms.length == 1)
            return

        console.log(`remove index: ${i}`)

        const forms = oldForms.slice(i, i+1)
        forms.forEach((form, i) => console.log(form))

        console.log(`new forms: ${forms}`)

        this.setState({forms: forms})
    }

    render()
    {
        return (
            <div className='SubmitPage page'>
                <h3>Submit New Questions</h3>

                <ul className='forms'>
                    {this.state.forms}
                </ul>

                <div className='toolbar'>
                    <button onClick={this.addForm}>Add another</button>
                    <button>Submit</button>
                </div>
            </div>
        )
    }
}

// Helpers
const range = (n) => Array.from(Array(n).keys())
