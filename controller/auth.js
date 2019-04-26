var db = require("../db_config");
var express = require('express');
var router = express.Router();

router.get('/', function(request, response) {
    response.render('auth/login.njk');
});

router.post('/login', function(request, response) {
    var user = request.body.username;
    var pass = request.body.password;
    var cek = 0;
    console.log("USERNAME2 "+user);
    console.log("PASSWORD2 "+pass);
    let sql = "SELECT * FROM user where username ='"+user+"' AND password='"+pass+"' limit 1";
    let query = db.query(sql, (err, results, fields) => {
        if(err) throw err;
        console.log(results);
        if (results != []) { 
            //add to session         
            request.session.id_user = results[0].id_user;
            request.session.username = results[0].username;
            request.session.nama = results[0].nama;
            request.session.angkatan = results[0].angkatan;
            request.session.role = results[0].role;
            response.redirect('/dashboard');
        }else{
            request.session.flashdata = "Kombinasi username dan password salah !!";
            response.redirect('/auth');
        }
    });
});

module.exports = router;