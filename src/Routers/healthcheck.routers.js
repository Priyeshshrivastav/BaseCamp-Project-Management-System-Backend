const express=require("express")
const healthCheck=require("../Controllers/healthCheck.controller")

const router=express.Router()



router.get("/",healthCheck)







module.exports=router
