const router = require('express').Router();

const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/:userId', getUser);
router.post('/', createUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUser);

module.exports = router;
