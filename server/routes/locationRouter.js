const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');
const bodyParser =require('body-parser');

router.post('/', (req, res) => {
    console.log(req.body);
    let point = req.body;
    const sqlText = `INSERT INTO location (location_name, longitude, latitude) VALUES ($1, $2, $3)`;
    pool.query(sqlText,[point.label, point.long, point.lat])
    .then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error on post: ', error);
        res.sendStatus(500);
    })
})

router.get('/', (req, res) =>{
    const sqlText = `SELECT * FROM location`;
    pool.query(sqlText)
    .then((result) => {
        res.send(result);   
    }).catch((error) => {
        res.sendStatus(500); 
        console.log('error on get:', error);
    })
})

module.exports = router;