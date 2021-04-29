const Twit = require('../models/twit');
const Comment = require('../models/comment');
const errorHandler = require('../errors/error-handler');
const ForbiddenError = require('../errors/forbidden-error');

module.exports.getResponse = (req, res) => {
  res.send({ message: 'Ответ получен' });
};

module.exports.getTwits = (req, res, next) => {
  Twit.find({})
    .orFail()
    .then((twits) => res.send({ data: twits }))
    .catch((err) => {
      errorHandler(err, next, {
        CastErrorMessage: 'Переданы некорректные данные',
        DocumentNotFoundErrorMessage: 'Твиты не найдены',
      });
    });
};

module.exports.createTwit = (req, res, next) => {
  const { text } = req.body;
  Twit.create({ text, owner: req.user._id })
    .then((twit) => res.send({ data: twit }))
    .catch((err) => {
      errorHandler(err, next, {
        CastErrorMessage: 'Переданы некорректные данные',
        ValidationErrorMessage: 'Ошибка валидации данных',
      });
    });
};

module.exports.editTwit = (req, res, next) => {
  const { twitId } = req.params;
  const { text } = req.body;
  Twit.findById(twitId)
    .orFail()
    .then((twit) => {
      if (twit.owner.equals(req.user._id)) {
        return Twit.findByIdAndUpdate(
          twitId,
          { text },
          {
            new: true,
            runValidators: true,
            upsert: false,
          },
        )
          .orFail()
          .then((updatedTwit) => res.send({ data: updatedTwit }))
          .catch((err) => {
            errorHandler(err, next, {
              CastErrorMessage: 'Переданы некорректные данные',
              DocumentNotFoundErrorMessage: 'Твит с указанным id не найден',
            });
          });
      }
      throw new ForbiddenError('Доступ запрещен. Возможно редактирование только собственного твита');
    })
    .catch((err) => {
      errorHandler(err, next, {
        CastErrorMessage: 'Переданы некорректные данные',
        DocumentNotFoundErrorMessage: 'Твит с указанным id не найден',
      });
    });
};

module.exports.deleteTwit = (req, res, next) => {
  const { twitId } = req.params;
  Twit.findById(twitId)
    .orFail()
    .then((twit) => {
      if (twit.owner.equals(req.user._id)) {
        return Twit.findByIdAndRemove(twitId)
          .orFail()
          .then(res.send({ message: 'Твит удален' }))
          .catch((err) => {
            errorHandler(err, next, {
              CastErrorMessage: 'Переданы некорректные данные',
              DocumentNotFoundErrorMessage: 'Твит с указанным id не найден',
            });
          });
      }
      throw new ForbiddenError('Доступ запрещен. Возможно удаление только собственного твита');
    })
    .catch((err) => {
      errorHandler(err, next, {
        CastErrorMessage: 'Переданы некорректные данные',
        DocumentNotFoundErrorMessage: 'Твит с указанным id не найден',
      });
    });
};

module.exports.likeTwit = (req, res, next) => {
  Twit.findByIdAndUpdate(
    req.params.twitId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((twit) => res.send({ data: twit }))
    .catch((err) => {
      errorHandler(err, next, {
        CastErrorMessage: 'Переданы некорректные данные',
        DocumentNotFoundErrorMessage: 'Твит с указанным id не найден',
      });
    });
};

module.exports.dislikeTwit = (req, res, next) => {
  Twit.findByIdAndUpdate(
    req.params.twitId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((twit) => res.send({ data: twit }))
    .catch((err) => {
      errorHandler(err, next, {
        CastErrorMessage: 'Переданы некорректные данные',
        DocumentNotFoundErrorMessage: 'Твит с указанным id не найден',
      });
    });
};
// Получить комментарии твита
module.exports.getTwitComments = (req, res, next) => {
  const { twitId } = req.params;
  Twit.findById(twitId)
    .orFail()
    .then((twit) => res.send({ data: (twit.comments.length ? twit.comments : 'Комментарии не найдены') }))
    .catch((err) => {
      errorHandler(err, next, {
        CastErrorMessage: 'Переданы некорректные данные',
        DocumentNotFoundErrorMessage: 'Твит с указанным id не найден',
      });
    });
};

module.exports.createTwitComment = (req, res, next) => {
  const { twitId } = req.params;
  const { text } = req.body;
  Comment.create({ text, owner: req.user._id, parentTwit: twitId })
    .then((comment) => {
      console.log('createTwitComment');
      console.log(comment);
      Twit.findByIdAndUpdate(
        twitId,
        { $push: { comments: comment } },
        { new: true },
      )
        .orFail()
        .then(res.send({ data: comment }))
        .catch((err) => {
          errorHandler(err, next, {
            CastErrorMessage: 'Переданы некорректные данные',
            DocumentNotFoundErrorMessage: 'Твит с указанным id не найден',
          });
        });
    })
    .catch((err) => {
      errorHandler(err, next, {
        CastErrorMessage: 'Переданы некорректные данные',
        ValidationErrorMessage: 'Ошибка валидации данных',
      });
    });
};

// Редактирование комментария
module.exports.editTwitComment = (req, res, next) => {
  const { twitId, commentId } = req.params;
  const { text } = req.body;
  console.log(commentId);
  Comment.findById(commentId)
    .orFail()
    .then((comment) => {
      if (comment.parentTwit.toString() === twitId.toString() && comment.owner.equals(req.user._id)) {
        Twit.findByIdAndUpdate(
          twitId,
          { $pull: { comments: comment } },
          { new: true },
        )
          .orFail()
          .catch((err) => {
            errorHandler(err, next, {
              CastErrorMessage: 'Переданы некорректные данные',
              DocumentNotFoundErrorMessage: 'Твит с указанным id не найден',
            });
          });
        return Comment.findByIdAndUpdate(
          commentId,
          { text },
          {
            new: true,
            runValidators: true,
            upsert: false,
          },
        )
          .orFail()
          .then((updatedComment) => {
            Twit.findByIdAndUpdate(
              twitId,
              { $push: { comments: updatedComment } },
              { new: true },
            )
              .orFail()
              .then(res.send({ data: updatedComment }))
              .catch((err) => {
                errorHandler(err, next, {
                  CastErrorMessage: 'Переданы некорректные данные',
                  DocumentNotFoundErrorMessage: 'Твит с указанным id не найден',
                });
              });
            res.send({ data: updatedComment });
          })
          .catch((err) => {
            errorHandler(err, next, {
              CastErrorMessage: 'Переданы некорректные данные',
              DocumentNotFoundErrorMessage: 'Комментарий с указанным id не найден',
            });
          });
      }
      throw new ForbiddenError('Доступ запрещен. Возможно редактирование только собственного комментария');
    })
    .catch((err) => {
      errorHandler(err, next, {
        CastErrorMessage: 'Переданы некорректные данные',
        DocumentNotFoundErrorMessage: 'Комментарий с указанным id не найден ёп',
      });
    });
};

module.exports.deleteTwitComment = (req, res, next) => {
  const { twitId, commentId } = req.params;
  Comment.findByIdAndRemove(commentId)
    .orFail()
    .then((comment) => {
      if (comment.parentTwit.toString() === twitId.toString() && comment.owner.equals(req.user._id)) {
        Twit.findByIdAndUpdate(
          twitId,
          { $pull: { comments: comment } },
          { new: true },
        )
          .orFail()
          .then(res.send({ message: 'Комментарий удален' }))
          .catch((err) => {
            errorHandler(err, next, {
              CastErrorMessage: 'Переданы некорректные данные',
              DocumentNotFoundErrorMessage: 'Твит с указанным id не найден',
            });
          });
      }
      throw new ForbiddenError('Доступ запрещен. Возможно удаление только собственного комментария');
    })
    .catch((err) => {
      errorHandler(err, next, {
        CastErrorMessage: 'Переданы некорректные данные',
        DocumentNotFoundErrorMessage: 'Комментарий с указанным id не найден',
      });
    });
};
