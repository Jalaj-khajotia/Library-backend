'use strict';

var Boom = require('boom');
var IssueModel = require('../models/Issue');


function IssueController(database) {
    this.issueModel = new IssueModel(database);
};

// [GET] /tasks
IssueController.prototype.index = function(request, reply) {

    this.issueModel.getIssues().
    then(function(products) {
        return reply(products);
        //return reply(users);
    }, function(error) {
        console.log(error);
    });
};

// [GET] /tasks/{id}
IssueController.prototype.show = function(request, reply) {
    try {
        var id = request.params.id;
        this.issueModel.getIssue(id).then(function(product) {
                return reply(product);
            })
            .catch(function(err) {
                return reply('error');
            });
    } catch (e) {
        reply(Boom.notFound(e.message));
    }
};
IssueController.prototype.getIssueByUserid = function(request, reply) {
    try {
        var id = request.params.id;
        var selectedIssues = [];
        this.issueModel.getIssues().then(function(products) {
                console.log(products);
                for (var i = products.length - 1; i >= 0; i--) {
                    if (products[i].UserId === id) {
                        selectedIssues.push(products[i]);
                    }
                };
                return reply(selectedIssues);
            })
            .catch(function(err) {
                return reply(err);
            });
    } catch (e) {
        reply(Boom.notFound(e.message));
    }
};


// [POST] /tasks
IssueController.prototype.store = function(request, reply) {
    try {
        var value = request.payload.issue;
        console.log(value);
        reply(this.issueModel.addBulk(value));

    } catch (e) {
        reply(Boom.badRequest(e.message));
    }
};

// [PUT] /tasks/{id}
IssueController.prototype.update = function(request, reply) {
    try {
        var id = request.params.id;
        var task = request.payload.task;
        reply(this.issueModel.updateIssue(id, task));
    } catch (e) {
        reply(Boom.notFound(e.message));
    }
};

// [DELETE] /tasks/{id}
IssueController.prototype.destroy = function(request, reply) {
    try {
        var id = request.params.id;
        reply(this.issueModel.deleteIssue(id));
    } catch (e) {
        reply(Boom.notFound(e.message));
    }
};

module.exports = IssueController;
