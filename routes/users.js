const router = require('express').Router();
const {
  bodyIdValidator,
  bodyUserValidator,
  bodyAvatarValidator,
} = require('../middlewares/celebrateValidation');

const {
  getAllUsers,
  getUser,
  updateUser,
  getCurrentUser,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', bodyIdValidator, getUser);
router.patch('/me', bodyUserValidator, updateUser);
router.patch('/me/avatar', bodyAvatarValidator, updateUser);

module.exports = router;
