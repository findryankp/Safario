var express = require('express');
var router = express.Router();
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var db = require("../db_config");

var app = express();

app.use(cookieParser());
app.use(session({
    secret: 'secret'
}));

router.get('/', function(request, response) {
    response.render('auth/login.njk');
});

router.post('/login', function(request, response) {
    var username = request.body.username;
    var password = request.body.password;
    var sess=request.session;
    request.session.userName = username;
    db.connect(function(err) {
        console.log("USERNAME2 "+username);
        console.log("PASSWORD2 "+password);
        let sql = "SELECT * FROM users where username ='"+username+"' AND password='"+password+"' limit 1";
        db.query(sql, function (err, result) {
            if (result != [])
            {
                console.log(result);
                // request.session.username = "username";
                //response.send("Welcome "+request.session.username);
            }
        });
    });
});

module.exports = router;