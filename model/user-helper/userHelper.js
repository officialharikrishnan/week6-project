const collection = require('../db-connection/collection')
var db = require('../db-connection/dbConnection')
var bcrypt = require('bcrypt')
module.exports = {

    userSignup: (userData) => {
        return new Promise(async (resolve, reject) => {
            userData.password = await bcrypt.hash(userData.password, 10)
            var res =await db.get().collection(collection.USER_COLLECTION).insertOne(userData)
            if(res.insertedId){
                resolve(res)
            }else{
                reject()
            }
        })
    },
    userLogin: (userData) => {
        return new Promise(async(resolve, reject) => {
            var res =await db.get().collection(collection.USER_COLLECTION).findOne({ email: userData.email })
            if(res){
                bcrypt.compare(userData.password,res.password).then((result)=>{
                    if(result){
                        resolve(result)
                    }else{
                        reject()
                    }
                })
            }else{
                reject()
            }
        })
    }

}