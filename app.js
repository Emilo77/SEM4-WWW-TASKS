const express = require('express')
const path    = require("path");
const app = express()
const port = 8080

app.set('view engine', 'pug');

app.use(express.static('html'))
app.use('/public', express.static('public'))

app.get('/', (req, res) => {
    res.sendFile((path.join(__dirname + '/html/home.html')))
})

app.get('/wycieczka/', (req, res) => {
    res.sendFile((path.join(__dirname + '/html/wycieczka.html')))
})

app.get('/formularz/', (req, res) => {
    res.sendFile((path.join(__dirname + '/html/formularz.html')))
})

app.get('/strona-testowa/', (req, res) => {
    res.send('Strona testowa!\n')
})

app.get('/wycieczka/:number/', (req, res) => {
    res.send('Wycieczka nr ' + req.params['number'])
})

app.get('/wycieczka/:number/tydzien/:week_number', (req, res) => {
    let numer = req.params['number'];
    let week_numer = req.params['week_number'];
    res.send('Wycieczka nr ' + numer + ' w tygodniu ' + week_numer)
})

app.get('/wycieczka-:q?nr=:n?&tydzien=:t?', (req, res) => {
    let name = req.params['q'];
    let number = req.params['n'];
    let week_number = req.params['t'];

    if (name === undefined) {
        res.send('Nie podano nazwy wycieczki!')

    } else if (number === undefined) {
        res.send('Nie podano numeru wycieczki!')

    } else if (week_number === undefined) {
        res.send('Nie podano tygodnia wycieczki!')

    } else {
        res.send('Wycieczka ' + name + ' nr ' + number + ' w tygodniu ' + week_number)
    }

    // let week_numer = req.params['week_number'];

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
