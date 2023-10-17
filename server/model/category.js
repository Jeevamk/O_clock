const mongoose = require ('mongoose');

const categorySchema = mongoose.Schema({
    name : {
        type : String ,
        required : true,
    },
    color : {
        type : String,
        
    },
    availableStock :{
        type : Number,
        required :true,
        min : 0,
        max : 200
    },

})

exports.Category = mongoose.model('Category',categorySchema);