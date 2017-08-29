const client = require('./redis');
const async = require('async');

exports.getMemberList = function (req,res){
    const equipmentSN = req.body.equipmentSN;

    client.on("error",function(err){
        console.log("[Redis] Error:" + err);
    });

    client.SMEMBERS("DevUserSet_"+equipmentSN,(err,obj) => {
        if(err){
			console.log("[GetMembers] Error:" + err);
            return;
		}else if(obj.length > 0){
/*
    DevUserHash_设备序列号_用户序列号
    User_用户序列号

*/            
            async.map(obj,(item,callback) => {
                async.parallel([
                    (callback) => {
                        client.HMGET()
                    },
                    (callback) => {
                        
                    }
                ],(err,result) => {
                    if(err){
                        console.log(err);
                    }else{
                        callback(null,Object.assign({}, result))
                    }
                })
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
            //设备未绑定任何用户
            res.send({resCode: '98'});
        }
    });
}