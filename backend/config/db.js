const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const colors = require('colors')

const connectDB = async (pid) =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_LOCAL)
        
        console.log(`Worker ${pid} has connected to ${conn.connection.host} successfully`.underline.green)
    }
    catch(error){
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB