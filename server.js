// dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
var favicon = require('serve-favicon');
const app = express();

// setup
app.use(favicon(path.join(__dirname, './public', 'images', 'favicon.ico')));
app.use(express.static(path.join(__dirname, "./public")));
app.use(express.static(path.join(__dirname, "./bower_components")));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// mongoose setup
const url = 'mongodb://localhost:27017/quoting_dojo'
mongoose.connect(url);

var QuoteSchema = new mongoose.Schema({
    name: String,
    quote: String
}, {timestamps: true})

mongoose.model('Quote', QuoteSchema);
var Quote = mongoose.model('Quote');

app.get('/', function(req, res) {
    res.render('index');
})

app.post('/process', function(req, res) {
    console.log("POST DATA", req.body);

    var quote = new Quote({name: req.body.name, quote: req.body.quote});
    console.log(quote);

    quote.save(function(err) {
        if(err) {
            console.log('something went wrong')
        } else {
            console.log('successfully added a quote!')
            res.redirect('/');
        }
    })
})

app.listen(8000, function() {
    console.log("Power Overwhelming...")
})