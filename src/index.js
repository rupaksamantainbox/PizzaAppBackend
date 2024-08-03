const express = require('express');
const cookieParser = require ('cookie-parser');
const serverConfig = require('./config/serverConfig');
const connectDB = require('./config/dbConfig');
const userRouter = require('./routes/userRoute');
const cartRouter = require('./routes/cartRoute');
const authRouter = require('./routes/authRoute');
const { isLoggedIn } = require('./validation.js/authValidator');
const uploader = require('./middlewares/multerMiddleware');
const cloudinary = require('./config/cloudinaryConfig');
const fs = require('fs/promises');
const productRouter = require('./routes/productRoute');
const orderRouter = require('./routes/orderRoute')

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended : true}))

app.use('/users', userRouter)
app.use('/cart', cartRouter)
app.use('/auth', authRouter)
app.use('/products', productRouter)
app.use('/orders',orderRouter)

app.post('/ping', isLoggedIn, (req,res) => {
    //console.log(req.body)
    //console.log(req.cookies)
    return res.json({message : 'ping'})
})

app.listen(serverConfig.PORT, async() => {
    await connectDB()
    console.log(`Server Started at port ${serverConfig.PORT}`)
})