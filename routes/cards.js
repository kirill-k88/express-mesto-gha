const router = require('express').Router();
const {
  bodyIdValidator,
  bodyCardValidator,
} = require('../middlewares/celebrateValidation');

const {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getAllCards);
router.delete('/:cardId', bodyIdValidator, deleteCard);
router.post('/', bodyCardValidator, createCard);
router.put('/:cardId/likes', bodyIdValidator, likeCard);
router.delete('/:cardId/likes', bodyIdValidator, dislikeCard);

module.exports = router;
