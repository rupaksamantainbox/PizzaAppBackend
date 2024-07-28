const { createProduct } = require('../services/productService')

async function addProduct (req,res) 
{
    //console.log(req.body)
    try {
        const product = await createProduct({
            productName : req.body.productName,
            description : req.body.description,
            imagePath : req.file.path,
            price : req.body.price,
            Category : req.body.Category,
            inStock : req.body.inStock
        })
        return res.status(404).json({
            success : true,
            message : "Successfully created the product",
            data : product,
            error : {}
        })

    } catch (error) {
        console.log(error)
        return res.status(error.statusCode).json({
            success : false,
            message : error.reason,
            data : {},
            error : error
        })
    }
}

module.exports = {
    addProduct
}