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

Router.route("/findBookByISBN/:ISBN")
    .get(bookController.findBookByISBN);

Router.route("/findBookByDescripcion/:descripcion")
    .get(bookController.findBookByDescripcion);

Router.route("/findBookByTitulo/:titulo")
    .get(bookController.findBookByTitulo);

Router.route("/findBookByPrecio/:precio")
    .get(bookController.findBookByPrecio);

Router.route("/findBookByFecha/:fecha")
    .get(bookController.findBookByFecha);

Router.route("/findBookByEditorial/:editorial")
    .get(bookController.findBookByEditorial);

Router.route("/findBookByAutor/:autor")
    .get(bookController.findBookByAutor);

module.exports = Router;