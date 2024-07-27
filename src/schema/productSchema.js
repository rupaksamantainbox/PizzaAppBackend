const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    
    productName : {
        type : String,
        required : [true,"Product Name is Required"],
        minlength : [5, "Product Name must be at least 5 Charecters"],
        lowercase : true,
        trim : true,
    },
    description : {
        type : String,
        minlength : [20, "Product Name must be at least 20 Charecters"],
        lowercase : true,
        trim : true,
    },
    productImage : {
        type : String
    },
    price : {
        type : Number,
        required : [true,"Price is Required"]
    },
    Category : {
        type : String,
        enum : ['veg', 'non-veg', 'drinks', 'sides'],
        default : 'veg'
    },
    inStock : {
        type : Boolean,
        required : [true,"In stock status is Required"],
        default : true
    }
}, { 
    timestamps : true
});

const Product = mongoose.model("Product", productSchema)

module.exports = Product
