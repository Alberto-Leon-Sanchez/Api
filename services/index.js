const jwt = require('jsonwebtoken');
const config = require('../config');

function createToken(user) {
  const payLoad = {
    sub: user._id,
  };

  return jwt.sign(payLoad, config.SECRET_TOKEN, { expiresIn: 60 * 60 * 24 * 14 });
}

function decodeToken(token) {
  jwt.decode(token, config.SECRET_TOKEN, (err, payload) => {
    if (err) return console.log(`Error al decodificar el token ${err}`);
    return payload;
  });
}

module.exports = {
  createToken,
  decodeToken,
};
