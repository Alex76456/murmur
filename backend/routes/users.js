const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getUserById,
  getUserData,
  updateUserData,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUserData);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().pattern(/[\wа-я\sё]{2,30}/i),
    about: Joi.string().pattern(/[\wа-я\sё]{2,30}/i),
    link: Joi.string().pattern(/^@[-a-zA-Z0-9]{1,10}/i),
  }),
}), updateUserData);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/^https?:\/\/[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&=\/]*)?/i),
  }),
}), updateUserAvatar);
router.get('/:userId', getUserById);

module.exports = router;
