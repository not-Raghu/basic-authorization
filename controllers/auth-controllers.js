const { User } = require('../models/Users');
const bcrypt = require('bcrypt');

//register
const registerUser = async(req,res) =>{
    try{

        if(!username || !email || !password){
            return res.status(400).json({
                messgae: "please enter the given fields"
            })
        }
        //extracting data from frontend
        const {username,email, password, role} = req.body;
        
        //check existing user
        const checkexisting = await User.findOne({
            $or: [{username}, {email}]
        });

        if(checkexisting){
            return res.status(400).json({
                message: "User already exits"
            });
        }

        //hasing password
        const hasedPassword = await bcrypt.hash(password,10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            role});

        if(newUser){ 
            return res.status(201).json({
                message: "User created successfully"
            });
        }
        return res.json({
            message: "error creating user , try again later"
        });

    }catch(error){
       res.status(500).json({
            message: "Error occured"
        })
    }
}


//login

const loginUser = async(req,res)=>{
    try{
        
    }catch(e){
        res.json({
            message: "error"
        })
    }
}

module.exports = {
    registerUser,
    loginUser
}