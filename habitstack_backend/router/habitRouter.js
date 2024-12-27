const express = require('express')
const router = express.Router()
const {createHabit,getHabit,deleteHabit} = require('../controller/habitController')
const {markHabit,getMarkAsDone,deleteMarkedAsDone} = require('../controller/markedAsDoneController')

// router.post('/',createHabit)
router.get('/',getHabit)
router.post('/',createHabit)
router.delete('/:id',deleteHabit)
router.post('/mark/:id',markHabit)
router.get('/marked',getMarkAsDone)
router.delete('/marked/:id',deleteMarkedAsDone)
module.exports = router