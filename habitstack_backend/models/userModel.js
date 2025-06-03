const mongoose = require('mongoose')

const Schema = mongoose.Schema


const userSchema = new Schema({
    userName:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:20
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:function() {
            return !this.googleId
        }
    },
    googleId:{
        type:String,
        unique:true,
        sparse:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    }
})

module.exports = mongoose.model('User',userSchema)
