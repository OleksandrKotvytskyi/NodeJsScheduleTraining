const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');

function Main () {
    this.router = express.Router();
    this.group = require('./models/group.js');
    this.data = null;
}

Main.prototype.run = function () {
    let corsOptions = {
        origin: 'http://localhost:3000',
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    }
    
    app.use(cors(corsOptions));
    
    app.get('/', function(req, res) {
        res.send("<h1>Hello world<h2>");
    });
    
    app.use('/api', this.router);
    
    this.router.get('/getData', function(req, res) {
        res.json({ a: 123 });
    });
    
    app.listen(3001);

    if (!this.data) {
        this.data = this.loadData();
    }
}

Main.prototype.loadData = function () {
    let rawdata = fs.readFileSync('./data/data.json');
    return JSON.parse(rawdata);
}

var main = new Main();
main.run();
console.log(main.data);