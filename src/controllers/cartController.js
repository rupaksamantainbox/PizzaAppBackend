const {model} = require('mongoose')
const { getCart, modifyCart, clearProductFromCart } = require('../services/cartService')
const AppError = require('../utils/appError')

async function getCartByUser(req, res){
    //console.log(req.user.id)
    try {
        const cart = await getCart(req.user.id)
        return res.status(200).json({
            success : true,
            message : "Successfully fetched the cart",
            error : {},
            data : cart
        })
    } catch (error) {
        console.log(error)
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success : false,
                message : error.message,
                error : error,
                data : {}
            })
        }
        return res.status(500).json({
            success : false,
            message : "Something went wrong",
            error : error,
            data : {}
        })
    }
}

async function modifyProductTocart(req, res) {
    try {
         const cart = await modifyCart(req.user.id, req.params.productId, req.params.operation == "add");
         return res.status(200).json({
             success: true,
             message: "Successfully added product to the cart",
             error: {},
             data: cart
         })
    } catch(error) {
         console.log(error);
         if(error instanceof AppError) {
             return res.status(error.statusCode).json({
                 success: false,
                 message: error.message,
                 error: error,
                 data: {}
             })
         }
         return res.status(500).json({
             success: false,
             message: "Something went wrong",
             error: error,
             data: {}
         })
    }
}

async function clearCartById(req, res){
    try {
        const cart = await clearProductFromCart(req.user.id);
        return res.status(200).json({
            success: true,
            message: "Successfully cleared all products to the cart",
            error: {},
            data: cart
        })
   } catch(error) {
        console.log(error);
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: error,
                data: {}
            })
        }
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
            data: {}
        })
   }
}

module.exports = {
    getCartByUser,
    modifyProductTocart,
    clearCartById
}