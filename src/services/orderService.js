const { createNewOrder, getOrderByUserId, getOrderById, updateOrderStatus } = require("../repositories/orderRepository")
const { findUser } = require("../repositories/userRepository")
const BadRequestError = require("../utils/badRequestError")
const NotFoundError = require("../utils/notFoundError")
const InternalServerError = require("../utils/internalServerError")
const { getCartByUserId,clearCart} = require("../repositories/cartRepositoty")

async function createOrder(userId, paymentMethod){
    const cart = await getCartByUserId(userId)
    const user = await findUser({ _id:cart.user})
    //console.log(paymentMethod)
    if(!cart){
        throw new NotFoundError
    }
    if(cart.items.length === 0){
        throw new BadRequestError("Cart is empty")
    }
    const orderObject = {};
    orderObject.user = cart.user
    orderObject.items = cart.items.map(cartItem => {
        return { product : cartItem.product._id, quantity : cart.quantity }
    });
    orderObject.status = "ORDERED"
    orderObject.totalPrice = 0

    cart.items.forEach(cartItem => {
        orderObject.totalPrice += cartItem.quantity * cartItem.product.price
    });

    orderObject.address = user.address
    orderObject.paymentMethod = paymentMethod

    //console.log(orderObject)

    const order = createNewOrder(orderObject)

    if(!order){
        throw new InternalServerError()
    }
    await clearCart(userId)
    return order 
}

async function getAllOrdersCreatedByUser(userId){
    const order = await getOrderByUserId(userId)
    if(!order){
        throw new NotFoundError("Order")
    }
    return order
}

async function getOrderDetailsById(orderId){
    const order = await getOrderById(orderId)
    //console.log(order)
    if(!order){
        throw new NotFoundError("Order")
    }
    return order
}

async function updateOrder(orderId, status){
    console.log(orderId)
    console.log(status)
    const order = await updateOrderStatus(orderId, status)
    if(!order){
        throw new NotFoundError("Order")
    }
    return order
}

module.exports = {
    createOrder,
    getAllOrdersCreatedByUser,
    getOrderDetailsById,
    updateOrder
}