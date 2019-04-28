var db = require("../db_config");
var express = require('express');
var router = express.Router();

router.get('/', function(request, response) {
	var username = request.session.username;
	var nama = request.session.nama; 
	var id = request.session.id_user;
	let sql = "SELECT * FROM matkul where id_user = '"+id+"'";
	let query = db.query(sql, (err, results,fields) => {
		if(err) throw err;
		// console.log(matkuls);
		response.render('mahasiswa/index.njk',{results,username,nama,id});
	});
    //response.render('mahasiswa/index.njk',{username,nama});
});

router.post('/absen', function(request, response) {
	var id = request.body.id_user;
	var matkul = request.body.id_matkul;
	var status = request.body.status;

	let sql = "INSERT INTO `absen`(`id_user`,`id_matkul`,`status`) values (`"+id+"`,`"+matkul+"`,`"+status+"`) ";
	let query = db.query(sql, (err, results) => {
		if(err) throw err;
		response.redirect('mahasiswa/index.njk');
	});
});



module.exports = router;