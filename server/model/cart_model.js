const mongoose = require('mongoose')

const cartSchema = mongoose.Schema ({
    userId : {
        type :mongoose.Schema.Types.ObjectId,
        ref : 'userCollection',
    },
    productId : {
        type : mongoose.Schema.Types.ObjectId,
        ref :'productCollection',
    },
    quantity : {
        type :Number,
        default :1
    },
})

const cartcollection = new mongoose.model('cartcollection', cartSchema);

module.exports = cartcollection;