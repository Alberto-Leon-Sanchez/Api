const Router = require("express").Router();
const bookController = require("../controller/bookController");

Router.route("/")
    .get(bookController.getBooks)
    .post(bookController.createBook);

Router.route("/:bookId")
    .get(bookController.getBook)
    .patch(bookController.editBook)
    .put(bookController.replaceBook)
    .delete(bookController.deleteBook);

Router.route("/:")
    .get(bookController.findBook);