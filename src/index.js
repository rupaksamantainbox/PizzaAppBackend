const express = require('express');
const cookieParser = require ('cookie-parser');
const serverConfig = require('./config/serverConfig');
const connectDB = require('./config/dbConfig');
const userRouter = require('./routes/userRoute');
const cartRouter = require('./routes/cartRoute');
const authRouter = require('./routes/authRoute');
const productRouter = require('./routes/productRoute');
const orderRouter = require('./routes/orderRoute')
const cors = require('cors')

const app = express();

app.use(cors({
    origin :  serverConfig.FRONTEND_URL,
    credentials : true
}))
app.use(cookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended : true}))

app.use('/users', userRouter)
app.use('/carts', cartRouter)
app.use('/auth', authRouter)
app.use('/products', productRouter)
app.use('/orders',orderRouter)

app.get('/ping', (req,res) => {
    console.log(req);
    return res.json({message : 'ping'})
})

app.listen(serverConfig.PORT, async() => {
    await connectDB()
    console.log(`Server Started at port ${serverConfig.PORT}`)
})