const Product = require('../schema/productSchema')
const BadRequestError = require('../utils/badRequestError')

async function createProduct(productDetails){
    try {
        const response = await Product.create(productDetails)
        return response
    } catch (error) {
        
        if(error.name === 'ValidationError') {
            const errorMessageList = Object.keys(error.errors).map((property) => {
                return error.errors[property].message;
            })
            throw new BadRequestError(errorMessageList);
        } 
        console.log(error);
        throw new InternalServerError();
    }
}

async function getProductById(productId){
    try {
        const response = await Product.findById(productId)
        return response
    } catch (error) {
        console.log(error)
    }
}

async function deleteProductById(productId){
    try {
        const response = await Product.findByIdAndDelete(productId)
        return response
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createProduct,
    getProductById,
    deleteProductById

}