
const isAdminUser = (req,res,next)=>{
    if(req.userInfo.role !== 'admin'){
        return res.json({
            message: "you are unauthorized, only admins can access"
        });
    }
    next();
}

module.exports = {
    isAdminUser
};