const Router = require("express").Router();

var contactController = require("../controller/userController");

Router.route("/")
    .get(contactController.getUsers)
    .post(contactController.createUser);

Router.route("/:userId")
    .get(contactController.getUser)
    .delete(contactController.deleteUser)
    .patch(contactController.editUser)
    .put(contactController.replaceUser);

Router.route("/:email")
    .get(contactController.login);
    
module.exports = Router;
