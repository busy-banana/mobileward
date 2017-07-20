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
				client.HMGET("UserDevHash_"+SerialNumber+"_"+item,"Type","BindTime",(err,data1) => {
					if(err){
						console.log("[GetBindType] Error:" + err);
					}else{
						//获取设备状态、名称、患者序列号
						client.HMGET("DevHash_"+item,"Status","EquipmentName","PatientSN",(err,data2) => {
							if(err){
								console.log("[GetEquipmentStatus] Error:" + err);
							}else{
								
								//获取患者姓名
								client.hget("PInfo_"+data2[2],"Name",(err,data3) => {
									if(err){
										console.log("[GetPatientName] Error:" + err);
									}else{
										resDataJson.equipmentSN = item;
										resDataJson.equipmentStatus = data2[0];
										resDataJson.equipmentName = data2[1];
										resDataJson.patientSN = data2[2];
										resDataJson.patientName = data3;
										resDataJson.bindType = data1[0];
										resDataJson.bindTime = data1[1];
										resData.push(resDataJson);
									}
								});
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