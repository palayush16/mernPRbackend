const express = require('express')
const {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')

const requireAuth = require('../middleware/requireAuth')

//creating instance of router
const router = express.Router()

router.use(requireAuth) //fire this middleware before all below routes

//GET all workouts
router.get('/', getWorkouts)

//GET single workout
router.get('/:id', getWorkout)

//POST a new workout
router.post('/', createWorkout)

//DELETE a workout
router.delete('/:id', deleteWorkout)

//update a workout
router.patch('/:id', updateWorkout)


//exporting instance
module.exports = router