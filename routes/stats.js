const express=require('express')

//controller functions
const{ statsCount} = require('../controllers/statsController')

const router=express.Router()

//getUserCount routes
router.get('/getStats',statsCount)








module.exports = router