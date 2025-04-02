const express = require('express');
const router = express.Router();
const app = express();
const {authMiddleware } = require('../middleware/auth-middleware');


    // app/this.use(authMiddleware); 
router.get('/welcome' , authMiddleware , (req,res)=>{

    const { userId , username, role } = req.userInfo;   

    res.json({
        messgae: "welcome to home page",
        user: {
            userId,
            username,
            role
        }
    });
});

module.exports = router