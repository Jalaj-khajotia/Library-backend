'use strict';

var crypto = require('crypto');
var Promise = require('bluebird');

function BooksModel(database) {
    this.db = database;
};

BooksModel.prototype.getAllBooks = function() {
    return this.db.get('book') || [];
};

BooksModel.prototype.getBook = function(id) {
    var task = this.db.getbyId('book', id);

    return task;
    if (!task) {
        throw new Error('Task doesn\'t exists.');
    }
};

BooksModel.prototype.getBooksbyCategoryId = function(id) {
    var task = this.db.getbyCategory('book', id);

    return task;
    if (!task) {
        throw new Error('Task doesn\'t exists.');
    }
};

BooksModel.prototype.addBook = function(newTask) {
    return this.db.set('book', newTask);
};

/*BooksModel.prototype.retriveBookInfobyIds = function(newTask) {
    return this.db.getInfo('book');
};
*/
BooksModel.prototype.updateBook = function(id, updatedTask) {

    var task = this.db.getbyId('book', id);
    var db = this.db;
    return task.then(function(s) {
        return db.update('book', updatedTask, id);
    }, function() {
        throw new Error('Book doesn\'t exists.');
    });
};

BooksModel.prototype.deleteBook = function(id) {
    var task = this.db.getbyId('book', id);
    var db = this.db;
    return task.then(function(s) {
        return db.delete('book', id);
    }, function() {
        throw new Error('Book doesn\'t exists.');
    });
};

module.exports = BooksModel;
