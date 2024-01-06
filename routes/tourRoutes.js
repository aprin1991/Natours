const express = require('express');
const {
  createNewTour,
  deleteTour,
  getAllTours,
  getTour,
  updateTour
} = require('./../controllers/tourControllers');

const router = express.Router();

router
  .route('/')
  .get(getAllTours)
  .post(createNewTour);
router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

module.exports = router;
