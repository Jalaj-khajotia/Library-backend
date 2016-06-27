'use strict';

var Boom = require('boom');
var ReturnModel = require('../models/Returns');


function ReturnController(database) {
    this.returnModel = new ReturnModel(database); 
};

// [GET] /tasks
ReturnController.prototype.index = function(request, reply) {
    var start = request.query.start;
    var limit = request.query.limit;

    if (start == null) {
        start = 0
    }

    if (limit == null) {
        limit = start + 9
    }

    this.returnModel.getProducts(start, limit).
    then(function(products) {
        return reply(products);
        //return reply(users);
    }, function(error) {
        console.log(error);
    });
};

// [GET] /tasks/{id}
ReturnController.prototype.show = function(request, reply) {
        try {
            var id = request.params.id;
            this.returnModel.getReturn(id).then(function(product) {

               return reply(product);
        })
    .catch(function(err) {
        return reply('error');
    });
}
catch (e) {
    reply(Boom.notFound(e.message));
}
};

// [POST] /tasks
ReturnController.prototype.store = function(request, reply) {
    try {
        var value = request.payload.return;

        reply(this.returnModel.addReturn(value));           
    } catch (e) {
        reply(Boom.badRequest(e.message));
    }
};

// [PUT] /tasks/{id}
ReturnController.prototype.update = function(request, reply) {
    try {
        var id = request.params.id;
        var task = request.payload.task;
        reply(this.returnModel.updateReturn(id, task));
    } catch (e) {
        reply(Boom.notFound(e.message));
    }
};

// [DELETE] /tasks/{id}
ReturnController.prototype.destroy = function(request, reply) {
    try {
        var id = request.params.id;

        this.returnModel.deleteUser(id);
        reply().code(204);
    } catch (e) {
        reply(Boom.notFound(e.message));
    }
};

module.exports = ReturnController;
