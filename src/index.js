const express = require('express');
const serverConfig = require('./config/serverConfig');
const connectDB = require('./config/dbConfig');
const User = require('./schema/userSchema');
const userRouter = require('./routes/userRoute');
const cartRouter = require('./routes/cartRoute');
const authRouter = require('./routes/authRoute');

const app = express();
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended : true}))

app.use('/users', userRouter)
app.use('/cart', cartRouter)
app.use('/auth', authRouter)

app.post('/ping', (req,res) => {
    console.log(req.body)
    return res.json({message : 'ping'})
})

app.listen(serverConfig.PORT, async() => {
    await connectDB()
    console.log(`Server Started at port ${serverConfig.PORT}`)
})