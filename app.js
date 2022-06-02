const wycieczki = require('./data.js')
const express = require('express')
const path = require('path');
const app = express()
const port = 8081

/* Load views engine*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/* Include 'public' directory */
app.use(express.static('views'))
app.use('/public', express.static('public'))

/* Render Homepage */
app.get('/', (req, res) => {
    res.render('home', wycieczki)
})

app.get('/wycieczka/', (req, res) => {
    res.render('wycieczka')
})

app.get('/formularz/', (req, res) => {
    res.render('formularz')
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
        let num = parseInt(number);

        res.render('wycieczka', {
            num,
            wycieczki
        })

    }

    // let week_numer = req.params['week_number'];

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
