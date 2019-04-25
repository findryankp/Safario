var express = require('express');
var root = express();
var path = require('path');
var bodyParser = require('body-parser');
var nunjucks  = require('nunjucks');

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

//login
root.get('/', function(request, response) {
	response.render('auth/login.njk');
});

root.post('/login', function(request, response) {
	module.exports.username1 = request.body.username;
	module.exports.password1 = request.body.password;
    var auth = require("./auth");
});

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

root.post('/tambahkelas', function(request, response) {
    var matkul = request.body.nama;
    var hari = request.body.hari;

    db.connect(function(err) {
    //gantien insert
    let sql = "SELECT * FROM users where username ='"+username1+"' AND password='"+password1+"' limit 1";
    db.query(sql, function (err, result) {
        if (result != [])
        {
            console.log(result);
        }
    });
});
});

module.exports = root;