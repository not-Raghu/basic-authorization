const Users = require('../models/Users');
const { User } = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//register
const registerUser = async(req,res) =>{
    try{

 
        //extracting data from frontend
        const {username,email, password, role} = req.body;

        if(!username || !email || !password){
            return res.status(400).json({
                messgae: "please enter the given fields"
            })
        }
        
        //check existing user
        const checkexisting = await User.findOne({
            $or: [{email} , {username}]
        })

        if(checkexisting){
            return res.status(400).json({
                message: "User already exits"
            });
        }

        //hasing password
        const hashedPassword = await bcrypt.hash(password,10);

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
       return res.status(500).json({
            message: "Error occured"
        })
    }
}


//login
const loginUser = async(req,res)=>{
    try{
        const { username , password } = req.body;

        const foundUser = await User.findOne({username});

        if(!foundUser){
            return res.status(400).json({
                message: "invalid credentials"
            });
        }

        //comparing passwords 
        const validpassword = await bcrypt.compare(password,foundUser.password);

        if(!validpassword){
            return res.json({   
                message: "invalid password"
            });
        }

        const token = jwt.sign({
            userId: foundUser._id,
            username: foundUser.username,
            role: foundUser.role
        },process.env.JWT_SECRET,{
            expiresIn: '1h'
        });

        res.json({
            message: "User logged in",
            token: token    
        });
        

    }catch(error){
        console.log(error)
        res.json({
            message: "error"
        });
    }
}

module.exports = {
    registerUser,
    loginUser
}