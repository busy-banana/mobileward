var client = require('./redis');
var crypto = require('crypto');

exports.verify = function(req,res){
	console.log(req);
	var sha1 = crypto.createHash('sha1');
	var username = req.body.username;
	var password = sha1.update(req.body.password).digest('hex');

	client.on("error", function(err){
    	console.log("Error:" + err);
	});

	client.hget(username,"Password",function(err,obj){
		if(err){
			console.log("Error:" + err);
		}else if(!obj){
			res.send({datas:"该用户名不存在"});
		}else if(obj && obj != password){
			res.send({datas:"密码错误"});
		}else{
			client.hset(username+"_Status","Status",1);
			res.send({datas:"登录成功"});
		}
	});
}


