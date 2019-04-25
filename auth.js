var db = require("./db_config");
var root = require("./root");
var path = require('path');
var session = require('express-session');

root.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

var username1 = root.username1;
var password1 = root.password1;

db.connect(function(err) {
	console.log("USERNAME2 "+username1);
	console.log("PASSWORD2 "+password1);
    let sql = "SELECT * FROM users where username ='"+username1+"' AND password='"+password1+"' limit 1";
    db.query(sql, function (err, result) {
        if (result != [])
        {
        	console.log(result);
        }
    });
});

module.exports = db;