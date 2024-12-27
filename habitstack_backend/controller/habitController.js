const { default: mongoose } = require('mongoose')
const Habit = require('../models/habitModel')


const deleteHabit = async (req,res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({error: error.message})
    }

    const habit = await Habit.findByIdAndDelete({_id: id})

    if(!habit){
        return res.status(404).json({error:"habit does not exist"})
    }

    res.status(200).json(habit)
}
const createHabit = async (req,res) =>{
    const {catagory,name,start,end,day} = req.body
    console.log(req.body)
    try{
        const habit = await Habit.create({catagory,name,start,end,day} )
        res.status(200).json(habit)
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

const getHabit = async (req,res) =>{
    const habits = await Habit.find({}).sort({createdAt: -1})
    res.status(200).json(habits)
}


module.exports = {
    createHabit,
    getHabit,
    deleteHabit,
}