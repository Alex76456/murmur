const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Котан',
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    unique: true,
  },
  avatar: {
    type: String,
    default: 'https://sun9-20.userapi.com/impf/6fMvMYimCizkrkuu3J2kxmhSNFBG527eDdpxtw/5_W3AOyaePo.jpg?size=960x651&quality=96&proxy=1&sign=60ccc3506cd000b53c36cfa635035129&c_uniq_tag=Rt_H9HOb4LdM66_3x4uLEo40O4LL3zUyMzqdxDo_hnw&type=album',
    validate: {
      validator(link) {
        const regex = /^https?:\/\/[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&\/=]*)?/i;
        return regex.test(link);
      },
      message: 'Некорректная ссылка',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          return user;
        });
    });
}

userSchema.statics.findUserByCredentials = findUserByCredentials;

module.exports = mongoose.model('user', userSchema);
