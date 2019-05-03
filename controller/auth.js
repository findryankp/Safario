var db = require("../db_config");
var express = require('express');
var md5 = require('md5');
var router = express.Router();

router.get('/', function(request, response) { 
    if(request.session.flashdata){
        var flash = request.session.flashdata;
    }
    response.render('auth/login.njk',{flash});
});

router.post('/login', function(request, response) {
    var user = request.body.username;
    var passw = request.body.password;
    var pass = md5(passw);

    console.log("pass "+pass);
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
            request.session.role = results[0].role_user;

            console.log('role'+request.session.role);

            if(request.session.role == 1){
                response.redirect('/dosen');
            }else{
                // response.redirect('/mahasiswa');
                response.redirect('/mahasiswa');
            }

            
        }else{
            // console.log("SALLAH");
            request.session.flashdata = "Kombinasi username dan password salah !!";
            response.redirect('/auth');
        }
    });
});


router.get('/logout', function(request, response) {
    request.session.destroy();    
    response.redirect('/auth');
});

module.exports = router;