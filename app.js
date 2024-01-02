const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRotes');

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
  console.log('HELLO FROM MIDDLEWARE');
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`App Running on Port: ${port}`);
});
