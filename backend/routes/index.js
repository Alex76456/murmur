const router = require('express').Router();
const userRouter = require('./users');
const twitRouter = require('./twits');
const notFoundRouter = require('./notFoundRouter');

router.use('/users', userRouter);
router.use('/twits', twitRouter);
router.use('*', notFoundRouter);

module.exports = router;
