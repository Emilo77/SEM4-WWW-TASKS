const express = require('express');
const {get_future_trips, get_trip, change_tickets} = require("../database/database_script.mjs");
const {Zgloszenie} = require("../database/models.mjs");
const bodyParser = require("body-parser");
const {body, validationResult} = require("express-validator");
const router = express.Router();
const nav_color = 'formularz';


router.get('/all', (req, res) => {
    get_future_trips().then(
        wycieczki => {
            res.render('formularz/formularz_wszystkie', {
                nav_color,
                wycieczki,
            })
        }, (err) => {
            res.render('404', {
                message_status: '404',
                message: 'Nie znaleziono wycieczek'
            });
            console.log(err);
        });
})

router.get('/:n', (req, res) => {
    get_trip(parseInt(req.params['n'])).then(
        wycieczka => {
            res.render('formularz/formularz', {
                nav_color,
                wycieczka: wycieczka,
            })
        }, (err) => {
            res.render('404', {
                message_status: '404',
                message: 'Nie znaleziono wycieczki'
            });

            console.log(err);
        });
})

router.post('/:n',
    bodyParser.urlencoded({extended: false}),
    body('imie').isLength({min: 1}).withMessage('Imię nie może być puste'),
    body('nazwisko').isLength({min: 1}).withMessage('Nazwisko nie może być puste'),
    body('email').isEmail().withMessage('Niepoprawny adres email'),
    body('liczba_miejsc').isInt({min: 1}).withMessage('Liczba miejsc musi być większa od 0'),
    (req, res) => {

        let wycieczka;
        get_trip(parseInt(req.params['n'])).then(result => {
            wycieczka = result;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.render('formularz/formularz', {
                    nav_color,
                    wycieczka: wycieczka,
                    error_msg: errors.array()[0].msg.toLocaleString(),
                });
            }
        });

        let imie = req.body.imie;
        let nazwisko = req.body.nazwisko;
        let email = req.body.email;
        let liczba_miejsc = req.body.liczba_miejsc;
        let wycieczka_id = parseInt(req.params['n']);

        change_tickets(wycieczka_id, liczba_miejsc).then(() => {
            Zgloszenie.create({
                imie,
                nazwisko,
                email,
                liczba_miejsc,
                wycieczka_id,
            }).then(() => {
                return res.render('formularz/formularz', {
                    nav_color,
                    wycieczka: wycieczka,
                    message: 'Dziękujemy za dokonanie rezerwacji!'
                })
            }, (err) => {
                console.log(err.message);
                return res.render('formularz/formularz', {
                    nav_color,
                    error_msg: err.toLocaleString(),
                    wycieczka: wycieczka,
                });
            });
        });
    },
    (err) => {
        console.log(err.message);
        return res.render('formularz/formularz', {
            nav_color,
            wycieczka: wycieczka,
            error_msg: err.toString(),
        });
    });


module.exports = router;
