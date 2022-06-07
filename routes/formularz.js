const express = require('express');
const {get_future_trips, get_trip} = require("../database/database_script.mjs");
const {Zgloszenie} = require("../database/models.mjs");
const router = express.Router();
const nav_color = 'formularz';

router.get('/', (req, res) => {
    get_future_trips().then(
        wycieczki => {
            res.render('formularz_wszystkie', {
                nav_color,
                wycieczki: wycieczki
            })
        } , (err) => {
            res.render('404');
            console.log(err);
        });
})

router.get('/:n', (req, res) => {
    get_trip(parseInt(req.params['n'])).then(
        wycieczka => {
            res.render('formularz', {
                nav_color,
                wycieczka,
            })
        } , (err) => {
            res.render('404');
            console.log(err);
        });
})

router.post('/:n', (req, res) => {
    let {nowe_imie, nowe_nazwisko, nowy_email, nowa_liczba, wycieczka} = req.body;

    if (nowe_imie === undefined || nowe_nazwisko === undefined || nowy_email === undefined || nowa_liczba === undefined) {
        res.render('formularz', {
            nav_color,
            wycieczka,
            error: 'Wypełnij wszystkie pola!'
        })
    } else {
        get_wycieczka(wycieczka.id).then({
            //zmniejszenie liczby miejsc o ilość kupionych
        });
        Zgloszenie.create({
            imie: nowe_imie,
            nazwisko: nowe_nazwisko,
            email: nowy_email,
            liczba_osob: nowa_liczba
        }.then({
            //dodano zgłoszenie
        }, (err) => {
            res.render('formularz', {
                nav_color,
                wycieczka,
                error: 'Wystąpił błąd podczas dodawania zgłoszenia!'
            })
        }));
    }


})

module.exports = router;
