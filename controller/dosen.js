var express = require('express');
var router = express.Router();

router.get('/', function(request, response) {
    response.render('dosen/index.njk');
});

router.get('/createkelas', function(request, response) {
    response.render('dosen/createkelas.njk'); //akses halaman buat kelas
    //isine form
});

router.post('/addkelas', function(request, response) {
	var id = request.body.id_matkul;
	var pengajar = request.body.id_user;
	var kelas = request.body.nama;
	var ruang = request.body.ruang;
	var hari = request.body.hari;
	var waktu_awal = request.body.waktu_awal;
	var waktu_akhir = request.body.waktu_akhir;

	let sql = "INSERT INTO `matkul`(`id_user`,`nama`,`ruang`,`hari`,`waktu_awal`,`waktu_akhir`) values (`"+id_matkul+"`,`"+id_user+"`,`"+nama+"`,`"+ruang+"`,`"+hari+",`"+waktu_awal+"``,`"+waktu_akhir+"`) ";
	let query = db.query(sql, (err, results) => {
		if(err) throw err;
		response.redirect('/dosen');
	});
});

module.exports = router;