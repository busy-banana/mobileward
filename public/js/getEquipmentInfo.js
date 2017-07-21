const client = require('./redis');
const async = require('async');

exports.getEquipmentList = function (req,res){
	const SerialNumber = req.body.SerialNumber;
	let resDataJson = {};

	client.on("error",function(err){
		console.log("[Redis] Error:"+err);
	});

	//依赖访问redis获取的数据，需要同步执行，否则无法返回有效数据
	client.SMEMBERS("UserDev_"+SerialNumber,function(err,obj){
		if(err){
			return console.log("[GetBindSet] Error:" + err);
		}else if(obj){
			async.map(obj, (item,callback) => {
				async.waterfall([
					(callback) => {
						client.HMGET("UserDevHash_"+SerialNumber+"_"+item,"Type","BindTime",(err,data1) => {
							if(err){
								return console.log("[GetBindType] Error:" + err);
							}else{
								callback(null,data1);
							}
						})
					},
					(data1,callback) => {
						//获取设备状态、名称、患者序列号
						client.HMGET("DevHash_"+item,"Status","EquipmentName","PatientSN",(err,data2) => {
							if(err){
								return console.log("[GetEquipmentStatus] Error:" + err);
							}else{
								callback(null,data1,data2);
							}
						})
					},
					(data1,data2,callback) => {
						//获取患者姓名
						client.hget("PInfo_"+data2[2],"Name",(err,data3) => {
							if(err){
								return console.log("[GetPatientName] Error:" + err);
							}else{
								resDataJson.equipmentSN = item;
								resDataJson.bindType = data1[0];
								resDataJson.bindTime = data1[1];
								resDataJson.equipmentStatus = data2[0];
								resDataJson.equipmentName = data2[1];
								resDataJson.patientSN = data2[2];
								resDataJson.patientName = data3;
								callback(null,resDataJson);
							}
						})
					}],
					(err,result) => {
						if(err){
							console.log(err);
						}else{
							callback(null,Object.assign({}, result))
						}
					}
				);
			},
				(err,result) => {
					if(err){
						console.log(err);
					}else{
						res.send(result);
					}
				}
			);
		}else{
			//用户未绑定任何设备
			res.send(00);
		}
	});
}



				/*obj.forEach((item) => {
				client.HMGET("UserDevHash_"+SerialNumber+"_"+item,"Type","BindTime",(err,data1) => {
					if(err){
						return console.log("[GetBindType] Error:" + err);
					}else{
						//获取设备状态、名称、患者序列号
						client.HMGET("DevHash_"+item,"Status","EquipmentName","PatientSN",(err,data2) => {
							if(err){
								return console.log("[GetEquipmentStatus] Error:" + err);
							}else{
								
								//获取患者姓名
								client.hget("PInfo_"+data2[2],"Name",(err,data3) => {
									if(err){
										return console.log("[GetPatientName] Error:" + err);
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
			})*/