var db = require("../db_config");
var express = require('express');
var router = express.Router();
var var_dump = require('var_dump')

router.get('/', function(request, response) {
	var username = request.session.username;
	var nama = request.session.nama; 
    response.render('mahasiswa/index.njk',{username,nama});
});

router.post('/absen', function(request, response) {
	let sql = "UPDATE absen SET status='2'";
	let query = db.query(sql, (err, results) => {
		if(err) throw err;
		response.redirect('/mahasiswa.njk');
	});
});

router.post('/kelasmahasiswa',function(request,response){
	let sql = "SELECT * FROM matkul";
	let query = db.query(sql, (err, results) => {
		if(err) throw err;
		response.render('mahasiswa/index.njk',{results : results});
	});
});


module.exports = router;