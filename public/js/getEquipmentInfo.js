const client = require('./redis');



exports.getEquipmentList = function (req,res){
	const SerialNumber = req.body.SerialNumber;
	let resData = [], resDataJson = {};

	client.on("error",function(err){
		console.log("[Redis] Error:"+err);
	});

	client.SMEMBERS("UserDev_"+SerialNumber,function(err,obj){
		if(err){
			console.log("[GetBindSet] Error:" + err);
		}else if(obj){
			obj.forEach((item) => {
				resDataJson.equipmentSN = item;
				client.HMGET("UserDevHash_"+SerialNumber+"_"+item,"Type","BindTime",(err,obj) => {
					if(err){
						console.log("[GetBindType] Error:" + err);
					}else{
						resDataJson.bindType = obj[0];
						resDataJson.bindTime = obj[1];
					}
				});
				//获取设备状态、名称、患者序列号
				client.HMGET("DevHash_"+item,"Status","EquipmentName","PatientSN",(err,obj) => {
					if(err){
						console.log("[GetEquipmentStatus] Error:" + err);
					}else{
						resDataJson.equipmentStatus = obj[0];
						resDataJson.equipmentName = obj[1];
						resDataJson.patientSN = obj[2];
						
						//获取患者姓名
						client.hget("PInfo_"+obj[2],"Name",(err,obj) => {
							if(err){
								console.log("[GetPatientName] Error:" + err);
							}else{
								resDataJson.patientName = obj;
				console.log(resDataJson);
							}
						});
					}
				});
			});


		}else{
			//用户未绑定任何设备
			res.send(00);
		}
	});







}