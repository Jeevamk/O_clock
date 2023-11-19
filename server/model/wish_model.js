const mongoose = require('mongoose')

const wishSchema = mongoose.Schema({
    userId : {
        type :mongoose.Schema.Types.ObjectId,
        ref : 'userCollection',
    },
    productId : {
        type : mongoose.Schema.Types.ObjectId,
        ref :'productCollection',
    }
})

const wishcollection = new mongoose.model('wishcollection', wishSchema);

module.exports = wishcollection;