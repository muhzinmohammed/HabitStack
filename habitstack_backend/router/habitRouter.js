const express = require('express')
const router = express.Router()
const {createHabit,getHabit,getCategory,getMarked,getSearch,deleteHabit,markHabitAsDone} = require('../controller/habitController')


// router.post('/',createHabit)
router.get('/',getHabit)
router.post('/',createHabit)
router.get('/category',getCategory)
router.get('/marked',getMarked)
router.get('/search/:id',getSearch)
router.delete('/:id',deleteHabit)
router.post('/mark/:id',markHabitAsDone)
module.exports = router