const express = require('express');
const {
  createNewTour,
  deleteTour,
  getAllTours,
  getTour,
  updateTour,
  checkID,
  validateCreateTour
} = require('./../controllers/tourControllers');

const router = express.Router();

router.param('id', checkID);

router
  .route('/')
  .get(getAllTours)
  .post(validateCreateTour, createNewTour);
router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

module.exports = router;
