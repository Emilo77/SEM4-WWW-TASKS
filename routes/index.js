const express = require('express');
const {get_future_trips} = require("../database/database_script.mjs");
const router = express.Router();
const nav_color = 'homepage';

router.get('/', (req, res) => {
    get_future_trips().then(
        wycieczki => {
            res.render('home', {
                nav_color: nav_color,
                wycieczki: wycieczki
            })
        }, (err) => {
            console.log(err);
        });
})

router.get('/:n', (req, res) => {
    res.render('404');
});

module.exports = router;
