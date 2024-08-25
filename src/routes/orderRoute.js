const express = require('express');
const { createNewOrder, getAllOrdersByUser, getOrders, cancelOrder, changeOrder } = require('../controllers/orderController');
const { isLoggedIn, isAdmin } = require('../validation/authValidator');
const { getOrderById } = require('../repositories/orderRepository');


const orderRouter = express.Router();

orderRouter.post('/',isLoggedIn, createNewOrder);
orderRouter.get('/',isLoggedIn, getAllOrdersByUser);
orderRouter.get('/:orderId',isLoggedIn, getOrders);
orderRouter.put('/:orderId/cancel',isLoggedIn, cancelOrder);
orderRouter.put('/:orderId/status',isLoggedIn,isAdmin, changeOrder);

module.exports = orderRouter;