import request from 'superagent'

const endpoint = 'https://y7sn9xsm9h.execute-api.us-east-1.amazonaws.com/prod/NousDB'

export default
{
    fetchQuestions: function()
    {
        return new Promise((resolve, reject) =>
        {
            request
                .get(endpoint)
                .query({ TableName: 'NousQuestions' })
                .end((error, response) => {
                    if (error)
                        return reject(error)

                    const transform = response.body.Items.map(i => ({
                        question: i.Question,
                        category: i.Category
                    }))
                    resolve(transform)
                })
        })
    },

    fetchSessions: function(aaid)
    {
        return new Promise((resolve, reject) =>
        {
            request
                .get(endpoint)
                .query({ TableName: 'NousSessions' })
                .end((error, response) => {
                    if (error)
                        return reject(error)

                    const items = response.body.Items
                        .filter(i => i.AAID === aaid)
                        .map(i => ({
                            timestamp: i.Timestamp,
                            questions: i.Questions,
                            answers: i.Answers
                        }))
                        .sort((a, b) => b.timestamp - a.timestamp)

                    resolve(items)
                })
        })
    }
}
