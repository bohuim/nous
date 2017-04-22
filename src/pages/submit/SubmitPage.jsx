import React from 'react'
import ReactDOM from 'react-dom'

import 'styles/SubmitPage'
import QuestionForm from './QuestionForm'

export default
class SubmitPage extends React.Component
{
    constructor(props)
    {
        super(props)

        this.key = 1
        this.state = {
            data: [
                {
                    key: 0,
                    question: '',
                    categories: ''
                }
            ]
        }
    }

    add()
    {
        this.setState(prev => ({
            data: prev.data.concat({
                key: this.key++,
                question: '',
                categories: ''
            })
        }))
    }

    remove(index)
    {
        const data = this.state.data
        if (data.length <= 1)
            return

        data.splice(index, 1)
        this.setState({data: data})
    }

    update(index, uid, val)
    {
        this.state.data[index][uid] = val
    }

    submit()
    {
        
    }

    render()
    {
        return (
            <div className='SubmitPage page'>
                <h3>Submit New Questions</h3>

                <ul ref='formList' className='data'>
                    {this.state.data.map((data, index) => 
                        <QuestionForm
                            key={data.key}
                            index={index}
                            updateHandler={this.update.bind(this)}
                            removeHanlder={this.remove.bind(this)}
                        />
                    )}
                </ul>

                <div className='toolbar'>
                    <button onClick={() => this.add()} >Add another</button>
                    <button onClick={() => this.submit()} >Submit</button>
                </div>
            </div>
        )
    }
}

// Helpers
const range = (n) => Array.from(Array(n).keys())
