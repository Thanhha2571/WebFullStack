const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

const user = [
    {
        id: 1,
        name: 'John Doe',
        age: 30
    },

    {
        id: 2,
        name: 'Jane Doe',
        age: 20
    }
];

app.get('/users', (req, res) => {
    res.send(user)
})


app.get('/users/:id', (req, res) => {
    console.log("query string", req.params)
    res.send(user.filter((user) => String(user.id) === req.params.id))
})

// app.get('/users/:id', (req, res) => {
//     console.log("query string", req.params)
//     res.send(user.filter((user) => String(user.id) === req.params.id))
// })

app.get('/hello-world', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})