'use strict';

var Boom = require('boom');
var BooksModel = require('../models/Books');

function BooksController(database) {
    this.booksModel = new BooksModel(database);
};

// [GET] /tasks
BooksController.prototype.index = function(request, reply) {

    this.booksModel.getAllBooks().
    then(function(products) {
        return reply(products);
    }, function(error) {
        console.log(error);
    });
};

// [GET] /tasks/{id}
BooksController.prototype.show = function(request, reply) {
    try {
        var id = request.params.id;
        this.booksModel.getBook(id).then(function(product) {
                return reply(product);
            })
            .catch(function(err) {
                return reply('error');
            });
    } catch (e) {
        reply(Boom.notFound(e.message));
    }
};

BooksController.prototype.booksByCategoryId = function(request, reply) {
    try {
        var id = request.params.id;
        this.booksModel.getBooksbyCategoryId(id).then(function(product) {
                return reply(product);
            })
            .catch(function(err) {
                return reply('error');
            });
    } catch (e) {
        reply(Boom.notFound(e.message));
    }
};

// [POST] /tasks
        /*
        "book": {"name":"sdf",
        "price": 121
                }
        */
BooksController.prototype.store = function(request, reply) {
    try {
        var value = request.payload.book;
        reply(this.booksModel.addBook(value));
    } catch (e) {
        reply(Boom.badRequest(e.message));
    }
};

// [PUT] /tasks/{id}
BooksController.prototype.update = function(request, reply) {
    try {
        var id = request.params.id;
        var book = request.payload.book;
        reply(this.booksModel.updateBook(id, book));
    } catch (e) {
        console.log('login error');
        reply(Boom.notFound(e.message));
    }
};

// [DELETE] /tasks/{id}
BooksController.prototype.destroy = function(request, reply) {
    try {
        var id = request.params.id;
        reply(this.booksModel.deleteBook(id));
    } catch (e) {
        reply(Boom.notFound(e.message));
    }
};

module.exports = BooksController;
