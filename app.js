let wycieczki = require('./data.js')
const express = require('express')
const path = require('path');
const app = express();
const port = 8081;
const {database, Wycieczka, Zgloszenie} = require('./database/models.mjs');

//import functions from database_script.mjs
const {init_database, get_future_trips, get_trip} = require('./database/database_script.mjs');

init_database().then(
    () => {
        console.log("Database initialized!");
    }, (err) => {
        console.log("Error: " + err);
    }
)

/* Load views engine*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.set('static', path.join(__dirname, 'static'));
app.use(express.static(path.join(__dirname, 'static')));

/* Include 'public' directory */
app.use(express.static('views'))
app.use('/public', express.static('public'))

/* Render Homepage */
app.get('/', (req, res) => {
    get_future_trips().then(
        wycieczki => {
            console.log(wycieczki);
            res.render('home', {
                wycieczki: wycieczki
            })
        }, (err) => {
            console.log(err);
        });
})

app.get('/formularz/', (req, res) => {
    res.render('formularz',)
})

app.get('/strona-testowa/', (req, res) => {
    res.send('Strona testowa!\n')
})

app.get('/wycieczka/', (req, res) => {
    res.render('404');
})

app.get('/wycieczka/:n/', (req, res) => {
    get_trip(parseInt(req.params['n'])).then(
        wycieczka => {
            if (wycieczka !== undefined) {
                res.render('wycieczka', {
                    wycieczka: wycieczka
                })
            } else {
                res.render('404')
            }
        }, (err) => {
            console.log(err);
        });
})

app.get('/wycieczka/:n/tydzien/:w', (req, res) => {
    let number = parseInt(req.params['n']);
    let week = parseInt(req.params['w']);

    if (number >= 0 && number < wycieczki.array.length && week > 0 && week < 8) {
        let wycieczka = wycieczki.array[number];
        res.render('wycieczka', {
            wycieczka: wycieczka,
            tydzien: week
        })
    } else {
        res.render('404')
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


