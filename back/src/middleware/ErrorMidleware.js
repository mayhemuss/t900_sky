import { ApiError } from "../error/index.js";

 const ErrorMidleware = (err,req,res,next)=>{
    if (err instanceof ApiError){
       return res.status(err.status).json({message:err.message})
    }
    return res.status(500).json({message:"oops"})
}

export default ErrorMidleware;
