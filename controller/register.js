var db = require("../db_config");
var express = require('express');
var md5 = require('md5');
var router = express.Router();

router.get('/', function(request, response) {
    response.render('auth/register.njk');
});

router.post('/registeruser', function(request, response) {
    var user = request.body.username;
    var passw = request.body.password;
    var pass = md5(passw);
    var nama = request.body.nama;
    var category = request.body.category;
    var angkatan = request.body.angkatan;
    let sql = "INSERT  INTO `user`(`username`,`nama`,`password`,`angkatan`,`role_user`) values ('"+user+"','"+nama+"','"+pass+"','"+angkatan+"','"+category+"')";
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    });

    response.redirect('/auth');
});

module.exports = router;