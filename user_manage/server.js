const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const connectDB = require('./db/connect');

const PORT = 3000;
const userRoutes = require('./routes/userRoutes')
const mainPageRoutes = require('./routes/mainPageRoutes')



app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));

app.use(cookieParser());

app.use('/user', userRoutes);
app.use('/', mainPageRoutes)


app.set('view engine', 'ejs')


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