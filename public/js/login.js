//var pool = require('./pool');

exports.verify = function(req,res){
	var username = req.body.username;
	var password = req.body.password;
	var jjjjson = {
		data: '患者用户',
		password: 'asda'
	}
	res.send(jjjjson);
//	if(username == ''||password == ''){
//		res.send('用户名或密码不能为空');
//		return;
//	}
//01:登陆成功，跳转至home_patient.
//02:登陆成功，跳转至home_guardian.
	/*pool.getConnection(function (err,connection){
		connection.query('SELECT * FROM user WHERE username = ?',[username],function (err,results){
			if(err){
				console.log(err);
				return;
			}
			if(results == ''){
				res.send('该用户名不存在');
				return;
			}
			else if(results[0].password !== password){
				res.send('密码错误');
				return;
			}
			else if(results[0].user_type == 01){
				res.send('患者用户');
				return;
			}
			else if(results[0].user_type == 02){
				res.send('监护人用户');
				return;
			}

		connection.release();
		});
	});*/

}


