const mongoose = require('mongoose')

const Schema = mongoose.Schema


const habitSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        index:true
    },
    category:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    start:{
        type:Date,
        required:true,
    },
    end:{
        type:Date,
        required:true
    },
    marked:{
        type:Boolean,
        default:false
    },
    day:[String]
},{timestamps:true})

module.exports = mongoose.model('Habit',habitSchema)
