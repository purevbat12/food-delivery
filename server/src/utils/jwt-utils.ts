const { sign, verify } = require("jsonwebtoken");
const SECRETKEY = "my_secret"; 
export const generateNewToken = (payload: object) => {
    const token = sign(payload, process.env.SECRET_KEY, {expiresIn: "7d"});
    return token;
}
export const verifyToken = (token: string) => {
    return verify(token, SECRETKEY);
}