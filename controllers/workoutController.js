const Workout= require('../models/workoutModel')
const mongoose=require('mongoose')

//get all workouts 
const getWorkouts=async(req,res)=>{
    const user_id=req.user._id
    const workouts= await Workout.find({user_id}).sort({createdAt: -1})  //if find ony with reps 20 then insert ({reps:20})
    res.status(200).json(workouts)

}

//get a single workout 
const getWorkout=async(req,res)=>{
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such Workout'})
    }
    const workout= await Workout.findById(id)
    
    if(!workout){
        return res.status(404).json({error: 'No Such Workout'})  //return to stop and braek from rest of code
    }

    res.status(200).json(workout)
    

}

//create new workout 
const createWorkout= async (req,res)=>{
    
    const {title, load, reps} = req.body
    console.log("Form data Recieved on Server Side: " + title + " " + load+ " " +reps )
    
    //self error handling as mdg returned by mongoose is L
    let emptyFields=[]
    if(!title){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(emptyFields.length>0){
        return res.status(400).json({error: 'Please fill in all the fields ', emptyFields})
    }
    

    //add doc to DB
    try{
        const user_id = req.user._id //thru middleware we added user in req
        const workout=await Workout.create({title, load, reps, user_id})
        res.status(200).json(workout)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

//delete a workout
const deleteWorkout=async (req,res)=>{
    
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such Workout'})
    }
    
    const workout=await Workout.findOneAndDelete({_id: id})
    if(!workout){
        return res.status(400).json({error: 'No Such Workout'})  //return to stop and braek from rest of code
    }  
    res.status(200).json(workout)
}


//update a workout
const updateWorkout= async (req,res) => {
    
    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such Workout'})
    }
    
    const workout= await Workout.findOneAndUpdate({_id:id},{
        ...req.body
    })

    if(!workout){
        return res.status(400).json({error: 'No Such Workout'})  //return to stop and braek from rest of code
    }  
    res.status(200).json(workout)
}


//export
module.exports= {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}