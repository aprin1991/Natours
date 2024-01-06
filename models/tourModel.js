const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tour name is required'],
    unique: true
  },
  rate: {
    type: Number,
    default: 4.5
  },
  price: {
    type: Number,
    required: [true, 'Price is required']
  }
});

const Tour = mongoose.model('tour', tourSchema);

module.exports = Tour;
