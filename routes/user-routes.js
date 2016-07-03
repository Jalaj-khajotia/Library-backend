'use strict';

// Tasks routes
var Joi = require('joi');
var Boom = require('boom');
var Promise = require('bluebird');
var UsersController = require('../controllers/User-controllers.js');

exports.register = function(server, options, next) {
    // Setup the controller 
    var usersController = new UsersController(options.database);

    // Binds all methods
    // similar to doing `tasksController.index.bind(tasksController);`
    // when declaring handlers

    server.bind(usersController);

    // Declare routes
    server.route([{
        method: 'GET',
        path: '/user/{id}',
        config: {
            auth: 'jwt',
            handler: usersController.show
        }
    }, {
        method: 'POST',
        path: '/login',
        config: {
            auth: false,
            handler: usersController.index,
            validate: {
                payload: {
                    email: Joi.string().email().required(),
                    password: Joi.string().min(2).max(200).required()
                }
            }
        }
    }, {
        method: 'PUT',
        path: '/user/{id}',
        config: {
            auth: 'jwt',
            handler: usersController.update
        }
    }]);
    next();
}

exports.register.attributes = {
    name: 'routes-users',
    version: '1.0.1'
};