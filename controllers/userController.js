const User = require('../models/userModel')
const jwt = require('jsonwebtoken')


//create token function
const createToken = (_id)=>{   //_id will be the part of payload of jwt
    return jwt.sign({_id: _id}, process.env.SECRET, {expiresIn: '3d'}) 
}

//login user
const loginUser = async (req, res) => {

    const {email, password} = req.body
    console.log(req.body)
    try{
        const user= await User.login(email, password)
    
        //create a token for logged in user
        const token = createToken(user._id)
        
        res.status(200).json({email, token})
        
    } catch(error) {
            res.status(400).json({error: error.message}) //catches all error -> both mongoose one and that pre existing email one
    }


    
}


//signup user
const signupUser = async (req, res) => {
   const {email, password} = req.body

   try{
    const user= await User.signup(email, password)

    //create a token for signed up user
    const token = createToken(user._id)

    res.status(200).json({email, token})
    
   } catch(error) {
        res.status(400).json({error: error.message}) //catches all error -> both mongoose one and that pre existing email one
   }
}

module.exports = {signupUser, loginUser}