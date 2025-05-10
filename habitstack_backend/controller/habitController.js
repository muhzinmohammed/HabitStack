const { default: mongoose } = require('mongoose')
const Habit = require('../models/habitModel')


const createHabit = async (req,res) =>{
    const {category,name,start,end,day} = req.body
    console.log(req.body)
    try{
        const habit = await Habit.create({category,name,start,end,day} )
        res.status(200).json(habit)
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

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

const getHabit = async (req,res) =>{
    const habits = await Habit.find({marked: false}).sort({start: -1})
    res.status(200).json(habits)
}

const getCategory = async (req,res) =>{
    const {category} = req.query
    const habits = await Habit.find({category : category, marked:false}).sort({createdAt: -1})
    res.status(200).json(habits)
}

const getMarked = async (req,res) =>{
    const {marked} = req.query
    const habits = await Habit.find({marked : marked }).sort({createdAt: -1})
    res.status(200).json(habits)
}

const getSearch = async (req,res) =>{
    const {searchValue} = req.params
    try {
        const habits = await Habit.find(
            {$or: [
                {name: { $regex: '^'+searchValue, $options: 'i' }},
                {category: { $regex: '^'+searchValue, $options: 'i' }}
            ]});

        res.status(200).json(habits);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
}

const markHabitAsDone = async (req,res) =>{
    const {id} = req.params
    const {marked} = req.body
    console.log(marked)
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "habit does not exist"})
    }
    const habit = await Habit.findByIdAndUpdate({_id: id},{marked: marked})
    const habits = await Habit.find({marked : !marked }).sort({createdAt: -1})
    if (!habit){
        return res.status(404).json({error: "updation failes"})
    }
    res.status(200).json(habits)
}

const editHabit = async (req,res) =>{
    const {id} = req.params
    const {category,name,start,end,day} = req.body
    console.log("edited")
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "habit does not exist"})
    }
    const habit = await Habit.findByIdAndUpdate({_id: id},{category:category, name:name, start:start, end:end, day:day})
    if(!habit){
        return res.status(404).json({error:"habit does not exist"})
    }

    res.status(200).json(habit)
}

module.exports = {
    createHabit,
    getHabit,
    getCategory,
    getMarked,
    getSearch,
    deleteHabit,
    editHabit,
    markHabitAsDone
}