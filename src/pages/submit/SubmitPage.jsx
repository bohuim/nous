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

        this.key = 0
        this.state = {
            forms: [this.newForm(0)]
        }
    }

    newForm(index)
    {
        return {
            key: this.key++,
            index: index
        }
    }

    addForm()
    {
        this.setState(prev => ({
            forms: prev.forms.concat( this.newForm(prev.forms.length) )
        }))
    }

    removeForm(index)
    {
        const forms = this.state.forms
        if (forms.length <= 1)
            return

        const newForms = forms.slice(0, index).concat( forms.splice(index+1) )
        newForms.forEach((e, i) => { e.index = i })

        this.setState({forms: newForms})
    }

    render()
    {
        return (
            <div className='SubmitPage page'>
                <h3>Submit New Questions</h3>

                <ul className='forms'>
                    {this.state.forms.map(form => 
                        <QuestionForm
                            key={form.key}
                            index={form.index}
                            removeCallback={this.removeForm}
                        />
                    )}
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
