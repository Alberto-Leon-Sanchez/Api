const jwt = require('jsonwebtoken');
const config = require('../config');

function isAuth(req, res, next) {
  const { token } = req.headers;

  if (!token) next(res.status(403).send({ message: 'Access Denied' }));

  jwt.verify(token, config.SECRET_TOKEN, { complete: true }, (err, tokenDecoded) => {
    if (err) return res.status(501).send({ message: 'Token invalido' });
    res.id = tokenDecoded.payload.sub;
  });
  next();
}


module.exports = {
  isAuth,
};
