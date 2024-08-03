const { createOrder, getAllOrdersCreatedByUser, getOrderDetailsById, updateOrder } = require("../services/orderService");
const AppError = require("../utils/appError");

async function createNewOrder(req,res){
    try {
        const order = await createOrder(req.user.id, req.body.paymentMethod)

        return res.status(200).json({
            success : true,
            message : "Successfully created the order",
            data : order,
            error : {}
        })
    } catch (error) {
        if(error instanceof AppError) {
            console.log(error)
            return res.status(error.statusCode).json({
                success : false,
                message : error.reason,
                data : {},
                error : error
            })
        }
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            data: {},
            error: error
        });
    }
}

async function getAllOrdersByUser(req,res){
    try {
        const order = await getAllOrdersCreatedByUser(req.user.id)
        
        return res.status(200).json({
            success : true,
            message : "Successfully fetched the order",
            data : order,
            error : {}
        })
    } catch (error) {
        if(error instanceof AppError) {
            console.log(error)
            return res.status(error.statusCode).json({
                success : false,
                message : error.reason,
                data : {},
                error : error
            })
        }
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            data: {},
            error: error
        });
    }
}

async function getOrders(req,res){
    try {
        const order = await getOrderDetailsById(req.params.orderId)
        
        return res.status(200).json({
            success : true,
            message : "Successfully fetched the order",
            data : order,
            error : {}
        })
    } catch (error) {
        if(error instanceof AppError) {
            console.log(error)
            return res.status(error.statusCode).json({
                success : false,
                message : error.reason,
                data : {},
                error : error
            })
        }
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            data: {},
            error: error
        });
    }
}

async function cancelOrder(req,res){
    try {
        const order = await updateOrder(req.params.orderId, "CANCELLED")
        
        return res.status(200).json({
            success : true,
            message : "Successfully Cancelled the order",
            data : order,
            error : {}
        })
    } catch (error) {
        if(error instanceof AppError) {
            console.log(error)
            return res.status(error.statusCode).json({
                success : false,
                message : error.reason,
                data : {},
                error : error
            })
        }
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            data: {},
            error: error
        });
    }
}

async function changeOrder(req,res){
    try {
        const order = await updateOrder(req.params.orderId, req.body.status)
        
        return res.status(200).json({
            success : true,
            message : "Successfully Changed the order Status",
            data : order,
            error : {}
        })
    } catch (error) {
        if(error instanceof AppError) {
            console.log(error)
            return res.status(error.statusCode).json({
                success : false,
                message : error.reason,
                data : {},
                error : error
            })
        }
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            data: {},
            error: error
        });
    }
}


module.exports = {
    createNewOrder,
    getAllOrdersByUser,
    getOrders,
    cancelOrder,
    changeOrder
}