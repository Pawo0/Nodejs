require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const connectDB = require('./db/connect');
const productsRouter = require('./routes/products')

// Middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.json())

app.get('/', (req,res)=>{
    res.status(200).send('Hello there')
})
app.use('/api/products', productsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const PORT = process.env.PORT || 3000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log('DB connected...')
        app.listen(PORT, ()=>{
            console.log(`Server listening on port ${PORT}...`)
        })
    } catch (e){
        console.log(`errorik ${e}`)
    }
}
start()