const client = require('./redis');

exports.getUserInfo = (req,res) => {
	const SN = req.body.serialNumber;

	client.on("error", function(err){
    	console.log("Error:" + err);
	});

	client.HMGET("User_"+SN,"Name","Sex","Telephone","MobilePhone","Email","WeChat","Address","PostCode",(err,obj) => {
		
		if(err){
			console.log("Error:" + err);
		}else{
			res.send({
				resCode:"00",
				datas:{
					name:obj[0],
					sex:obj[1],
					telephone:obj[2],
					mobilephone:obj[3],
					email:obj[4],
					wechat:obj[5],
					address:obj[6],
					postcode:obj[7]
				}
			});
		}
	});
}

exports.updateUserInfo = (req,res) => {
	const SN = req.body.serialNumber,
		sex = req.body.sex || '',
		name = req.body.name || '',
		telephone = req.body.telephone || '',
		mobilephone = req.body.mobilephone || '',
		email = req.body.email || '',
		wechat = req.body.wechat || '',
		address = req.body.address || '',
		postcode = req.body.postcode || '';

	client.on("error", function(err){
    	console.log("Error:" + err);
	});

	client.HMSET("User_"+SN,"Name",name,"Sex",sex,"Telephone",telephone,"MobilePhone",mobilephone,
	"Email",email,"WeChat",wechat,"Address",address,"PostCode",postcode,(err,obj) => {
		console.log(obj);
		if(err){
			console.log("Error:" + err);
		}else if(obj == "OK"){
			res.send({resCode:"00"});
		}else{
			res.send({resCode:"99"});
		}
	});
}


