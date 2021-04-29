const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const validateTwit = celebrate({
  body: Joi.object().keys({
    text: Joi.string().required().min(2).max(140),
  }),
});

const validateTwitId = celebrate({
  params: Joi.object().keys({
    twitId: Joi.string().alphanum().length(24).hex(),
  }),
});

const validateTwitComment = celebrate({
  body: Joi.object().keys({
    text: Joi.string().required().min(2).max(140),
  }),
});

const validateTwitCommentId = celebrate({
  params: Joi.object().keys({
    twitId: Joi.string().alphanum().length(24).hex(),
  }),
});

const {
  getTwits,
  createTwit,
  editTwit,
  deleteTwit,
  likeTwit,
  dislikeTwit,
  getTwitComments,
  createTwitComment,
  editTwitComment,
  deleteTwitComment,
} = require('../controllers/twits');

router.get('/', getTwits);
router.post('/', validateTwit, createTwit);
router.patch('/:twitId', validateTwitId, editTwit);
router.delete('/:twitId', validateTwitId, deleteTwit);
router.put('/:twitId/likes', validateTwitId, likeTwit);
router.delete('/:twitId/likes', validateTwitId, dislikeTwit);

router.get('/:twitId/comments', validateTwitId, getTwitComments);
router.post('/:twitId/comments', validateTwitId, validateTwitComment, createTwitComment);
router.patch('/:twitId/comments/commentId', validateTwitId, validateTwitComment, validateTwitCommentId, editTwitComment);
router.delete('/:twitId/comments/commentId', validateTwitId, validateTwitComment, validateTwitCommentId, deleteTwitComment);

module.exports = router;
