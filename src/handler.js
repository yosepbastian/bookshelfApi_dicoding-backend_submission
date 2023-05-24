const { nanoid } = require("nanoid");
const books = require("./book");

const addBooksHandler = (request, h) => {
    const { name, pageCount, readPage, ...rest } = request.payload;
  
    if (!name) {
      return h.response({
        status: "fail",
        message: "Gagal menambahkan buku. Mohon isi nama buku"
      }).code(400);
    }
  
    if (readPage > pageCount) {
      return h.response({
        status: "fail",
        message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
      }).code(400);
    }
  
    const id = nanoid(16);
    const Finished = pageCount === readPage;
    const timestamp = new Date().toISOString();
  
    const newBook = {
      id,
      name,
      pageCount,
      readPage,
      Finished,
      insertedAt: timestamp,
      updatedAt: timestamp,
      ...rest
    };
  
    books.push(newBook);
  
    const isSuccess = books.find((book) => book.id === id);
  
    if (isSuccess) {
      return h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id
        }
      }).code(201);
    }
  };
  

const getAllBooksHandler = (request, h) => {
    const { name, reading, finished } = request.query;

  const filteredBooks = books.filter((book) => {
    const isNameMatched = !name || book.name.toLowerCase().includes(name.toLowerCase());
    const isReadingMatched = reading === undefined || book.reading === (reading === '1');
    const isFinishedMatched = finished === undefined || book.finished === (finished === '1');

    return isNameMatched && isReadingMatched && isFinishedMatched;
  });

  return h.response({
    status: 'success',
    data: {
      books: filteredBooks,
    },
  });
};


const getBooksByIdHandler = (request, h) => {
    const { id } = request.params;
  
    const book = books.find((book) => book.id === id);
  
    if (book) {
      return h.response({
        status: 'success',
        data: {
          book,
        },
      });
    }
  
    return h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    }).code(404);
  };
  

const updateBooksbyIdHandler = (request, h) => {
    const { id } = request.params;
    const book = books.find((book) => book.id === id);
  
    if (!book) {
      return h.response({ message: 'Buku tidak ditemukan' }).code(404);
    }
  
    const { name, pageCount, readPage, ...rest } = request.payload;
  
    if (!name) {
      return h.response({
        status: "fail",
        message: "Gagal memperbarui buku. Mohon isi nama buku"
      }).code(400);
    }
  
    if (readPage > pageCount) {
      return h.response({
        status: "fail",
        message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
      }).code(400);
    }
  
    Object.assign(book, { name, pageCount, readPage, ...rest });
  
    return h.response({
      message: 'Data buku berhasil diperbarui',
      data: book
    });
  };
  
const deleteBooksById = (request, h) => {
    const {id} = request.params;

    const index = books.findIndex((book)=> book.id === id);

    if(index != -1){
        books.splice(index,1)
        return h.response({
            status: 'Succes',
            message: 'Buku berhasil dihapus'
        })
    }
    return h.response({
        "status": "fail",
        "message": "Buku gagal dihapus. Id tidak ditemukan",
    })
}

module.exports = {
    addBooksHandler,
    getAllBooksHandler,
    getBooksByIdHandler,
    updateBooksbyIdHandler,
    deleteBooksById
};