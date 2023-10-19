const mongoose = require ('mongoose');


const brandSchema = mongoose.Schema( {
    name : {
        type : String,
        required : true,
    },
    description : {
        type : String,
    },
    logo : {
        data : Buffer ,
        contentType : String
    },
   
})

const brandCollection = new mongoose.model('brandCollection',brandSchema);

module.exports = brandCollection;