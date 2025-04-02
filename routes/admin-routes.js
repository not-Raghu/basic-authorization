const express = require('express');
const router = express.Router();

const { authMiddleware } = require('../middleware/auth-middleware');
const { isAdminUser } = require('../middleware/admin-middleware');

router.get('/welcome', authMiddleware , isAdminUser ,  (req,res)=>{
    res.json({
        message: "welcome to admin page"
    });
});

module.exports = router;