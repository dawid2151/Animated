const express = require('express');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql');
const formidable = require('formidable');
const app = express();
const con = mysql.createConnection({
    host: "localhost",
    user: "AnimatedProvider",
    password: "animated"
});
let dir = path.join(__dirname, "public", "build");

app.use(express.static(path.join(dir)));
//app.use(express.urlencoded());

con.connect((err) => {
    if (err)
    {
        console.log("Cannot connect with the database. Check host and credentials.");
        throw err;
    }
    console.log("Connection to the database established...");
    con.query("use animated;", (err, res) => {
        if (err)
            throw (err);
        console.log("Accessed requested database...");
    });
});
app.listen(8000, () => {
    console.log("Listening for incoming requests...");
});


app.get('/', function (req, res) {
    let p = path.join(dir, 'build', 'index.html');
    res.sendFile(p);
});
app.get("/addimage", (req, res) => {
    let p = path.join(dir, 'addimage.html');
    res.sendFile(p);
})

require("./endpoints/getgiflistController.js")(app, con);
require("./endpoints/postimagedataController.js")(app, con, formidable, fs, path);

