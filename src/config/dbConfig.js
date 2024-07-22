const mongoose = require('mongoose')
const serverConfig = require('./serverConfig')

async function connectDB(){
    try {
        await mongoose.connect(serverConfig.DB_URL)
        console.log("Database is connected Successfully")
    } catch (error) {
        console.log("Error in Database connection")
        console.log(error)
    }
}

module.exports = connectDB;