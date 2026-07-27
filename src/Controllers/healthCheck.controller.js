const ApiResponse=require("../utils/api-response")

const asyncHandler=require("../utils/async-handler")

// write a 1 method

// const healthCheck=async (req,res,next)=>{
//     try{
//         res.status(200).send(new ApiResponse(200,{message:"Server is running"}))

//     }catch(err){

//      next(err)

//     }
// }

// using async handler

const healthCheck=asyncHandler(
    async (req,res)=>{
        res.status(200).json(
            new ApiResponse(200,{message:"Server is running"})
        )
    }
)




module.exports=healthCheck