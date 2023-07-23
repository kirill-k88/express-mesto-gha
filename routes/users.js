const router = require('express').Router();

const {
  getAllUsers,
  getUser,
  updateUser,
  getCurrentUser,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', getUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUser);

module.exports = router;
