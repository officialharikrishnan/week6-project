const mongoClient=require('mongodb').MongoClient
const state={
    sb:null
}

module.exports.connect=function(done){
    const url="mongodb://localhost:27017"
    const dbname='shoppingCart'

    mongoClient.connect(url,(err,data)=>{
        if(err) return done(err)
        state.db=data.db(dbname)
        done()
        
    })
}

module.exports.get= () => { return state.db }