const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MarkAsDoneSchema = new Schema({
    catagory:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    start:{
        type:String,
        required:true,
    },
    end:{
        type:String,
        required:true
    },
    day:[String]
},{timestamps:true})

module.exports = mongoose.model('MarkAsDone',MarkAsDoneSchema)