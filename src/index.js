const express = require('express');
const serverConfig = require('./config/serverConfig');
const connectDB = require('./config/dbConfig');
//const bodyParser = require('body-parser');
const User = require('./schema/userSchema');

const app = express();
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended : true}))

app.post('/ping', (req,res) => {
    console.log(req.body)
    return res.json({message : 'ping'})
})

app.listen(serverConfig.PORT, async() => {
    await connectDB()
    console.log(`Server Started at port ${serverConfig.PORT}`)

    // const newUser = await User.create({
    //     firstName : 'Rupak',
    //     lastName : 'Samanta',
    //     email : 'rupaksamantainbox@gmail.com',
    //     password : '123456',
    //     mobileNumber : '6297881143'
    // })

    // console.log("Created new User" , newUser);
})