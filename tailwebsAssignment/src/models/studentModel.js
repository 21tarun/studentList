const mongoose= require('mongoose')


const addStudent= mongoose.Schema({
    name:String,
    subject:{
        Math:{type:Number, default:0},
        Physics:{type:Number, default:0},
        Chemistry:{type:Number, default:0},
        English:{type:Number,default:0}

    },
    isDeleted:{
        type:Boolean,
        default:false
    }
})

module.exports=mongoose.model('student',addStudent)