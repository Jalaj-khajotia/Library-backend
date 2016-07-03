'use strict';

// Tasks routes
var Joi = require('joi');
var Boom = require('boom');
var Promise = require('bluebird');
var BookController = require('../controllers/Book-controller');

exports.register = function(server, options, next) {
    // Setup the controller
    var bookController = new BookController(options.database);

    // Binds all methods
    // similar to doing `BookController.index.bind(BookController);`
    // when declaring handlers

    server.bind(bookController);

    // Declare routes
    server.route([{
        method: 'GET',
        path: '/books',
        config: {
            auth: 'jwt',
            handler: bookController.index
        }
    }, {
        method: 'GET',
        path: '/book/{id}',
        config: {
            auth: 'jwt',
            handler: bookController.show,
            validate: {
                params: {
                    id: Joi.number().integer()
                }
            }
        }
    }, {
        method: 'GET',
        path: '/booksbycategory/{id}',
        config: {
            auth: 'jwt',
            handler: bookController.booksByCategoryId,
            validate: {
                params: {
                    id: Joi.number().integer()
                }
            }
        }
    }, {
        method: 'POST',
        path: '/book',
        config: {
            auth: 'jwt',
            handler: bookController.store
        }
    }, {
        method: 'PUT',
        path: '/book/{id}',
        config: {
            auth: 'jwt',
            handler: bookController.update,
            validate: {
                params: {
                    id: Joi.number().integer()
                }
            }
        }
    }, {
        method: 'DELETE',
        path: '/book/{id}',
        config: {
            auth: 'jwt',
            handler: bookController.destroy,
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
    name: 'routes-books',
    version: '1.0.1'
};
