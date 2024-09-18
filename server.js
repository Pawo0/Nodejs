const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const PORT = 3000;
const userRoutes = require('./routes/userRoutes')

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/user', userRoutes);

const start = async () => {
    try {
        await connectDB();
        console.log('Connected to DB...')
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}...`)
        })
    } catch (error) {
        console.log(error)
    }

}
start();