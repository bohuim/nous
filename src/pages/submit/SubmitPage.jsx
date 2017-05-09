import React from 'react'
import request from 'superagent'
import { Link, NavLink } from 'react-router-dom'

// components
import QuestionForm from './QuestionForm'

// styles
import './SubmitPage.scss'

export default
class SumbitPage extends React.Component
{
    constructor(props)
    {
        super(props)

        this.key = 1
        this.state = {
            data: []
        }
    }

    componentWillMount()
    {
        this.add()
    }

    add()
    {
        this.setState({
            data: this.state.data.concat({
                key: this.key++,
                question: '',
                category: ''
            })
        })
    }

    remove(index)
    {
        const data = this.state.data
        if (data.length > 1)
        {
            data.splice(index, 1)
            this.setState({data: data})
        }
    }

    submit()
    {
        const items = this.state.data.filter(item => item.question && item.category)
        if (items.length === 0)
            return

        console.log('Sumbitting items: ', items)
        const payload = {
            RequestItems: {
                'NousQuestions': items
                    .map(i => ({
                        Question: i.question,
                        Category: i.category
                    }))
                    .map(i => ({
                        PutRequest: { Item: i }
                    }))
            }
        }

        request
            .post('https://y7sn9xsm9h.execute-api.us-east-1.amazonaws.com/prod/NousDB')
            .send(payload)
            .set('Content-Type', 'application/json')
            .end((error, response) => {
                if (error)
                    return console.log('SubmitPage.submit() - error while posting questions: ', error)

                // We should check response for "UnprocessedItems" and loop the request but... just reset for now.
                this.key = 0
                this.setState({data: []})
                this.add()
            })
    }

    render()
    {
        const forms = this.state.data.map((data, index) => (
            <li key={data.key} styleName='form-item'>
                <QuestionForm 
                    number={index+1}
                    remove={() => this.remove(index)}
                    update={(uid, val) => {this.state.data[index][uid] = val}}
                />
            </li>
        ))

        return (
            <div styleName='page'>
                <div styleName='toolbar'>
                    <button styleName='submit' onClick={() => this.submit()}>Submit!</button>
                </div>

                <ul styleName='forms'>
                    {forms}

                    <li styleName='add' onClick={() => this.add()}>
                        <i className='material-icons'>add</i>
                        Add Another
                    </li>
                </ul>
            </div>
        )
    }
}
