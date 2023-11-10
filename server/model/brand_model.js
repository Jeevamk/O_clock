const mongoose = require ('mongoose');


const brandSchema = mongoose.Schema( {
    name : {
        type : String,
        required : true,
    },
    description : {
        type : String,
    },
    logo :{
        type : String,
    },
    // croppedData: {
    //     type: String, 
    // },
   
})

const brandCollection = new mongoose.model('brandCollection',brandSchema);

module.exports = brandCollection;