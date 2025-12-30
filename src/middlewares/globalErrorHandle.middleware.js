import { ApiError } from "../utils/apiErrors.js";

const globalErrorHandle = (err, req, res, next) => {
    let status = 500;
    
    if((err instanceof ApiError)){
        let errorJson = {
            status: err.status,
            message: err.message,
        }
        
        // errorJson.stack = err.stack;
        // errorJson.error = err;
        
        res.status(err.statusCode).send({error:{...errorJson}});
    }
    else{
        res.status(status).send({
            error: {
                status: "error",
                message: err.message,
                error: err,
                stack: err.stack,
            }
        })
    }
};

export default globalErrorHandle;