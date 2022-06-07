const express = require('express');
const {get_future_trips, get_trip} = require("../database/database_script.mjs");
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

module.exports = router;
