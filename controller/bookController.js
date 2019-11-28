const Books = require('../model/bookModel');

function getBooks(req, res) {
  Books.find({}, (err, books) => {
    if (err) return res.status(500).send({ err });

    return res.status(200).send(books);
  });
}

function getBook(req, res) {
  Books.findById(req.params, (err, book) => {
    if (err) return res.status(404).send({ message: 'Book not found', err });

    return res.status(200).send({ book });
  });
}

function createBook(req, res) {
  const book = new Books(req.body);

  book.save((err, newBook) => {
    if (err) return res.status(400).send({ message: 'Error saving book', err });

    return res.status(200).send({ message: 'Book save', newBook });
  });
}

function replaceBook(req, res) {
  const { bookId } = req.params;
  const { titulo } = req.body;
  const { ISBN } = req.body;
  const { descripcion } = req.body;
  const { fechaPublicacion } = req.body;
  const { precio } = req.body;
  const { editorial } = req.body;
  

  if (!bookId || !titulo || !ISBN || !descripcion || !fechaPublicacion || !precio || !editorial) {
    return res.status(400).send({ message: 'Missing parameters' });
  }

  Books.findById(bookId, (err) => {
    if (err) return res.status(404).send({ message: 'Book not found' });
  });

  Books.replaceOne(req.body, (err, replacement) => {
    if (err) return res.status(500).send({ err });

    return res.status(200).send({ message: 'Book replace' }, replacement);
  });
}

function editBook(req, res) {
  const { bookId } = req.params;

  Books.findByIdAndUpdate(bookId, req.body, (err, book) => {
    if (err) return res.status(500).send({ err });
    if (!book) return res.status(404).send({ message: 'Book not found' });

    return res.status(200).send({ message: 'Book edited', book });
  });
}

function deleteBook(req, res) {
  const { bookId } = req.params;

  Books.findByIdAndRemove(bookId, (err, book) => {
    if (err) return res.status(500).send({ err });
    if (!book) return res.status(404).send({ message: 'Book not found' });

    return res.status(200).send({ message: 'Book deleted', book });
  });
}

function findBookByISBN(req, res) {
  const { ISBN } = req.params;

  Books.find({ ISBN }, (err, book) => {
    if (err) return res.status(500).send({ err });
    if (!book) return res.status(404).send({ message: 'Book not found' });

    return res.status(200).send(book);
  });
}

function findBookByFecha(req, res) {
  const fechaPublicacion = req.params.fecha;

  Books.find({ fechaPublicacion }, (err, book) => {
    if (err) return res.status(500).send({ err });
    if (!book) return res.status(404).send({ message: 'Book not found' });

    return res.status(200).send(book);
  });
}

function findBookByTitulo(req, res) {
  const { titulo } = req.params;

  Books.find({ titulo }, (err, book) => {
    if (err) return res.status(500).send({ err });
    if (!book) return res.status(404).send({ message: 'Book not found' });

    return res.status(200).send(book);
  });
}

function findBookByAutor(req, res) {
  const { autor } = req.params;

  Books.find({ autor }, (err, book) => {
    if (err) return res.status(500).send({ err });
    if (!book) return res.status(404).send({ message: 'Book not found' });

    return res.status(200).send(book);
  });
}

function findBookByDescripcion(req, res) {
  const { descripcion } = req.params;

  Books.find({ descripcion }, (err, book) => {
    if (err) return res.status(500).send({ err });
    if (!book) return res.status(404).send({ message: 'Book not found' });

    return res.status(200).send(book);
  });
}

function findBookByEditorial(req, res) {
  const { editorial } = req.params;

  Books.find({ editorial }, (err, book) => {
    if (err) return res.status(500).send({ err });
    if (!book) return res.status(404).send({ message: 'Book not found' });

    return res.status(200).send(book);
  });
}

function findBookByPrecio(req, res) {
  const { precio } = req.params;

  Books.find({ precio }, (err, book) => {
    if (err) return res.status(500).send({ err });
    if (!book) return res.status(404).send({ message: 'Book not found' });

    return res.status(200).send(book);
  });
}

function findBook(req, res) {
  const { titulo } = req.body;
  const { ISBN } = req.body;
  const { precio } = req.body;
  const { descripcion } = req.body;
  const { autor } = req.body;
  const { editorial } = req.body;
  const { fechaPublicacion } = req.body;
  const { _id } = req.body;

  Books.find({
    $or: [
      { _id },
      { titulo },
      { ISBN },
      { precio },
      { autor },
      { descripcion },
      { editorial },
      { fechaPublicacion },
    ],
  }, (err, data) => {
    if (data) return res.status(200).send({ message: 'Book found', data });

    return res.status(404).send({ message: 'book not found', err });
  });
}
module.exports = {
  getBooks,
  getBook,
  editBook,
  findBookByISBN,
  findBookByEditorial,
  findBookByPrecio,
  findBookByDescripcion,
  findBookByFecha,
  findBookByTitulo,
  findBookByAutor,
  deleteBook,
  createBook,
  replaceBook,
  findBook,
};
