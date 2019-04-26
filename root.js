var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var nunjucks  = require('nunjucks');

var root = express();

root.use(cookieParser());
root.use(session({secret: "Shh, its a secret!"}));
root.use(bodyParser.urlencoded({extended : true}));
root.use(bodyParser.json());

root.use(express.static(__dirname + '/assets'));

// Apply nunjucks and add custom filter and function (for example). 
root.set('view engine', 'njk');
var env = nunjucks.configure(['views/'], { // set folders with templates
    autoescape: true, 
    express: root
});

env.addFilter('myFilter', function(obj, arg1, arg2) {
    console.log('myFilter', obj, arg1, arg2);
    // Do smth with obj
    return obj;  
});
env.addGlobal('myFunc', function(obj, arg1) { 
    console.log('myFunc', obj, arg1);
    // Do smth with obj
    return obj;
});


root.get('/helloworld', function(req, res){
   	res.end('Hello World\n');
});

//----login
var auth = require('./controller/auth.js');
root.use('/auth', auth);
//----endlogin

//dashboard
root.get('/dashboard', function(request, response) {
	response.sendFile(path.join(__dirname + '/login.html'));
});

//Dosen
root.get('/dosen', function(request, response) {
    response.render('dosen/index.njk');
});

root.get('/createkelas', function(request, response) {
    response.render('dosen/createkelas.njk'); //akses halaman buat kelas
    //isine form
});

module.exports = root;