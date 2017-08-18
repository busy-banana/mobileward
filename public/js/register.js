const client = require('./redis');
const crypto = require('crypto');

exports.addNewUser = function(req,res){
	const sha1 = crypto.createHash('sha1');
	const username = req.body.username || '',
		password = sha1.update(req.body.password).digest('hex') || '',
		sex = req.body.sex || '',
		name = req.body.name || '',
		telephone = req.body.telephone || '',
		mobilePhone = req.body.mobilePhone || '',
		email = req.body.email || '',
		weChat = req.body.weChat || '',
		address = req.body.address || '',
		postCode = req.body.postcode || '',
		registerDate = req.body.registerDate || '',
		SerialNumber = req.body.SerialNumber || '';

	client.on("error", function(err){
    	console.log("[Redis] Error:" + err);
	});

	client.hget(username,"Password",function(err,obj){
		if(err){
			console.log("[Get PWD] Error:" + err);
		}else if(obj){
			res.send({datas:"用户名已存在"});
		}else{
			client.hset(username,"Password",password);
			client.hset(username+"_SN","SerialNumber",SerialNumber);
			client.hset(username+"_Status","Status",0);
			client.hmset("User_"+SerialNumber,"UserName",username,
						"RegisterDate",registerDate,"Name",name,"Sex",sex,
						"Telephone",telephone,"MobilePhone",mobilePhone,
						"Email",email,"WeChat",weChat,"Address",address,
						"PostCode",postCode,function(err,response){
				if(err){
					console.log("Error:" + err);
				}else{
					res.send({datas:"注册成功"});
				}
			});
		}
	});
}

exports.changePwd = function (req,res){
	const sha1 = crypto.createHash('sha1'),sha11 = crypto.createHash('sha1');
	const oldPassword = sha1.update(req.body.oldPassword).digest('hex'),
		newPassword = sha11.update(req.body.newPassword).digest('hex'),
		username = req.body.username || '';

	client.on("error", function(err){
    	console.log("[Redis] Error:" + err);
	});

	//00:修改成功 01:原密码输入不正确
	client.hget(username,"Password",(err,obj) => {
		if(err){
			console.log("[Get PWD] Error:" + err);
		}else if(obj != oldPassword){
			res.send("01");
		}else if(obj == oldPassword){
			client.hset(username,"Password",newPassword,(err,obj) => {
				if(err){
					console.log("Error:" + err);
				}else if(obj == 0){
					res.send("00");
				}else{
					res.send("99");
				}
			});
		}
	});
}

