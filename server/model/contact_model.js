const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    userId : {
        type :mongoose.Schema.Types.ObjectId,
        ref : 'userCollection',
    },
    message : {
        type:String,
        required : true
    }
})

const contactcollection = new mongoose.model('contactcollection', contactSchema);

module.exports = contactcollection;