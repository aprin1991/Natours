const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  const id = +req.params.id;
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'error',
      data: {},
      message: 'Invalid Id',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.createNewTour = (req, res) => {
  const newTourId = tours.at(-1).id + 1;
  const newTour = { id: newTourId, ...req.body };
  console.log(newTour);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    () => {
      res.status(200).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  const id = +req.params.id;
  if (id > tours.length) {
    return res.status(404).json({
      status: 'Error',
      data: {},
      message: 'Invalid Id',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<...UPDATED TOUR IS HERE>',
    },
  });
};

exports.deleteTour = (req, res) => {
  const id = +req.params.id;
  if (id > tours.length) {
    return res.status(404).json({
      status: 'Error',
      message: 'Invalid Id',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};
