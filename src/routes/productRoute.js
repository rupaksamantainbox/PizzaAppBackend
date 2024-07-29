const express = require('express');
const { addProduct, deleteProduct, getProduct } = require('../controllers/productController');
const uploader = require('../middlewares/multerMiddleware');
const { isLoggedIn, isAdmin } = require('../validation.js/authValidator');


const productRouter = express.Router();

productRouter.post('/', isLoggedIn, isAdmin, uploader.single('productImage'), addProduct);
productRouter.get('/:id', getProduct);
productRouter.post('/delete/:id', deleteProduct);

module.exports = productRouter;