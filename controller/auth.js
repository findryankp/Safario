var db = require("../db_config");
var express = require('express');
var router = express.Router();

router.get('/', function(request, response) { 
    if(request.session.flashdata){
        var flash = request.session.flashdata;
    }
    response.render('auth/login.njk',{flash});
});

router.post('/login', function(request, response) {
    var user = request.body.username;
    var pass = request.body.password;
    // console.log("USERNAME2 "+user);
    // console.log("PASSWORD2 "+pass);
    let sql = "SELECT * FROM user where username ='"+user+"' AND password='"+pass+"' limit 1";
    let query = db.query(sql, (err, results, fields) => {
        // if(err) throw err;
        // console.log(results);
        if (results.length > 0) { 
            //add to session         
            request.session.id_user = results[0].id_user;
            request.session.username = results[0].username;
            request.session.nama = results[0].nama;
            request.session.angkatan = results[0].angkatan;
            request.session.role = results[0].role;

            if(request.session.role == 1){
                response.redirect('/dosen');
            }else{
                // response.redirect('/mahasiswa');
                response.render('dosen/index.njk',{results});
            }

            
        }else{
            // console.log("SALLAH");
            request.session.flashdata = "Kombinasi username dan password salah !!";
            response.redirect('/auth');
        }
    });
});

router.get('/register', function(request, response) {
    response.render('auth/register.njk');
});

router.post('/registeruser', function(request, response) {
    var user = request.body.username;
    var pass = request.body.password;
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

router.get('/logout', function(request, response) {
    request.session.destroy();
    request.session.regenerate(function(err) {
      request.session.flashdata = "Logout user berhasil!";
    });
    
    response.redirect('/auth');
});

module.exports = router;