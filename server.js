const express = require('express')
const dotenv = require('dotenv').config()
const errorHandler = require('./middleware/errorHandler.js')
const connectDb = require('./config/dbConnection.js')
connectDb()

const app = express()

//Middleware
app.use(express.json())
app.use('/api/contacts', require('./routes/contactRoutes.js'))

app.use('/api/users/', require('./routes/userRoutes.js'))

app.use(errorHandler) //Executed automatically whenever the errors (exceptions occurs)


const port = process.env.PORT || 5000 
app.listen(port, () => {
    console.log(`Server is running on Port ${port}`)  
})
