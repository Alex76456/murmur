const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const validateTwit = celebrate({
	body: Joi.object().keys({
		text: Joi.string().required().min(2).max(140),
		name: Joi.string().required().min(2).max(140),
		link: Joi.string().required().min(2).max(140)
	})
});

const validateTwitId = celebrate({
	params: Joi.object().keys({
		twitId: Joi.string().alphanum().length(24).hex()
	})
});

const validateTwitComment = celebrate({
	body: Joi.object().keys({
		text: Joi.string().required().min(1).max(140),
		name: Joi.string().required().min(2).max(140)
	})
});

const validateTwitCommentId = celebrate({
	params: Joi.object().keys({
		twitId: Joi.string().alphanum().length(24).hex(),
		commentId: Joi.string().alphanum().length(24).hex()
	})
});

const {
	// getResponse,

	createTwit,
	editTwit,
	deleteTwit,
	likeTwit,
	dislikeTwit,
	getTwitComments,
	createTwitComment,
	editTwitComment,
	deleteTwitComment
} = require('../controllers/twits');

router.post('/', validateTwit, createTwit);
router.patch('/:twitId', validateTwitId, editTwit);
router.delete('/:twitId', validateTwitId, deleteTwit);
router.put('/:twitId/likes', validateTwitId, likeTwit);
router.delete('/:twitId/likes', validateTwitId, dislikeTwit);

router.get('/:twitId/comments', validateTwitId, getTwitComments);
router.post('/:twitId/comments', validateTwitId, validateTwitComment, createTwitComment);
router.patch(
	'/:twitId/comments/:commentId',
	validateTwitCommentId,
	validateTwitComment,
	editTwitComment
);
router.delete(
	'/:twitId/comments/:commentId',
	validateTwitCommentId,
	validateTwitComment,
	deleteTwitComment
);

module.exports = router;
