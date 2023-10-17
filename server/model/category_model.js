const mongoose = require ('mongoose');

const categorySchema = mongoose.Schema({
    name : {
        type : String ,
        // required : true,
    },
    description :{
        type : String,

    },
    availableStock :{
        type : Number,
        // required :true,
        min : 0,
        max : 200
    },

})

const categoryCollection = new mongoose.model('categoryCollection', categorySchema);

module.exports = categoryCollection;