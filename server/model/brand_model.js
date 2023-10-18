const mongoose = require ('mongoose');


const brandSchema = mongoose.Schema( {
    name : {
        type : String,
        required : true,
    },
    description : {
        type : String,
    },
    image : [{
        type : String,
    }],
    stocknumber : {
        type : Number,
        min : 0,
        max:200
    },
})

const brandCollection = new mongoose.model('brandCollection',brandSchema);

module.exports = brandCollection;