'use strict';

// Tasks routes
var Joi = require('joi');
var Boom = require('boom');
var Promise = require('bluebird');
var Returncontroller = require('../controllers/Return-controller');

exports.register = function(server, options, next) {
    // Setup the controller
    var returncontroller = new Returncontroller(options.database);

    // Binds all methods
    // similar to doing `returncontroller.index.bind(returncontroller);`
    // when declaring handlers

    server.bind(returncontroller);      

    // Declare routes
    server.route([
        {
            method: 'GET',
            path: '/returns',
            config: {
                  auth: false,
                handler: returncontroller.index,
                validate: {
                    query: Joi.object().keys({
                        start: Joi.number().min(0),
                        limit: Joi.number().min(1)
                    })
                }
            }
        },
        {
            method: 'GET',
            path: '/return/{id}',
            config: {
                  auth: false,
                handler: returncontroller.show,
                validate: {
                    params: {
                        id: Joi.number().integer()
                    }
                }
            }
        },
        {
            method: 'POST',
            path: '/return',
            config: {
                 auth: false,
                handler: returncontroller.store
            }
        },
        {
            method: 'PUT',
            path: '/return/{id}',
            config: {
                auth: false,
                handler: returncontroller.update,
                validate: {
                    params: {
                        id: Joi.number().integer()
                    }
                }
            }
        },
        {
            method: 'DELETE',
            path: '/return/{id}',
            config: {
                auth: false,
                handler: returncontroller.destroy,
                validate: {
                    params: {
                        id: Joi.number().integer()
                    }
                }
            }
        }
    ]);
    next();
}

exports.register.attributes = {
    name: 'routes-return',
    version: '1.0.1'
};
