var db = require("../db_config");
var express = require('express');
var router = express.Router();

router.get('/', function(request, response) {
    //response.render('dosen/index.njk');
	let sql = "SELECT * FROM matkul";
	let query = db.query(sql, (err, results,fields) => {
		if(err) throw err;
	response.render('dosen/index.njk',{results});
		});
});

router.get('/createkelas', function(request, response) {
	let sql = "SELECT * FROM user WHERE role_user = '1'";
	let query = db.query(sql, (err, results,fields) => {
		if(err) throw err;
			response.render('dosen/createkelas.njk',{results});
	});
});

router.post('/addkelas', function(request, response) {
	var pengajar = request.body.pengajar;
	var kelas = request.body.kelas;
	var ruang = request.body.ruang;
	var hari = request.body.hari;
	var waktu_awal = request.body.waktu_awal;
	var waktu_akhir = request.body.waktu_akhir;

	let sql = "INSERT  INTO `matkul`(`id_user`,`nama`,`ruang`,`hari`,`waktu_awal`,`waktu_akhir`) values ('"+pengajar+"','"+kelas+"','"+ruang+"','"+hari+"','"+waktu_awal+"','"+waktu_akhir+"')";
	let query = db.query(sql, (err, results) => {
		if(err) throw err;
		response.redirect('/dosen');
	});
});

module.exports = router;