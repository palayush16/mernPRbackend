const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req,res,next) => {

    //verify authentication (whether is authorized or not)
    const {authorization} = req.headers

    if(!authorization){
        return res.status(401).json({error: 'Authorization Token Required'})
    }
    //authorization -> "Bearer Token"
    const token = authorization.split(' ')[1]

    try{
        const {_id} = jwt.verify(token, process.env.SECRET)
        req.user= await User.findOne({_id}).select('_id')  //in req we are adding _id so that it becomes easier for further routes
          //it can be anything req.abc in palce of req.user
        next() // to fire actual upcoming request

    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request is not Authorized'})
    }

}

module.exports =requireAuth