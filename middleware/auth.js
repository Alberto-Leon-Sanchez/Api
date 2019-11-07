const service = require('../services/index');

function isAuth(req, res, next) {
  if (!req.headers.token) next(res.status(403).send({ message: 'Access Denied' }));

  const { token } = req.headers;

  if (service.verifyToken(token)) next(res.status(401).send({ message: 'token invalido' }));

  next();
}

module.exports = {
  isAuth,
};
