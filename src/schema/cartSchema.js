const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({

    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
    items : [
        {
            product : {
                type : mongoose.Schema.Types.ObjectId,
                required : true,
                ref : "Product"
            },
            quantity : {
                type : Number,
                required : true,
                default : 0
            }
        }
    ],
}, {timestamps : true});

const Cart = mongoose.model("Product", cartSchema)

module.exports = Cart