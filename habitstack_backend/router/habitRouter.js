const express = require('express')
const router = express.Router()
const {
    createHabit,
    getHabit,
    getCategory,
    getMarked,
    getSearch,
    deleteHabit,
    markHabitAsDone,
    editHabit,
    getCount,
    getTodayCount,
    getMarkedCount} = require('../controller/habitController')


// router.post('/',createHabit)
router.get('/',getHabit)
router.post('/',createHabit)
router.get('/category',getCategory)
router.get('/marked',getMarked)
router.get('/search/:searchValue',getSearch)
router.delete('/:id',deleteHabit)
router.post('/mark/:id',markHabitAsDone)
router.post('/edit/:id',editHabit)
router.get('/count',getCount)
router.get('/count/today',getTodayCount)
router.get('/count/marked',getMarkedCount)

module.exports = router