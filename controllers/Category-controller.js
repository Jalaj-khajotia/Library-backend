'use strict';

var Boom = require('boom');
var CategoriesModel = require('../models/Categories');


function CategoriesController(database) {
    this.categoriesModel = new CategoriesModel(database); 
};

// [GET] /tasks
CategoriesController.prototype.index = function(request, reply) {
    this.categoriesModel.getCategories().
    then(function(data) {
        return reply(data);        
    }, function(error) {
        console.log(error);
    });
};

// [GET] /tasks/{id}
CategoriesController.prototype.show = function(request, reply) {
        try {
            var id = request.params.id;
            this.categoriesModel.getProduct(id).then(function(product) {

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
CategoriesController.prototype.store = function(request, reply) {
    try {
        var value = request.payload.task;

        reply(this.categoriesModel.addUser(value))
            .created();
    } catch (e) {
        reply(Boom.badRequest(e.message));
    }
};

// [PUT] /tasks/{id}
CategoriesController.prototype.update = function(request, reply) {
    try {
        var id = request.params.id;
        var task = request.payload.task;
        reply(this.categoriesModel.updateUser(id, task));
    } catch (e) {
        reply(Boom.notFound(e.message));
    }
};

// [DELETE] /tasks/{id}
CategoriesController.prototype.destroy = function(request, reply) {
    try {
        var id = request.params.id;

        this.categoriesModel.deleteUser(id);
        reply().code(204);
    } catch (e) {
        reply(Boom.notFound(e.message));
    }
};

module.exports = CategoriesController;
