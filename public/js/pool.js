var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '123456',
	port: 3306,
	database: 'shandong'
});

module.exports = pool;
/*pool.getConnection(function (err){
	if(err){
		console.log('mysql connection error');
		console.log(err);
		throw err;
	}
});
*/
//mydb.query('USE mydb');