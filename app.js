const express = require('express')
const app = express()
const port = 8080

function es() {}

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/strona-testowa/', (req, res) => {
    const myTimeout = setTimeout(es, 5000);
    res.send('Strona testowa!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
