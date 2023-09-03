const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Goal = require('../models/goalModel')
//@des  get goals
//@routw   Get /api/goals

//@access Private

const getGoals = asyncHandler(async(req, res) =>{
    const goals = await Goal.find({user: req.user.id})

    res.status(200).json(goals)
});

//@des  get goals
//@routw   Get /api/goals

//@access Private

const setGoals = asyncHandler(async(req, res) =>{
    if(!req.body.text){
        res.status(400);
        throw new Error("Please add a text field");
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })

    res.status(200).json(goal)
});


//@des  get goals
//@routw   Get /api/goals

//@access Private

const updateGoals = asyncHandler(async(req, res) =>{
    //find the id
    const goal = await Goal.findById(req.params.id)

    //check if goal exists 
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }
     //checking for the user
     const user = await User.findById(req.user.id)
     //make sure the logged in user matches the goal user
     if(goal.user.toString() !== user.id){
         res.status(401)
         throw new Error('User not authorized')
 
     }

    //finding the goal and creating if it doesn't exist
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedGoal);
});

//@des  get goals
//@routw   Get /api/goals

//@access Private
const deleteGoals = asyncHandler(async(req, res) =>{
    //find the id
    const goal = await Goal.findByIdAndDelete(req.params.id)

    //check if goal exists
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }
    //checking for the user
    const user = await User.findById(req.user.id)
    //make sure the logged in user matches the goal user
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')

    }
    await goal.deleteOne()
    // await goal.findByIdandRemove(req.params.id)
    res.status(200).json({id: req.params.id});
});

module.exports = {
    getGoals,
    setGoals,
    deleteGoals,
    updateGoals
}