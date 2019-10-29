var Books = require("../model/bookModels");

function getBooks(req,res) {
    Books.find({},(err,books)=>{
        if(err) return res.status(500).send({err});

        return res.status(200).send({books});
    });
}

function getBook(req,res){
    Books.findById(req.params,(err,book)=>{
        if(err) return res.status(404).send({message: "Book not found", err});

        return res.status(200).send({book});
    });
}

function createBook(req,res){
    const book = new Books(req.body);

    book.save((err,newBook)=>{
        if(err) return res.status(400).send({message: "Error saving book", err});

        return res.status(200).send({message: "Book save", newBook});
    });
}

function replaceBook(req,res){
    const {bookId} = req.params;
    const {titulo} = req.body;
    const {ISBN} = req.body;
    const {descripcion} = req.body;
    const {fechaPublicacion} = req.body;
    const {precio} = req.body;
    const {editorial} = req.body;

    if(!bookId || !titulo || !ISBN || !descripcion || !fechaPublicacion || !precio || !editorial)
        return res.status(400).send({message: "Missing parameters"});

    Books.findById(bookId, (err)=>{
        if(err) return res.status(404).send({message: "Book not found"});
    });
    
    Books.replaceOne(req.body, (err,replacement)=>{
        if(err) return res.status(500).send({err});

        return res.status(200).send({message: "Book replace"}, replacement);
    });
}

function editBook(req,res){
    const {bookId} = req.params;

    Books.findByIdAndUpdate(bookId,req.body,(err,book)=>{
        if(err) return res.status(500).send({err});
        if(!book)  return res.status(404).send({message: "Book not found"});

        return res.status(200).send({message: "Book edited"}, book);
    });
}

function deleteBook(req,res){
    const {bookId} = req.params;
    
    Books.findByIdAndRemove(bookId, (err,book)=>{
        if(err) return res.status(500).send({err});
        if(!book) return res.status(404).send({message: "Book not found"});

        return res.status(200).send({message: "Book deleted",book});
    });
}

function findBook(req,res){
    var glu = [
        req.params.titulo,
        req.params.ISBN,
        req.params.descripcion,
        req.params.fechaPublicacion,
        req.params.precio,
        req.params.editorial,
    ]
    for(var i =0; i<glu.length; i++)
        if(glu[i])
            Books.findOne(glu[1], (err,book)=>{
                if(err) return res.status(500).send({err});
                if(!book) return res.status(404).send({message: "Book not found"});

                return res.status(200).send({book});
            });
}

module.exports = {
    getBooks,
    getBook,
    editBook,
    findBook,
    deleteBook,
    createBook,
    replaceBook
}
