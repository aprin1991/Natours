const Tour = require('./../models/tourModel');

exports.getAllTours = async (req, res) => {
  const controlParams = ['page', 'limit', 'sort'];
  const filterParams = { ...req.query };
  controlParams.forEach(param => {
    delete filterParams[param];
  });

  try {
    let queryStr = JSON.stringify(filterParams);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/, match => `$${match}`);

    const query = Tour.find(JSON.parse(queryStr));

    //sort
    if (req.query.sort) {
      //
      const sortFilter = req.query.sort.split(',').join(' ');
      query.sort(sortFilter);
    } else {
      query.sort('-price');
    }
    const tours = await query;

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tours = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tours
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err
    });
  }
};

exports.createNewTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      message: 'Successfully removed'
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err
    });
  }
};
