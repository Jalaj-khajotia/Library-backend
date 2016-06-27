'use strict';

var Boom = require('boom');
var BooksModel = require('../models/Books');
var IssueModel = require('../models/Issue');


function BooksController(database) {
    this.booksModel = new BooksModel(database);
    this.IssueModel = new IssueModel(database);
};

// [GET] /tasks
BooksController.prototype.index = function(request, reply) {

    this.booksModel.getBooks().
    then(function(products) {
        return reply(products);
        //return reply(users);
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

// [POST] /tasks
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
        console.log('loggin error');
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
