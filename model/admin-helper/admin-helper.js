const collection = require('../db-connection/collection')
var db=require('../db-connection/dbConnection')
var bcrypt=require('bcrypt');
const { ObjectId } = require('mongodb');
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
    },
    getEditUser:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            var user=await db.get().collection(collection.USER_COLLECTION).findOne({_id:ObjectId(userId)})
            if(user){
                resolve(user)
            }else{
                reject()
            }
        })
    },
    editUser:(userId,userData)=>{
        return new Promise(async(resolve,reject)=>{
            var res =await db.get().collection(collection.USER_COLLECTION).updateOne({_id:ObjectId(userId)},{
                $set:{
                    name:userData.name,
                    email:userData.email
                }
            })
            if(res){
                resolve(res)
            }else{
                reject()
            }
        })
    },
    removeUser:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            var res = await db.get().collection(collection.USER_COLLECTION).deleteOne({_id:ObjectId(userId)})
            if(res){
                resolve(res)
            }else{
                reject()
            }
        })

    }

}