require('dotenv').config()

const connectDB = require('./db/connect')
const productsJSON = require('./product.json')
const Product = require('./models/products')

const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI)
        console.log("Connected to DB")
        await Product.deleteMany()
        await Product.create(productsJSON)
        console.log('Success')
        process.exit(0)
    } catch (e){
        console.log(e)
        process.exit(1)
    }
}
start();