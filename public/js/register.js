var client = require('./redis');
var crypto = require('crypto');

exports.addNewUser = function(req,res){
	var sha1 = crypto.createHash('sha1');
	var username = req.body.username,
		password = sha1.update(req.body.password).digest('hex'),
		sex = req.body.sex,
		name = req.body.name,
		telephone = req.body.telephone,
		mobilePhone = req.body.mobilePhone,
		email = req.body.email,
		weChat = req.body.weChat,
		address = req.body.address,
		postCode = req.body.postcode,
		registerDate = req.body.registerDate,
		SerialNumber = req.body.SerialNumber;

	client.on("error", function(err){
    	console.log("Error:" + err);
	});

	client.hget(username,"Password",function(err,obj){
		if(err){
			console.log("Error:" + err);
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


