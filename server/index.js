// Imports
const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const config = require('dotenv').config();

// Connect to db
const db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

// Apply middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API hook for charts
app.get("/api/get/chart", (req, res) => {
    const sqlSelect = 
        "SELECT time, offset_lid, lid_height, barcode, wrong_lid, gross_defect, sealing_surface FROM lid;";
    db.query(sqlSelect, (err, result) => {
        console.log(result);
        res.send(result);
    });
});

// API hook for failure data
app.get("/api/get/failure", (req, res) => {
    const sqlSelect = 
        "SELECT filter, lid FROM failure ORDER by id DESC LIMIT 1;";
    db.query(sqlSelect, (err, result) => {
        console.log(result);
        res.send(result);
    });
});

// Run
app.listen(3001, () => {
    console.log("running on port 3001");
});