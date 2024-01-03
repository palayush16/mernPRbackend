const User = require('../models/userModel')
const Workout= require('../models/workoutModel')

//getStats count
const statsCount = async (req, res) => {

    try{
        const getUserCount = await User.countDocuments();
        const getWorkoutCount = await Workout.countDocuments();
        
        res.status(200).json({userCount: getUserCount, workoutCount: getWorkoutCount})
        
    } catch(error) {
        res.status(500).json({error: 'Server Error'}) //catches all error -> both mongoose one and that pre existing email one
    } 
}


module.exports = {statsCount}