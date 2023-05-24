const { addBooksHandler, getAllBooksHandler, getBooksByIdHandler, editNoteByIdHandler, updateBooksbyIdHandler, deleteBooksById } = require("./handler");

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBooksHandler
        
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooksHandler
    },
    {
    method: 'GET',
    path: '/books/{id}',
    handler: getBooksByIdHandler,
    },
    {
    method: 'PUT',
    path: '/books/{id}',
    handler: updateBooksbyIdHandler,
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteBooksById
    }

];

module.exports = routes;