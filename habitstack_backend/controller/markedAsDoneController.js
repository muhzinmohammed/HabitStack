const { default: mongoose } = require('mongoose')
const Habit = require('../models/habitModel')
const MarkAsDone = require('../models/markAsDoneModel')

const markHabit = async(req,res) =>{
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({error: error.message})
    }
    try{
        const {catagory,name,start,end,day} = req.body
        const MaekedHabit = await MarkAsDone.create({catagory,name,start,end,day})
        const habit = await Habit.findByIdAndDelete({_id: id})
        res.status(200).json(habit)
    } 
    catch(error){
        res.status(400).json({error:error.message})
    }
}

const getMarkAsDone = async (req,res) =>{
    const marked = await MarkAsDone.find({}).sort({createdAt: -1})
    res.status(200).json(marked)
}

const deleteMarkedAsDone = async (req,res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({error: error.message})
    }

    const habit = await MarkAsDone.findByIdAndDelete({_id: id})

    if(!habit){
        return res.status(404).json({error:"habit does not exist"})
    }

    res.status(200).json(habit)
}
module.exports ={
    getMarkAsDone,
    markHabit,
    deleteMarkedAsDone
}
