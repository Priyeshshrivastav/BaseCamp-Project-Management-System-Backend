require("dotenv").config()
const app=require("./src/app")

const port=process.env.PORT

const ConnectDB=require("./src/DB/db")

ConnectDB()








app.listen(port,()=>{
    console.log("server is running on port 3000")
})





