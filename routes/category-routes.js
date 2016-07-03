'use strict';

// Tasks routes
var Joi = require('joi');
var Boom = require('boom');
var Promise = require('bluebird');
var CategoryController = require('../controllers/Category-controller');

exports.register = function(server, options, next) {
    // Setup the controller
    var categoryController = new CategoryController(options.database);

    // Binds all methods
    // similar to doing `categoryController.index.bind(categoryController);`
    // when declaring handlers

    server.bind(categoryController);

    // Declare routes
    server.route([{
        method: 'GET',
        path: '/categories',
        config: {
            auth: 'jwt',
            handler: categoryController.index
        }
    }, {
        method: 'GET',
        path: '/categories/{id}',
        config: {
            auth: 'jwt',
            handler: categoryController.show,
            validate: {
                params: {
                    id: Joi.number().integer()
                }
            }
        }
    }, {
        method: 'POST',
        path: '/categories',
        config: {
            auth: 'jwt',
            handler: categoryController.store
        }
    }, {
        method: 'PUT',
        path: '/categories/{id}',
        config: {
            auth: 'jwt',
            handler: categoryController.update,
            validate: {
                params: {
                    id: Joi.number().integer()
                }
            }
        }
    }, {
        method: 'DELETE',
        path: '/categories/{id}',
        config: {
            auth: 'jwt',
            handler: categoryController.destroy,
            validate: {
                params: {
                    id: Joi.number().integer()
                }
            }
        }
    }]);
    next();
}

exports.register.attributes = {
    name: 'routes-categories',
    version: '1.0.1'
};
