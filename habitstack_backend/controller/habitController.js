const { default: mongoose } = require('mongoose')
const Habit = require('../models/habitModel')


const createHabit = async (req,res) =>{
    const {category,name,start,end,day} = req.body
    console.log(req.body)
    try{
        const habit = await Habit.create({user:req.user.id,category,name,start,end,day} )
        const habits = await Habit.find({marked: false}).sort({start: 1})
        res.status(200).json(habits)
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
  try{
    const now = new Date();
    const days = ["Su", "M", "T", "W", "Th", "F", "S"];
    const today = days[now.getDay()];
    const habits = await Habit.find({user:req.user.id, marked:false, day: today}).sort({start: 1})
    res.status(200).json(habits)
  }
  catch (error) {
    res.status(500).json({error: "server error: couldn't get habits from database"})
    console.log(error)
  }
}

const getHabitDashboard = async (req,res) =>{
    const now = new Date();
    const days = ["Su", "M", "T", "W", "Th", "F", "S"];
    const today = days[now.getDay()];
    const habits = await Habit.find({user:req.user.id,marked: false, day: today}).sort({start: 1})
    res.status(200).json(habits)
}

const getCategory = async (req,res) =>{
    const {category} = req.query
    const habits = await Habit.find({user:req.user.id,category : category, marked:false}).sort({start: 1})
    res.status(200).json(habits)
}

const getMarked = async (req,res) =>{
    const {marked} = req.query
    const habits = await Habit.find({user:req.user.id,marked : marked }).sort({createdAt: -1})
    res.status(200).json(habits)
}

const getSearch = async (req,res) =>{
    const {searchValue} = req.params
    try {
        const habits = await Habit.find({user:req.user.id,
            $or: [
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
    const habits = await Habit.find({user:req.user.id,marked : !marked }).sort({createdAt: -1})
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

const getCount = async (req, res) => {
    const userId = new mongoose.Types.ObjectId(req.user.id); 
    const allCategories = ['Finance', 'Health', 'Academics', 'Hobbies','Productivity'];
     try {
      const categoryCounts = await Habit.aggregate([
        {$match:{user:userId}},
        {
          $group: {
            _id: "$category",
            count: { $sum: 1 }
          }
        }
      ]);

      const categoryCountMap = categoryCounts.reduce((acc, { _id, count }) => {
        acc[_id] = count;
        return acc;
      }, {});
  
      const result = allCategories.map(category => ({
        category,
        count: categoryCountMap[category] || 0
      }));
      res.status(200).json(result); 
    } 
    catch (error) {
      console.error("Error fetching category counts:", error);
      res.status(500).json({ error: "Internal server error" });
    }
};

const getTodayCount = async (req, res) => {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const now = new Date();
    const days = ["Su", "M", "T", "W", "Th", "F", "S"];
    const today = days[now.getDay()];
    const allCategories = ['Finance', 'Health', 'Academics', 'Hobbies','Productivity'];
     try {
      const categoryCounts = await Habit.aggregate([
        {
          $match: {
            user:userId,
            day: today
          }
        },
        {
          $group: {
            _id: "$category",
            count: { $sum: 1 }
          }
        }
      ]);

      const categoryCountMap = categoryCounts.reduce((acc, { _id, count }) => {
        acc[_id] = count;
        return acc;
      }, {});
  
      const result = allCategories.map(category => ({
        category,
        count: categoryCountMap[category] || 0
      }));
      res.status(200).json(result); 
    } catch (error) {
      console.error("Error fetching category counts:", error);
      res.status(500).json({ error: "Internal server error" });
    }
};

const getHabitsByDay = async (req, res) => {
    const userId = new mongoose.Types.ObjectId(req.user.id);  
    const days = ["Su", "M", "T", "W", "Th", "F", "S"];
     try {
      const habitCounts = await Habit.aggregate([
        {$match: {user:userId}},
        {$unwind: "$day"},
        {
          $group: {
            _id: "$day",
            count: { $sum: 1 }
          }
        }
      ]);

      const habitCountMap = habitCounts.reduce((acc, { _id, count }) => {
        acc[_id] = count;
        return acc;
      }, {});
  
      const result = days.map(day => ({
        day,
        count: habitCountMap[day] || 0
      }));
      res.status(200).json(result); 
    } catch (error) {
      console.error("Error fetching habit counts:", error);
      res.status(500).json({ error: "Internal server error" });
    }
};
const getMarkedCount = async (req, res) => {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const allCategories = ['Finance', 'Health', 'Academics', 'Hobbies','Productivity'];
    try {
      const categoryCounts = await Habit.aggregate([
        {$match: {user:userId,marked: true}},
        {
          $group: {
            _id: "$category",
            count: { $sum: 1 }
          }
        }
      ]);
      const categoryCountMap = categoryCounts.reduce((acc, { _id, count }) => {
        acc[_id] = count;
        return acc;
      }, {});
  
      const result = allCategories.map(category => ({
        category,
        count: categoryCountMap[category] || 0
      }));
      res.status(200).json(result); 
    } catch (error) {
      console.error("Error fetching category counts:", error);
      res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    createHabit,
    getHabit,
    getHabitDashboard,
    getCategory,
    getMarked,
    getSearch,
    deleteHabit,
    editHabit,
    markHabitAsDone,
    getCount,
    getTodayCount,
    getHabitsByDay,
    getMarkedCount
}