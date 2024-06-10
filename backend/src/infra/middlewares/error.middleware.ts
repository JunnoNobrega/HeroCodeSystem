import { NextFunction, Response, Request } from "express";
import { HttpException } from "../../types/httpExceptions";

export function errorMiddleware(
    err:HttpException, 
    req:Request, 
    res: Response, 
    next: NextFunction)
    {
    return res.status(err.status).json({
        status: 500,
        massage: err.message || 'Internal server error',
    })

}