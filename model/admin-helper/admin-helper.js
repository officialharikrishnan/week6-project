const collection = require('../db-connection/collection')
var db=require('../db-connection/dbConnection')
var bcrypt=require('bcrypt')
module.exports={

    adminLogin:(adminData)=>{
        console.log(adminData);
        return new Promise(async(resolve,reject)=>{
            var res = await db.get().collection(collection.ADMIN_COLLECTION).findOne({loginId:parseInt(adminData.id)})
            console.log(res);
            if(res){
                bcrypt.compare(adminData.password,res.password).then((result)=>{
                    if(result) resolve()
                    else reject()
                })                
            }
            else reject()
        })
    },
    getAllUsers:()=>{
        return new Promise(async(resolve,reject)=>{
            var users=await db.get().collection(collection.USER_COLLECTION).find().toArray()
            if(users.length != 0){
                resolve(users)
            }else{
                reject()
            }
        })
    }
}