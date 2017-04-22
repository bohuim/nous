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

        this.counter = 0
        this.state = {
            forms: [this.newForm(0)]
        }
    }

    newForm(index)
    {
        console.log('SubmitPage.newForm()')

        const protocol = {
            index: index,
            render: null,
            remove: this.removeForm
        }

        const form = (
            <QuestionForm
                key={this.counter}
                protocol={protocol}
            />
        )

        this.counter += 1
        return [protocol, form]
    }

    addForm()
    {
        console.log('SubmitPage.addForm()')

        this.setState(prev => ({
            forms: prev.forms.concat( [this.newForm(prev.forms.length)] )
        }))
    }

    removeForm(i)
    {
        console.log('SubmitPage.removeForm()')

        var forms = this.state.forms
        if (forms.length <= 1)
            return

        forms = forms.filter(obj => obj[0].index !== i)
        forms.forEach((obj, i) => { 
            const protocol = obj[0]
            protocol.index = i

            if (protocol.update)
                protocol.update()
        })
        this.setState({forms: forms})
    }

    render()
    {
        console.log('SubmitPage.render()')

        return (
            <div className='SubmitPage page'>
                <h3>Submit New Questions</h3>

                <ul className='forms'>
                    {this.state.forms.map(obj => obj[1])}
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
