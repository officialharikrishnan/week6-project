const collection = require('../db-connection/collection')
var db = require('../db-connection/dbConnection')
var bcrypt = require('bcrypt')
const { ObjectId } = require('mongodb')
module.exports = {

    userSignup: (userData) => {
        return new Promise(async (resolve, reject) => {

            var user = await db.get().collection(collection.USER_COLLECTION).findOne({email:userData.email})
            if(user){
                reject(true)
            }else{

                userData.password = await bcrypt.hash(userData.password, 10)
                var res =await db.get().collection(collection.USER_COLLECTION).insertOne(userData)
                if(res.insertedId){
                    let data={
                        name:userData.name,
                        id:res.insertedId
                    }
                    resolve(data)
                }else{
                    reject()
                }
            }


        })
    },
    userLogin: (userData) => {
        return new Promise(async(resolve, reject) => {
            var res =await db.get().collection(collection.USER_COLLECTION).findOne({ email: userData.email })
            if(res){
                bcrypt.compare(userData.password,res.password).then((result)=>{
                    if(result){
                        let data={
                            name:res.name,
                            id:res._id
                        }
                        resolve(data)
                    }else{
                        reject(false)
                    }
                })
            }else{
                reject(false)
            }
        })
    },
    accountDetails:(userId)=>{
        console.log(ObjectId(userId));
        return new Promise(async(resolve,reject)=>{
            var res=await db.get().collection(collection.USER_COLLECTION).findOne({_id:ObjectId(userId)})
            if(res){
                resolve(res)
            }else{
                reject()
            }
        })
    }

}