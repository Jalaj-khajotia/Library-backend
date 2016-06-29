'use strict';

var Boom = require('boom');
var IssueBookModel = require('../models/IssueBook');

function IssueBookController(database) {
    this.issueBookModel = new IssueBookModel(database);
};

// [GET] /tasks
IssueBookController.prototype.index = function(request, reply) {

    this.issueBookModel.getAllIssueBooks().then(
        function(products) {
            console.log(products);
            return reply(products);
        },
        function(error) {
            console.log(error);
        });
};

// [GET] /tasks/{id}
IssueBookController.prototype.show = function(request, reply) {
    try {
        var id = request.params.id;
        this.issueBookModel.getIssueBook(id).then(function(product) {
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
IssueBookController.prototype.store = function(request, reply) {
    try {
        var value = request.payload.issueBook;
        reply(this.issueBookModel.addIssueBook(value));
    } catch (e) {
        reply(Boom.badRequest(e.message));
    }
};
/* "issueBook":[{"bookId",1,
    "IssueId":1,
    "pending": true
    }]
*/
// issue multiple books
IssueBookController.prototype.bulkStore = function(request, reply) {
    try {
        var value = request.payload.issueBook;      
        reply(this.issueBookModel.bulkAddIssueBooks(value));
    } catch (e) {
        reply(Boom.badRequest(e.message));
    }
};

// [PUT] /tasks/{id}
IssueBookController.prototype.update = function(request, reply) {
    try {
        var id = request.params.id;
        var task = request.payload.issueBook;
        reply(this.issueBookModel.returnIssueBook(id, task));
    } catch (e) {
        reply(Boom.notFound(e.message));
    }
};
// return multiple books
IssueBookController.prototype.bulkUpdate = function(request, reply) {
    try {
        var id = request.params.id;
        var task = request.payload.issueBook;
        reply(this.issueBookModel.bulkReturn(id, task.returnDate));
    } catch (e) {
        reply(Boom.notFound(e.message));
    }
};

// [DELETE] /tasks/{id}
IssueBookController.prototype.destroy = function(request, reply) {
    try {
        var id = request.params.id;
        this.issueBookModel.deleteIssueBook(id);
        reply().code(204);
    } catch (e) {
        reply(Boom.notFound(e.message));
    }
};

module.exports = IssueBookController;
