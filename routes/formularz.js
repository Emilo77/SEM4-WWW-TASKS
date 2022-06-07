const express = require('express');
const {get_future_trips, get_trip} = require("../database/database_script.mjs");
const {Zgloszenie} = require("../database/models.mjs");
const bodyParser = require("body-parser");
const {body, validationResult} = require("express-validator");
const router = express.Router();
const nav_color = 'formularz';


router.get('/', (req, res) => {
    get_future_trips().then(
        wycieczki => {
            res.render('formularz_wszystkie', {
                nav_color,
                wycieczki: wycieczki
            })
        }, (err) => {
            res.render('404');
            console.log(err);
        });
})

router.get('/:n', (req, res) => {
    get_trip(parseInt(req.params['n'])).then(
        wycieczka => {
            res.render('formularz', {
                nav_color,
                wycieczka: wycieczka,
            })
        }, (err) => {
            res.render('404');
            console.log(err);
        });
})

router.post('/:n/success',
    bodyParser.urlencoded({extended: false}),
    body('imie').isLength({min: 1}).withMessage('Imię nie może być puste'),
    body('nazwisko').isLength({min: 1}).withMessage('Nazwisko nie może być puste'),
    body('email').isEmail().withMessage('Niepoprawny adres email'),
    body('liczba_miejsc').isInt({min: 1}).withMessage('Liczba miejsc musi być większa od 0'),
    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send(errors.array()[0].msg);
        }

        let imie = req.body.imie;
        let nazwisko = req.body.nazwisko;
        let email = req.body.email;
        let liczba_miejsc = req.body.liczba_miejsc;
        let wycieczka_id = parseInt(req.params['n']);

        console.log(imie, nazwisko, email, liczba_miejsc, wycieczka_id);


        Zgloszenie.create({
            imie: imie,
            nazwisko: nazwisko,
            email: email,
            liczba_miejsc: liczba_miejsc,
            wycieczka_id: wycieczka_id
        }).then(zgloszenie => {
            res.render('formularz_success', zgloszenie);

        }, (err) => {
            res.render('404');
            console.log(err);
        });


    })

module.exports = router;
