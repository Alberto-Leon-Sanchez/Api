const jwt = require('jsonwebtoken');
const config = require('../config');

function createToken(user) {
  const payLoad = {
    email: user.email,
  };

  return jwt.sign(payLoad, config.SECRET_TOKEN, { expiresIn: 60 * 60 * 24 * 14 });
}

function decodeToken(token) {
  jwt.decode(token, config.SECRET_TOKEN, (err, payload) => {
    if (err) return console.log(`Error al decodificar el token ${err}`);
    return payload;
  });
}

function verifyToken(token) {
  jwt.verify(token, config.SECRET_TOKEN, (err) => {
    if (err) return false;

    return true;
  });
}
module.exports = {
  createToken,
  decodeToken,
  verifyToken,
};