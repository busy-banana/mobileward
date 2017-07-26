const client = require('./redis');
const async = require('async');
client.setMaxListeners(0);

const getTime = () => {
		let nDate = new Date();
		let nYear = nDate.getFullYear();
		let nMonth = nDate.getMonth() + 1;
		let nDay = nDate.getDate();
		let nHour = nDate.getHours();
		let nMin = nDate.getMinutes();
		let nSec = nDate.getSeconds();
		nMonth = nMonth < 10 ? '0' + nMonth : nMonth;
		nDay = nDay < 10 ? '0' + nDay : nDay;
		nHour = nHour < 10 ? '0' + nHour : nHour;
		nMin = nMin < 10 ? '0' + nMin : nMin;
		nSec = nSec < 10 ? '0' + nSec : nSec;
		nDate = nYear + '-' + nMonth + '-' + nDay + ' ' + nHour + ':' + nMin + ':' + nSec;
		return nDate;
}

exports.getEquipmentList = function (req,res){
	const SerialNumber = req.body.serialNumber || '';
	let resDataJson = {};

	client.on("error", function(err){
    	console.log("[Redis] Error:" + err);
	});

	//依赖访问redis获取的数据，需要同步执行，否则无法返回有效数据
	client.SMEMBERS("UserDev_"+SerialNumber,function(err,obj){
		if(err){
			console.log("[GetBindSet] Error:" + err);
			return;
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
			res.send('00');
		}
	});
}

exports.addEquipment = function (req,res){
	const equipmentSN = req.body.equipmentSN || '';
	const equipmentBN = req.body.equipmentBN || '';
	const SerialNumber = req.body.serialNumber || '';
	const bindTime = getTime();

	client.on("error", function(err){
    	console.log("[Redis] Error:" + err);
	});

	//00:绑定成功   01:设备已绑定  02:设备序列号不存在  04:设备绑定码不正确   05:系统异常
	client.HMGET("DeviceBindHash_"+equipmentSN,"Bind","BindID",(err,obj) => {
		if(err){
			console.log("[GetBindStatus] Error:" + err);
			return;
		}else if(obj[0] != null && obj[1] != null){
			if(obj[0] == 1){
				res.send('01');
				return;
			}else if(obj[0] == 0){
				if(obj[1] == equipmentBN){
					client.SADD("UserDev_"+SerialNumber,equipmentSN,(err,obj) => {
						if(err){
							return console.log("[AddEquipmentSN] Error:" + err);
						}else if(obj == 1){
							client.HMSET("UserDevHash_"+SerialNumber+"_"+equipmentSN,"Type",0,"BindTime",bindTime,
								(err,obj) =>{
									if(err){
										return console.log("[AddBindType] Error:" + err);
									}else if(obj == 1){
										res.send('00')
									}else{
										res.send('05');
										
									}
								}
							)
							console.log(obj);
						}else{
							res.send('05');
						}
					})
					res.send('00');
				}else{
					res.send('04');
				}
			}
		}else{
			res.send('02');
		}
	})
}