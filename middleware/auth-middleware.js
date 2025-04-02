const jwt = require('jsonwebtoken');

const authMiddleware = (req,res,next) =>{
    const authHeader = req.headers['authorization'];
    if(!authHeader){
        return res.status(401).json({
            message: "token is missing"
        });
    }


    //bearer tokens sent in - "Bearer `token` " , use split and authenticate the needed one
    const token = authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json({
            message: "token is missing"
        });
    }

    try{
        const decodedUserInfo = jwt.verify(token,process.env.JWT_SECRET);
        req.userInfo = decodedUserInfo;
        next();
        
    }catch(error){
        console.log(error);
        return res.json({
            message: "invalid token"
        })
    }
}

module.exports = {
    authMiddleware
}