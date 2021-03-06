const Router = require('express').Router();

const middleware = require('../middleware/auth');
const contactController = require('../controller/userController');

Router.route('/')
  .get(contactController.getUsers)
  .post(contactController.createUser);

Router.route('/:userId')
  .get(contactController.getUser)
  .delete(contactController.deleteUser)
  .patch(contactController.editUser)
  .put(contactController.replaceUser);

Router.route('/login')
  .post(contactController.login);


Router.route('/me/token')
  .get(middleware.isAuth, contactController.loginToken);

module.exports = Router;
