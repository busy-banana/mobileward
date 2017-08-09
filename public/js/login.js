const client = require('./redis');
const crypto = require('crypto');

exports.verify = function(req,res){
	const sha1 = crypto.createHash('sha1');
	const username = req.body.username || '',
		  password = sha1.update(req.body.password).digest('hex') || '';

	client.on("error", function(err){
    	console.log("Error:" + err);
	});

	client.hget(username,"Password",(err,obj) => {
		if(err){
			console.log("Error:" + err);
		}else if(!obj){
			res.send({datas:"该用户名不存在"});
		}else if(obj && obj != password){
			res.send({datas:"密码错误"});
		}else{
			client.hget(username+"_SN","SerialNumber",(err,obj) => {
				if(err){
					console.log("Error:" + err);
				}else{
					let SN = obj;
					client.hget("User_"+SN,"Name",(err,obj) => {
						if(err){
							console.log("Error:" + err);
						}else{
							client.hset(username+"_Status","Status",1);
							res.send({datas:"登录成功",SN:SN,Name:obj});
						}
					});
				}
			});
		}
	});
}


