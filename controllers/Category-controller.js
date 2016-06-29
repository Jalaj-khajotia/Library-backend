'use strict';

var Boom = require('boom');
var CategoriesModel = require('../models/Categories');


function CategoriesController(database) {
    this.categoriesModel = new CategoriesModel(database);
};

// [GET]
CategoriesController.prototype.index = function(request, reply) {
    this.categoriesModel.getAllCategories().
    then(function(data) {
        return reply(data);
    }, function(error) {
        console.log(error);
    });
};

// [GET]
CategoriesController.prototype.show = function(request, reply) {
    try {
        var id = request.params.id;
        this.categoriesModel.getCategory(id).then(function(product) {
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
CategoriesController.prototype.store = function(request, reply) {
    try {
        var value = request.payload.category;

        reply(this.categoriesModel.addCategory(value))
            .created();
    } catch (e) {
        reply(Boom.badRequest(e.message));
    }
};

// [PUT] /tasks/{id}
CategoriesController.prototype.update = function(request, reply) {
    try {
        var id = request.params.id;
        var task = request.payload.category;
        reply(this.categoriesModel.updateCategory(id, task));
    } catch (e) {
        reply(Boom.notFound(e.message));
    }
};

// [DELETE] /tasks/{id}
CategoriesController.prototype.destroy = function(request, reply) {
    try {
        var id = request.params.id;
        this.categoriesModel.deleteCategory(id);
        reply().code(204);
    } catch (e) {
        reply(Boom.notFound(e.message));
    }
};

module.exports = CategoriesController;
