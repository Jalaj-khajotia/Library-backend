'use strict';

var crypto = require('crypto');
var Promise = require('bluebird');

function BooksModel(database) {
    this.db = database;
};

BooksModel.prototype.getAllBooks = function() {
    return this.db.get('book') || [];
};

BooksModel.prototype.findBooksByProperty = function(prop, value) {
    var task, i, len;
    var products = this.getAllBooks();
    var users = this.db.get('book');
    return new Promise(function(fulfill, reject) {
        var tasks = products.
        then(function(products) {
            users.then(function(user_data) {
                for (i = 0, len = products.length; i < len; i++) {
                    var product = products[i];
                    if (products[i].id == value) {

                        return fulfill(product);
                    }
                }
                return reject('not found');
            }, function(error) {

            });

            //return reply(users);
        }, function(error) {
            return reject(error);
            console.log(error);
        });
    });
};

BooksModel.prototype.getBooks = function(start, limit) {
    var tasks = this.getAllBooks();
    // console.log(tasks);

    return tasks;
    // .slice(start, limit + 1);
};

BooksModel.prototype.getBook = function(id) {
    var task = this.findBooksByProperty('id', id);

    return task;
    if (!task) {
        throw new Error('Task doesn\'t exists.');
    }
};

BooksModel.prototype.addBook = function(newTask) {

    return this.db.set('book', newTask);
};

BooksModel.prototype.retriveBookInfobyIds = function(newTask) {

    return this.db.getInfo('book');
};

BooksModel.prototype.updateBook = function(id, updatedTask) {   

    var task = this.findBooksByProperty('id', id);
    var db = this.db;
    return task.then(function(s) {
        return db.update('book', updatedTask, id);
    }, function() {
        throw new Error('Book doesn\'t exists.');
    });
};

BooksModel.prototype.deleteBook = function(id) {
    var task = this.findBooksByProperty('id', id);
    var db = this.db;
    return task.then(function(s) {
        return db.delete('book', id);
    }, function() {
        throw new Error('Book doesn\'t exists.');
    });
};

module.exports = BooksModel;
