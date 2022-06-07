const express = require('express')
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const port = 8081;

/* Funkcja inicjująca bazę danych */
const {init_database} = require('./database/database_script.mjs');

init_database().then(
    () => {
        console.log("Database initialized!");
    }, (err) => {
        console.log("Error: " + err);
    }
)

/* Załadowanie statycznych */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.set('static', path.join(__dirname, 'static'));
app.use(express.static(path.join(__dirname, 'static')));

/* Załadowanie widoków */
app.use(express.static('views'))
app.use('/public', express.static('public'))

/* Walidacja */
app.use(bodyParser.urlencoded({extended: false}));

/* Ścieżki dla strony głównej */
app.use('/', require('./routes/index'));

/* Ścieżki dla formularzy */
app.use('/formularz', require('./routes/formularz'));

/* Ścieżki dla wycieczek */
app.use('/wycieczka', require('./routes/wycieczka'));

/* Uruchomienie na porcie */
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


