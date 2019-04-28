var db = require("../db_config");
var express = require('express');
var router = express.Router();
var var_dump = require('var_dump')

router.get('/', function(request, response) {
	var username = request.session.username;
	var nama = request.session.nama; 
	var id = request.session.id_user;
	let sql = "SELECT * FROM matkul where id_user = '"+id+"'";
	let query = db.query(sql, (err, results,fields) => {
		if(err) throw err;
		// console.log(matkuls);
		response.render('mahasiswa/index.njk',{results,username,nama});
	});
    //response.render('mahasiswa/index.njk',{username,nama});
});

router.post('/absen', function(request, response) {
	let sql = "UPDATE absen SET status='2' where ";
	let query = db.query(sql, (err, results) => {
		if(err) throw err;
		response.redirect('/mahasiswa.njk');
	});
});



module.exports = router;