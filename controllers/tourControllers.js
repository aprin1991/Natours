const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.validateCreateTour = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({ statue: 'error', message: 'Invalid Tour' });
  }
  next();
};
exports.checkID = (req, res, next, val) => {
  const id = +val;
  const tour = tours.find(el => el.id === id);
  console.log('tour id is:', val);
  if (!tour) {
    return res.status(404).json({ status: 'error', message: 'Invalid Id' });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  });
};

exports.getTour = (req, res) => {
  const id = +req.params.id;
  const tour = tours.find(el => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
};

exports.createNewTour = (req, res) => {
  const newTourId = tours.at(-1).id + 1;
  // eslint-disable-next-line node/no-unsupported-features/es-syntax
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
          tour: newTour
        }
      });
    }
  );
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<...UPDATED TOUR IS HERE>'
    }
  });
};

exports.deleteTour = (req, res) => {
  const id = +req.params.id;
  if (id > tours.length) {
    return res.status(404).json({
      status: 'Error',
      message: 'Invalid Id'
    });
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
};
