const express = require('express');
const {get_trip} = require("../database/database_script.mjs");
const router = express.Router();
const nav_color = 'wycieczka';

router.get('/', (req, res) => {
    res.render('404');
})

router.get('/:n/', (req, res) => {
    get_trip(parseInt(req.params['n'])).then(
        wycieczka => {
            if (wycieczka !== undefined) {
                res.render('wycieczka', {
                    nav_color: nav_color,
                    wycieczka,
                })
            } else {
                res.render('404');
            }
        }, (err) => {
            res.render('404');
            console.log(err);
        });
})

// router.get('/:n/tydzien/:w', (req, res) => {
//     let number = parseInt(req.params['n']);
//     let tydzien = parseInt(req.params['w']);
//
//     if (number >= 0 && number < wycieczki.length && week > 0 && week < 8) {
//         let wycieczka = wycieczki[number];
//         res.render('wycieczka', {
//             nav_color,
//             wycieczka,
//             tydzien,
//         })
//     } else {
//         res.render('404')
//     }
// })

module.exports = router;
