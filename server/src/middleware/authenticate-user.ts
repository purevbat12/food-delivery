import { RequestHandler } from "express"
export const authenticateUser: RequestHandler = (req, res, next) => {
    const { user } = req.body;
    if(user.role != "Admin"){
        res.json({message: "You are not authorized to do this action!"});
        return;
    }
    next(); 
}