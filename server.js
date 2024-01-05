const mongoose = require('mongoose');
const app = require('./app');

const DB = process.env.MONGODB.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,

    useUnifiedTopology: true
  })
  .then(con => {
    console.log(con.connections);
    console.log('Db connected Successfully!');
  });

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App Running on Port: ${port}`);
});
