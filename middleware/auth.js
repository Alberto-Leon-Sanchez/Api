const jwt = require('jsonwebtoken');
const config = require('../config');

function isAuth(req, res, next) {

  const { token } = req.headers;

  if (!token) next(res.status(403).send({ message: 'Access Denied' }));

  jwt.verify(token, config.SECRET_TOKEN, { complete: true }, (err) => {
    if (err) return res.status(501).send({ message: 'Token invalido' });
  });

  next(res.status(200).send({ message: 'Token valido' }));
}

module.exports = {
  isAuth,
};
