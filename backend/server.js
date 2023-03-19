const path = require('path')
const express = require('express')
const helmet = require('helmet')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 8080
const os = require('os')
const cluster = require('cluster')
const colors = require('colors')
const connectDB = require('./config/db')
//const {errorHandler} = require('./middleware/errorMiddleware')

connectDB(process.pid)
const app = express()



const cors = require("cors");
const compression = require('compression')

const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
	windowMs: 2 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.use(limiter)
app.use(helmet())
app.use(compression())
app.use('*', cors())    
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api/recipes', require('./routes/recipeRoutes'))
app.use('/api/ingrids', require('./routes/ingridsRoutes'))



if (cluster.isMaster) {
 
    console.log(`Master ${process.pid} is running`)
  
    
    for (let i = 0; i < os.cpus().length; i++) {
      cluster.fork()
    }
  
    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`.grey)
      cluster.fork()
    })
  } 
  else {
    app.listen(port, () => console.log(`Worker ${process.pid} is listening on port ${port}`.green))
    
  }


