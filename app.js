const express = require('express')
const morgan = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
// routes
const userRouter = require('./routes/userRoute')
const viewsRouter = require('./routes/viewsRoute')

const app = express()

app.use(bodyParser.json())



if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
// render
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('css'));
app.use(cookieParser())

// Routes
app.use('/', viewsRouter)
 
// api routes
app.use('/api/v1/users', userRouter)

module.exports = app