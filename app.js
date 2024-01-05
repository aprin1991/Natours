const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRotes');

const app = express();
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(morgan('dev'));

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
