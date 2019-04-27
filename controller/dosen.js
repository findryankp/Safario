ar express = require('express');
var router = express.Router();

router.get('/', function(request, response) {
    response.render('dosen/index.njk');
});

router.get('/createkelas', function(request, response) {
    response.render('dosen/createkelas.njk'); //akses halaman buat kelas
    //isine form
});