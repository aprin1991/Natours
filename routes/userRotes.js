const express = require('express');
const {
  createNewUser,
  deleteUSer,
  getAllUsers,
  getUser,
  updateUser,
} = require('./../controllers/userControllers');

const router = express.Router();
router.route('/').get(getAllUsers).post(createNewUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUSer);

module.exports = router;
