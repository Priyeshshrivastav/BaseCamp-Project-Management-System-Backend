const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);
const mongoose=require("mongoose")





async function ConnectDB(){
    try{
    await mongoose.connect(process.env.MONGO_URL)
    console.log("✅ Mongodb is conncted")

    }catch(err){
        console.log("mongodb is not connected",err)
    }
}








module.exports=ConnectDB